import FetchWrapper from "./fetch_wrapper.js";

const BaseURL = `https://spokiy-cofee-ua-default-rtdb.europe-west1.firebasedatabase.app/`;
const endpoint = `reviews.json`;

// VALIDATION SETTINGS
const minLengthOfChars = 2;
const maxLengthOfChars = 30;
const regURL = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

const reviewForm = document.querySelector("#review-form");
const reviewField = document.querySelector("#review-field");
const userName = document.querySelector("#user-name");
const reviewPage = document.querySelector("#reviews-container");

reviewForm.addEventListener("submit", event => {
    event.preventDefault();
    const date = new Date();
    const API = new FetchWrapper(BaseURL);
    if (userName.value.length >= minLengthOfChars && userName.value.length <= maxLengthOfChars) {
        try {
            if (regURL.test(userName.value) || regURL.test(reviewField.value)) {
                document.querySelector("p.error-message")?.remove();
                const span = document.createElement("p");
                span.classList.add("error-message");
                span.textContent = "Посилання на інші сайти заборонені / Перевірте відступи від точки";
                document.querySelector(".review-block").appendChild(span);
                return new Error("URL RegEx validation.");
            }
            API.post(endpoint, {
                fields: {
                    user_name: userName.value,
                    review: reviewField.value,
                    current_time: `${date.getDate()} ${new Intl.DateTimeFormat("uk-UA", {month:"long"}).format(date)} ${date.getFullYear()}`
                }
            }).then(response => {
                reviewPage.insertAdjacentHTML("afterbegin",
                        `<div class="comment-container">
                            <h3></h3>
                            <p class="comment"></p>
                            <p class="comment-time">${date.getDate()} ${new Intl.DateTimeFormat("uk-UA", {month:"long"}).format(date)} ${date.getFullYear()}</p>
                        </div>`);
                        
                document.querySelector("h3").textContent = userName.value;
                document.querySelector(".comment").textContent = reviewField.value;
                reviewRender(reviewField.value.length, document.querySelector(".comment-container"));
            });
        } catch (error) {
            userName.value = "";
            reviewField.value = "";
            console.log(error);
        }
    }
});

const showReviews = () => {
    const API = new FetchWrapper(BaseURL);
    API.get(endpoint).then(data => {
        Object.values(data).forEach(element => {
            reviewPage.insertAdjacentHTML("afterbegin",
                `<div class="comment-container">
                    <h3></h3>
                    <p class="comment"></p>
                    <p class="comment-time">${element?.fields.current_time}</p>
                </div>`);

            document.querySelector("h3").textContent = element?.fields.user_name;
            document.querySelector(".comment").textContent = element?.fields.review;
            reviewRender(element?.fields.review.length, document.querySelector(".comment-container"));
        });
    });
}

const reviewRender = (reviewLength, commentBlock) => {
    if (reviewLength >= 100) {
        commentBlock.classList.add("md-span");
    } if (reviewLength >= 500) {
        commentBlock.classList.remove("md-span");
        commentBlock.classList.add("lg-span");
    }
}

document.querySelector("#user-name").addEventListener("keyup", event => {
    const nameField = document.querySelector("#user-name");
    const span = document.createElement("p");
    span.classList.add("error-message");
    nameField.classList.add("clicked");
    if (nameField.value.length >= nameField.getAttribute("minlength")) {
        document.querySelector("p.error-message")?.remove();
    } else if (nameField.value.length < nameField.getAttribute("minlength")) {
        document.querySelector("p.error-message")?.remove();
        span.textContent = `Мінімум ${nameField.getAttribute("minlength")} символи`;
        document.querySelector(".name-block").appendChild(span);
    }
});

showReviews();
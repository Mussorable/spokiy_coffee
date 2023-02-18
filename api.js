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

const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

const renderReview = (userName, textReview, reviewDate) => {
    const frag = document.createDocumentFragment();

    const div = document.createElement("div");
    div.classList.add("comment-container");
    const h3 = document.createElement("h3");
    h3.textContent = userName;
    const p = document.createElement("p");
    p.classList.add("comment");
    p.textContent = textReview;
    const p2 = document.createElement("p");
    p2.classList.add("comment-time");
    p2.textContent = reviewDate;

    frag.appendChild(div);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(p2);
    
    reviewPage.insertAdjacentElement("afterbegin", div);
}

reviewForm.addEventListener("submit", event => {
    event.preventDefault();
    const date = new Date();
    const API = new FetchWrapper(BaseURL);
    if (userName.value.length >= minLengthOfChars && userName.value.length <= maxLengthOfChars) {
        try {
            if (regURL.test(userName.value) || regURL.test(reviewField.value)) {
                const errorMessage = {
                    "uk-UA": "Посилання на інші сайти заборонені / Перевірте відступи від точки",
                    "en-US": "Links to other sites are prohibited / Check dot spacing",
                    "pl-PL": "Publikacja obcych stron internetowych niedozwolona / Sprawdz odstępty od kropek"
                }

                document.querySelector("p.error-message")?.remove();
                const span = document.createElement("p");
                span.classList.add("error-message");
                span.textContent = errorMessage[document.cookie ? getCookieValue("lang") : "uk-UA"];
                document.querySelector(".review-block").appendChild(span);
                document.querySelector("#send-button").setAttribute("disabled", "disabled");
                return new Error("URL RegEx validation.");
            }
            API.post(endpoint, {
                fields: {
                    user_name: userName.value,
                    review: reviewField.value,
                    current_time: {
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    }
                }
            }).then(response => {
                renderReview(userName.value, reviewField.value, `${date.getDate()} ${new Intl.DateTimeFormat(document.cookie ? getCookieValue("lang") : "uk-UA", {month:"long"}).format(date)} ${date.getFullYear()}`);
                reviewRender(reviewField.value.length, document.querySelector(".comment-container"));
                location.reload();
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
            const date = new Date(Date.UTC(element?.fields.current_time?.year, element?.fields.current_time.month, element?.fields.current_time?.day));
            renderReview(element?.fields.user_name, element?.fields.review, `${element?.fields.current_time?.day} ${new Intl.DateTimeFormat(document.cookie ? getCookieValue("lang") : "uk-UA", {month:"long"}).format(date)} ${element?.fields.current_time?.year}`);
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
    const errorMessage = {
        "uk-UA": ["Мінімум", "символи"],
        "en-US": ["Minimum", "characters"],
        "pl-PL": ["Minimum", "litery"]
    }

    const nameField = document.querySelector("#user-name");
    const span = document.createElement("p");
    span.classList.add("error-message");
    nameField.classList.add("clicked");
    if (nameField.value.length >= nameField.getAttribute("minlength")) {
        document.querySelector("p.error-message")?.remove();
    } else if (nameField.value.length < nameField.getAttribute("minlength")) {
        document.querySelector("p.error-message")?.remove();
        span.textContent = `${errorMessage[document.cookie ? getCookieValue("lang") : "uk-UA"][0]} ${nameField.getAttribute("minlength")} ${errorMessage[document.cookie ? getCookieValue("lang") : "uk-UA"][1]}`;
        document.querySelector(".name-block").appendChild(span);
    }
});

reviewField.addEventListener("keyup", event => {
    document.querySelector("#send-button").removeAttribute("disabled");
});

document.querySelector("#button-faq").addEventListener("click", event => {
    const hRules = {
        "uk-UA": {
            heading: "Правила",
            rules: "uk-UA"
        },
        "en-US": {
            heading: "Review rules",
            rules: "en-US"
        },
        "pl-PL": {
            heading: "Zasady korzystania",
            rules: "pl-PL"
        }
    }

    document.querySelector("#information-container > h2").textContent = hRules[document.cookie ? getCookieValue("lang") : "uk-UA"].heading;
    document.querySelector("#information-container > p").textContent = hRules[document.cookie ? getCookieValue("lang") : "uk-UA"].rules;
    document.querySelector(".shadow").classList.toggle("visible");
});

document.querySelector(".shadow").addEventListener("click", event => {
    document.querySelector(".shadow").classList.toggle("visible");
});

showReviews();
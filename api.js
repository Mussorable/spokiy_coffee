import FetchWrapper from "./fetch_wrapper.js";

const BaseURL = `https://spokiy-cofee-ua-default-rtdb.europe-west1.firebasedatabase.app/`;
const endpoint = `reviews.json`;

const reviewForm = document.querySelector("#review-form");
const reviewField = document.querySelector("#review-field");
const userName = document.querySelector("#user-name");
const reviewPage = document.querySelector("#reviews-container");

reviewForm.addEventListener("submit", event => {
    event.preventDefault();
    const date = new Date();
    const API = new FetchWrapper(BaseURL);
    API.post(endpoint, {
        fields: {
            user_name: userName.value,
            review: reviewField.value,
            current_time: `${date.getDate()}-${date.getMonth()+1}-${date.getDate()+1}`
        }
    }).then(response => {
        reviewPage.insertAdjacentHTML("afterbegin",
                `<div class="comment-container">
                    <h3></h3>
                    <p class="comment"></p>
                    <p class="comment-time">${date.getDate()}-${date.getMonth()+1}-${date.getDate()+1}</p>
                </div>`);
                
        document.querySelector("h3").textContent = userName.value;
        document.querySelector(".comment").textContent = reviewField.value;
    });
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
        });
    });
}

showReviews();
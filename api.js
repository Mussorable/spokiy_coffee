import FetchWrapper from "./fetch_wrapper.js";

const BaseURL = `https://spokiy-cofee-ua-default-rtdb.europe-west1.firebasedatabase.app/`;
const ReviewEndpoint = `reviews.json`;

const submitButton = document.querySelector("#send-button");
const reviewField = document.querySelector("#review-field");
const userName = document.querySelector("#user-name");

submitButton.addEventListener("submit", event => {
    event.preventDefault();
    const API = new FetchWrapper(BaseURL);
    API.post(ReviewEndpoint, {fields: {
        name: userName,
        review: reviewField
    }}).then(response => console.log(response));
});
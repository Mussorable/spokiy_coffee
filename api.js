import FetchWrapper from "./fetch_wrapper.js";

const newObj = {
    name: `Olek`,
    age: 24
};

const buttonReviews = document.querySelector("#reviews-button");

buttonReviews.addEventListener("click", () => {
    console.log("Clicked");
    const API = new FetchWrapper("/");
    API.post(`reviews.json`, {newObj}).then(response => console.log(response));
});
import FetchWrapper from "./fetch_wrapper.js";

const BaseURL = `https://spokiy-cofee-ua-default-rtdb.europe-west1.firebasedatabase.app/`;
const ReviewEndpoint = `reviews.json`;

const newObj = {
    review: "Pretty",
    client_id: `0x134`
};

const buttonReviews = document.querySelector("#reviews-button");

buttonReviews.addEventListener("click", () => {
    console.log("Clicked");
    const API = new FetchWrapper(BaseURL);
    API.get(ReviewEndpoint).then(response => console.log(response));
});
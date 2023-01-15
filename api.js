import FetchWrapper from "./fetch_wrapper.js";

const newObj = {
    name: `Olek`,
    age: 24
};

const buttonReviews = document.querySelector("#reviews-button");

buttonReviews.addEventListener("click", () => {
    console.log("Clicked");
    fetch(`/reviews.json`, {
        method: "POST" // or "post"
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
});
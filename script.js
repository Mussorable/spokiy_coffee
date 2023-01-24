const changeLang = document.querySelector("#change-lang");
const footerChangeLang = document.querySelector("#footer-change-lang");
const langContainer = document.querySelector("#lang-container");

const showLangContainer = () => {
    langContainer.classList.toggle("visible");
};

footerChangeLang.addEventListener("click", () => {
    showLangContainer();
});
import FetchWrapper from "./fetch_wrapper.js";

const BaseURL = `https://spokiy-cofee-ua-default-rtdb.europe-west1.firebasedatabase.app/`;
const endpoint = `menu.json`;

const API = new FetchWrapper(BaseURL);

const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

API.get(endpoint).then(response => {
    const section = document.createElement("section");
    section.classList.add("global-container");
    
    document.querySelector("main").appendChild(section);

    if (response) {
    Object.values(response).forEach(item => {
        const elementContainer = document.createElement("div");
        elementContainer.classList.add("menu-element-container");
        
        const elementName = document.createElement("h3");
        elementName.textContent = item.element.name[document.cookie ? getCookieValue("lang") : "uk-UA"];
        const elementPrice = document.createElement("p");
        elementPrice.textContent = item.element.price + " " + `UAH`;
        const elementValue = document.createElement("p");
        elementValue.textContent = item.element.value;
        
        section.appendChild(elementContainer);
        elementContainer.appendChild(elementName);
        elementContainer.appendChild(elementPrice);
        elementContainer.appendChild(elementValue);
    });
    }
});
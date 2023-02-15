import FetchWrapper from "./fetch_wrapper.js";

const BaseURL = `https://spokiy-cofee-ua-default-rtdb.europe-west1.firebasedatabase.app/`;
const endpoint = `menu.json`;

const API = new FetchWrapper(BaseURL);

API.get(endpoint).then(response => {
    const section = document.createElement("section");
    section.classList.add("global-container");
    
    document.querySelector("main").appendChild(section);

    Object.values(response).forEach(item => {
        console.log(item.element);

        const elementContainer = document.createElement("div");
        elementContainer.classList.add("menu-element-container");
        
        const elementName = document.createElement("h3");
        elementName.textContent = item.element.name;
        const elementPrice = document.createElement("p");
        elementPrice.textContent = item.element.price + " " + `UAH`;
        const elementValue = document.createElement("p");
        elementValue.textContent = item.element.value;
        
        section.appendChild(elementContainer);
        elementContainer.appendChild(elementName);
        elementContainer.appendChild(elementPrice);
        elementContainer.appendChild(elementValue);
    });
});
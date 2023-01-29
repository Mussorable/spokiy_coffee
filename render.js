const headerHtml = 
    `<header class="flex">
        <div><a href="/"><img class="logo" src="/media/rsz_main_logo.png" height="40" width="auto" alt=""></a></div>
        <nav id="navigation-list">

        </nav>
    </header>`;
const footerHtml = 
    `<footer>
        <ul class="navigation-list">
            <li><a href="/promotions.html">Акції</a></li>
            <li><a href="/reviews.html">Відгуки</a></li>
            <li id="change-lang">
                <button id="footer-change-lang" class="change-lang">Зміна мови</button>
                <div id="lang-container" class="lang-container">
                </div>
            </li>
        </ul>
        <address>
            <a href="https://www.google.pl/maps/place/Sobornyi+Ave,+159,+Zaporizhzhia,+Zaporiz'ka+oblast,+Ukraine,+69000/@47.8487776,35.1177497,17z/data=!3m1!4b1!4m5!3m4!1s0x40dc672eb5a116c1:0x3299cb53e8aa2196!8m2!3d47.848774!4d35.1203246" target="_blank">
                Запоріжжя, Проспект Соборний 159<br>
                SPOKIY Coffee<br>
                69000
            </a>
        </address>
    </footer>`;

const pageTiles = {
    reviews: "Відгуки",
    menu: "Меню",
    promotions: "Акції"
};

const langTiles = {
    ua: "Українська",
    en: "English",
    pl: "Polski"
}

const mediaNaviButtons = {
    menu: {
        span: "Меню",
        svg: "/svg/coffee.svg",
        link: "menu",
        href: "/menu.html"
    },
    promotions: {
        span: "Акції",
        svg: "/svg/promotions.svg",
        link: "promotions",
        href: "/promotions.html"
    },
    reviews: {
        span: "Відгуки",
        svg: "/svg/reviews.svg",
        link: "reviews",
        href: "reviews.html"
    }
}

const setNaviLinks = () => {
    document.querySelector("#navigation-list").appendChild(document.createElement("ul"));
    Object.values(mediaNaviButtons).forEach(item => {
        const frag = document.createDocumentFragment();
        const li = document.createElement("li");
        const a = document.createElement("a");
        const text = document.createElement("span");
        li.classList.add("navigation-list");
        a.classList.add("navigation-link");
        a.setAttribute("href", item.href);
        a.setAttribute("navigation", item.link);
        text.classList.add("navigation-text");
        const navigationLink = frag
            .appendChild(li)
            .appendChild(a)
            .appendChild(text);
        navigationLink.textContent = item.span;

        document.querySelector("#navigation-list > ul").appendChild(frag);
    });
};

const mediaMaxWidth = (screenWidth) => {
    if (screenWidth.matches) {
        document.querySelectorAll(".navigation-link").forEach(item => {
            item.querySelector("span").classList.add("sr-only");
            const attr = item.getAttribute("navigation");
            const svgElement = document.createElement("img");
            svgElement.setAttribute("src", mediaNaviButtons[attr].svg);
            svgElement.setAttribute("height", "40");
            svgElement.setAttribute("width", "auto");
            item.appendChild(svgElement);
        });
    }
}

const multiLang = () => {
    Object.keys(langTiles).forEach(item => {
        document.querySelector("#lang-container").insertAdjacentHTML("afterbegin", 
            `<div class="lang-flag"><p>${langTiles[item]}</p><img class="lang-icon" src="/svg/${item}.svg" width="auto" height="40" alt=""></div>`);
        document.querySelector(".lang-flag").setAttribute("lang", item);
    });
}

const initialization = () => {
    Object.keys(pageTiles).forEach(item => {
        if(window.location.href.includes(item)) {
            document.title = pageTiles[item];
        }
    });

    document.body.insertAdjacentHTML("afterbegin", headerHtml);
    setNaviLinks();

    document.body.insertAdjacentHTML("beforeend", footerHtml);

    multiLang();
    mediaMaxWidth(window.matchMedia("(max-width:600px)"));

    document.querySelector("#footer-change-lang").addEventListener("click", () => {
        document.querySelector("#lang-container").classList.toggle("visible");
    });
}

initialization();
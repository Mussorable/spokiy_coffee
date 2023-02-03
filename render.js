const headerHtml = 
    `<header class="flex desktop">
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
                <button id="footer-change-lang" class="change-lang bs-hidden">Зміна мови</button>
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

const multiGlossary = {
    navigation: {
        sendButton: {
            "ua-UA": "Відправити",
            "en-EN": "Send",
            "pl-PL": "Wyślij"
        },
        labelYourName: {
            "ua-UA": "Твоє ім'я",
            "en-EN": "Your name",
            "pl-PL": "Twoje imię"
        },
        labelYourComment: {
            "ua-UA": "Твій коментар",
            "en-EN": "Your comment",
            "pl-PL": "Twój komentarz"
        }
    },
    mainPage: {
        letsMeet: {
            "ua-UA": "Давай знайомитися",
            "en-EN": "Nice to meet you",
            "pl-PL": "Zapoznajmy się"
        },
        promotions: {
            "ua-UA": "Акції та новини",
            "en-EN": "Promotions and news",
            "pl-PL": "Promocje"
        }
    },
    reviewPage: {
        leaveAComment: {
            "ua-UA": "Залиш свою думку",
            "en-EN": "Leave your comment",
            "pl-PL": "Zostaw swój komentarz"
        },
        reviews: {
            "ua-UA": "Відгуки",
            "en-EN": "Reviews",
            "pl-PL": "Opinie"
        }
    }
}

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
        span: {
            "ua-UA": "Меню",
            "en-EN": "Menu",
            "pl-PL": "Menu"
        },
        svg: "/svg/coffee.svg",
        link: "menu",
        href: "/menu.html"
    },
    promotions: {
        span: {
            "ua-UA": "Акції",
            "en-EN": "Promotions",
            "pl-PL": "Promocje"
        },
        svg: "/svg/promotions.svg",
        link: "promotions",
        href: "/promotions.html"
    },
    reviews: {
        span: {
            "ua-UA": "Відгуки",
            "en-EN": "Reviews",
            "pl-PL": "Opinie"
        },
        svg: "/svg/reviews.svg",
        link: "reviews",
        href: "/reviews.html"
    },
    main: {
        span: {
            "ua-UA": "Головна",
            "en-EN": "Main",
            "pl-PL": "Pierwsza strona"
        },
        svg: "/svg/main.svg",
        link: "main",
        href: "/"
    }
}

const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

const setNaviLinks = () => {
    const getLang = document.body.getAttribute("lang");
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
        navigationLink.textContent = item.span[document.cookie ? getCookieValue("lang") : "ua-UA"];

        document.querySelector("#navigation-list > ul").appendChild(frag);
    });
}

const mediaMaxWidth = (screenWidth) => {
    if (screenWidth.matches) {
        document.querySelector("header > div").remove();
        document.querySelector("header > nav > ul > li:last-child").style.display = "initial";
        document.querySelector("header").classList.remove("desktop");
        document.querySelector("main").classList.remove("desktop");
        document.querySelector("header").classList.add("mobile");
        document.querySelector("main").classList.add("mobile");
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
            `<div class="lang-flag">
                <p>${langTiles[item]}</p>
                <img class="lang-icon" src="/svg/${item}.svg" width="auto" height="40" alt="">
            </div>`);
        document.querySelector(".lang-flag").setAttribute("lang", `${item}-${item.toUpperCase()}`);
    });
}

const setLanguage = () => {
    if (window.location.href.includes("/reviews.html")) {

        document.querySelector("#name-label").textContent = multiGlossary.navigation.labelYourName[document.cookie ? getCookieValue("lang") : "ua-UA"];
        document.querySelector("#user-name").setAttribute("placeholder", multiGlossary.navigation.labelYourName[document.cookie ? getCookieValue("lang") : "ua-UA"]);

        document.querySelector("#comment-label").textContent = multiGlossary.navigation.labelYourComment[document.cookie ? getCookieValue("lang") : "ua-UA"];
        document.querySelector("#review-field").setAttribute("placeholder", multiGlossary.navigation.labelYourComment[document.cookie ? getCookieValue("lang") : "ua-UA"]);

        document.querySelector("#reviews-heading").textContent = multiGlossary.reviewPage.reviews[document.cookie ? getCookieValue("lang") : "ua-UA"];
        document.querySelector("#leave-comment-heading").textContent = multiGlossary.reviewPage.leaveAComment[document.cookie ? getCookieValue("lang") : "ua-UA"];
        document.querySelector("#send-button").textContent = multiGlossary.navigation.sendButton[document.cookie ? getCookieValue("lang") : "ua-UA"];
    }

}

const initialization = () => {
    document.body.setAttribute("lang", navigator.language);

    Object.keys(pageTiles).forEach(item => {
        if(window.location.href.includes(item)) {
            document.title = pageTiles[item];
        }
    });

    document.body.insertAdjacentHTML("afterbegin", headerHtml);
    setNaviLinks();
    setLanguage();

    document.body.insertAdjacentHTML("beforeend", footerHtml);

    multiLang();
    mediaMaxWidth(window.matchMedia("(max-width:600px)"));

}

initialization();

document.querySelector("#footer-change-lang").addEventListener("click", () => {
    document.querySelector("#lang-container").classList.toggle("visible");
});

document.querySelectorAll(".lang-flag").forEach(item => {
    item.addEventListener("click", event => {
        setCookie("lang", item.getAttribute("lang"), 21);
        document.body.setAttribute("lang", item.getAttribute("lang"));

        if (!(window.matchMedia("(max-width:600px)").matches)) {
            document.querySelector("#navigation-list > ul").remove();
            setNaviLinks();
        }
        setLanguage();
    });
});
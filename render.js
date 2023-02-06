const multiGlossary = {
    navigation: {
        sendButton: {
            "uk-UA": "Відправити",
            "en-US": "Send",
            "pl-PL": "Wyślij"
        },
        labelYourName: {
            "uk-UA": "Твоє ім'я",
            "en-US": "Your name",
            "pl-PL": "Twoje imię"
        },
        labelYourComment: {
            "uk-UA": "Твій коментар",
            "en-US": "Your comment",
            "pl-PL": "Twój komentarz"
        },
        changeLanguage: {
            "uk-UA": "Зміна мови",
            "en-US": "Language",
            "pl-PL": "Język"
        }
    },
    mainPage: {
        letsMeet: {
            "uk-UA": "Давай знайомитися",
            "en-US": "Nice to meet you",
            "pl-PL": "Zapoznajmy się"
        },
        promotions: {
            "uk-UA": "Акції та новини",
            "en-US": "Promotions and news",
            "pl-PL": "Promocje",
            button: {
                "uk-UA": "Щось інше?",
                "en-US": "Something else?",
                "pl-PL": "Coś innego?"
            }
        },
        reviews: {
            "uk-UA": "Відгуки",
            "en-US": "Reviews",
            "pl-PL": "Opinie",
            button: {
                "uk-UA": "Залиш свою думку",
                "en-US": "Leave a comment",
                "pl-PL": "Zostaw opinię"
            }
        }
    },
    reviewPage: {
        leaveAComment: {
            "uk-UA": "Залиш свою думку",
            "en-US": "Leave your comment",
            "pl-PL": "Zostaw swój komentarz"
        },
        reviews: {
            "uk-UA": "Відгуки",
            "en-US": "Reviews",
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
            "uk-UA": "Меню",
            "en-US": "Menu",
            "pl-PL": "Menu"
        },
        svg: "/svg/coffee.svg",
        link: "menu",
        href: "/menu.html"
    },
    promotions: {
        span: {
            "uk-UA": "Акції",
            "en-US": "Promotions",
            "pl-PL": "Promocje"
        },
        svg: "/svg/promotions.svg",
        link: "promotions",
        href: "/promotions.html"
    },
    reviews: {
        span: {
            "uk-UA": "Відгуки",
            "en-US": "Reviews",
            "pl-PL": "Opinie"
        },
        svg: "/svg/reviews.svg",
        link: "reviews",
        href: "/reviews.html"
    },
    main: {
        span: {
            "uk-UA": "Головна",
            "en-US": "Main",
            "pl-PL": "Pierwsza strona"
        },
        svg: "/svg/main.svg",
        link: "main",
        href: "/"
    }
}

const navigationHeader = {
    menu: {
        span: {
            "uk-UA": "Меню",
            "en-US": "Menu",
            "pl-PL": "Menu"
        },
        svg: "/svg/coffee.svg",
        link: "menu",
        href: "/menu.html"
    },
    promotions: {
        span: {
            "uk-UA": "Акції",
            "en-US": "Promotions",
            "pl-PL": "Promocje"
        },
        svg: "/svg/promotions.svg",
        link: "promotions",
        href: "/promotions.html"
    },
    reviews: {
        span: {
            "uk-UA": "Відгуки",
            "en-US": "Reviews",
            "pl-PL": "Opinie"
        },
        svg: "/svg/reviews.svg",
        link: "reviews",
        href: "/reviews.html"
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

const mediaMaxWidth = (screenWidth) => {
    if (screenWidth.matches) {
        document.querySelector("header > div").remove();
        document.querySelector("header > nav > ul > li:last-child").style.display = "initial";
        document.querySelector("header").classList.remove("desktop");
        document.querySelector("main").classList.remove("desktop");
        document.querySelector("header").classList.add("mobile");
        document.querySelector("main").classList.add("mobile");
        document.querySelectorAll(".navigation-link").forEach(item => {
            // item.querySelector("span").classList.add("sr-only");
            const attr = item.getAttribute("navigation");
            const svgElement = document.createElement("img");
            svgElement.setAttribute("src", mediaNaviButtons[attr].svg);
            svgElement.setAttribute("height", "40");
            svgElement.setAttribute("width", "auto");
            item.appendChild(svgElement);
        });
    }
}

const setLanguage = () => {
    document.querySelectorAll("footer > .navigation-list > li > *").forEach(item => {
        // 
    });

    if (window.location.href.includes("/reviews.html")) {

        document.querySelector("#name-label").textContent = multiGlossary.navigation.labelYourName[document.cookie ? getCookieValue("lang") : "uk-UA"];
        document.querySelector("#user-name").setAttribute("placeholder", multiGlossary.navigation.labelYourName[document.cookie ? getCookieValue("lang") : "uk-UA"]);

        document.querySelector("#comment-label").textContent = multiGlossary.navigation.labelYourComment[document.cookie ? getCookieValue("lang") : "uk-UA"];
        document.querySelector("#review-field").setAttribute("placeholder", multiGlossary.navigation.labelYourComment[document.cookie ? getCookieValue("lang") : "uk-UA"]);

        document.querySelector("#reviews-heading").textContent = multiGlossary.reviewPage.reviews[document.cookie ? getCookieValue("lang") : "uk-UA"];
        document.querySelector("#leave-comment-heading").textContent = multiGlossary.reviewPage.leaveAComment[document.cookie ? getCookieValue("lang") : "uk-UA"];
        document.querySelector("#send-button").textContent = multiGlossary.navigation.sendButton[document.cookie ? getCookieValue("lang") : "uk-UA"];
    }

}

const setHF = () => {
    setLogo("/", {
        height: 40,
        width: "auto",
        alt: "brand logo",
        src: "/media/rsz_main_logo.png",
        class: "logo"
    });
    setNavigationHeader(navigationHeader, "header");
    setNavigationFooter(navigationHeader);
}

const setLogo = (href, attributes) => {
    const frag = document.createDocumentFragment();

    const div = document.createElement("div");
    div.classList.add("logo-container");
    const a = document.createElement("a");
    a.setAttribute("href", href);
    const img = document.createElement("img");
    for (const attribute in attributes) {
        img.setAttribute(attribute, attributes[attribute]);
    }

    frag
        .appendChild(div)
        .appendChild(a)
        .appendChild(img);

    document.querySelector("header").appendChild(frag);
}

const setNavigationHeader = (naviLinks, position) => {
    const frag = document.createDocumentFragment();

    const nav = document.createElement("nav");
    nav.setAttribute("id", "navigation-list");
    const ul = document.createElement("ul");

    for (const element in naviLinks) {
        const li = document.createElement("li");
        li.classList.add("navigation-list");
        const a = document.createElement("a");
        a.classList.add("navigation-link");
        a.setAttribute("href", naviLinks[element].href);
        a.setAttribute("navigation", naviLinks[element].link);
        const span = document.createElement("span");
        span.classList.add("navigation-text");
        span.textContent = document.cookie ? naviLinks[element].span[getCookieValue("lang")] : "uk-UA";

        frag
            .appendChild(nav)
            .appendChild(ul)
            .appendChild(li)
            .appendChild(a)
            .appendChild(span);

        if (position.includes("footer")) {
            frag
                .appendChild(nav)
                .appendChild(ul)
                .appendChild(li)
                .appendChild(a)
                .appendChild(span);
        }
    }

    if (window.matchMedia("(max-width:600px)").matches) {
        const mainPage = {
            span: {
                "uk-UA": "Головна",
                "en-US": "Main",
                "pl-PL": "Pierwsza strona"
            },
            svg: "/svg/main.svg",
            link: "main",
            href: "/"
        }

        const li = document.createElement("li");
        li.classList.add("navigation-list");
        const a = document.createElement("a");
        a.classList.add("navigation-link");
        const span = document.createElement("span");
        span.classList.add("navigation-text");

        a.setAttribute("href", mainPage.href);
        a.setAttribute("navigation", mainPage.link);
        span.textContent = document.cookie ? mainPage.span[getCookieValue("lang")] : "uk-UA";

        frag
            .appendChild(nav)
            .appendChild(ul)
            .appendChild(li)
            .appendChild(a)
            .appendChild(span);
    }

    document.querySelector(position).appendChild(frag);
}

const changeLangButton = () => {
    const languageTiles = {
        "uk-UA": {
            span: "Українська",
            svg: "/svg/ua.svg"
        },
        "en-US": {
            span: "English",
            svg: "/svg/en.svg",
        },
        "pl-PL": {
            span:"Polski",
            svg:"/svg/pl.svg"
        }
    }

    const attributes = {
        navigation: "changeLang",
        id: "footer-change-lang",
        class: "change-lang bs-hidden"
    }

    const frag = document.createDocumentFragment();

    const li = document.createElement("li");
    li.setAttribute("id", "change-lang");
    const button = document.createElement("button");
    for (const element in attributes) {
        button.setAttribute(element, attributes[element]);
    }
    button.textContent = multiGlossary.navigation.changeLanguage[document.cookie ? getCookieValue("lang") : "uk-UA"];
    const div = document.createElement("div");
    div.setAttribute("id", "lang-container");
    div.classList.add("lang-container");

    frag
        .appendChild(li)
        .appendChild(button);

    document.querySelector("footer > ul").appendChild(frag);
    document.querySelector("#change-lang").appendChild(div);

    for (const element in languageTiles) {
        const divFlag = document.createElement("div");
        divFlag.classList.add("lang-flag");
        divFlag.setAttribute("lang", element);
        const p = document.createElement("p");
        p.textContent = languageTiles[element].span;

        frag
            .appendChild(divFlag)
            .appendChild(p);

        document.querySelector("#lang-container").appendChild(frag);

        const img = document.createElement("img");
        img.classList.add("lang-icon");
        img.setAttribute("width", "auto");
        img.setAttribute("height", 40);
        img.setAttribute("src", languageTiles[element].svg);
        img.setAttribute("alt", "flag-icon");

        document.querySelectorAll(".lang-flag").forEach(item => {
            item.appendChild(img);
        })
    }

    document.querySelector("#lang-container").appendChild(frag);
}

// set main page language
const setMainPageLanguage = () => {
    document.querySelectorAll(".content-container").forEach(item => {
        if (item.getAttribute("content")) {
            item.querySelector("h2").textContent = multiGlossary.mainPage[item?.getAttribute("content")][document.cookie ? getCookieValue("lang") : "uk-UA"];
        }
        if (item.querySelector("a")) {
            item.querySelector("a").textContent = multiGlossary.mainPage[item?.getAttribute("content")].button[document.cookie ? getCookieValue("lang") : "uk-UA"];
        }
    });
}

const setNavigationFooter = (navigationHeader) => {
    const addressPoint = {
        "uk-UA": "Запоріжжя, Проспект Соборний 159<br> SPOKIY Coffee<br> 69000",
        "en-US": "Sobornyi Ave. 159, Zaporizhzhia, Ukraine<br> SPOKIY Coffee<br> 69000",
        "pl-PL": "Zaporoże, prospekt Soborny 159<br> SPOKIY Coffee<br> 69000"
    }

    document.body.insertAdjacentElement("beforeend", document.createElement("footer"));

    const frag = document.createDocumentFragment();

    const ul = document.createElement("ul");
    ul.classList.add("navigation-list");

    for (const element in navigationHeader) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("href", navigationHeader[element].href);
        a.setAttribute("navigation", navigationHeader[element].link);
        a.textContent = document.cookie ? navigationHeader[element].span[getCookieValue("lang")] : "uk-UA";

        frag
            .appendChild(ul)
            .appendChild(li)
            .appendChild(a);
    }

    document.querySelector("footer").appendChild(frag);

    changeLangButton();

    const address = document.createElement("address");
    const a = document.createElement("a");
    a.setAttribute("href", "https://www.google.pl/maps/place/Sobornyi+Ave,+159,+Zaporizhzhia,+Zaporiz'ka+oblast,+Ukraine,+69000/@47.8487776,35.1177497,17z/data=!3m1!4b1!4m5!3m4!1s0x40dc672eb5a116c1:0x3299cb53e8aa2196!8m2!3d47.848774!4d35.1203246");
    a.innerHTML = addressPoint[document.cookie ? getCookieValue("lang") : "uk-UA"];

    frag
        .appendChild(address)
        .appendChild(a);

    document.querySelector("footer").appendChild(frag);
}

const initialization = () => {
    document.body.setAttribute("lang", navigator.language);

    Object.keys(pageTiles).forEach(item => {
        if(window.location.href.includes(item)) {
            document.title = pageTiles[item];
        }
    });

    document.body.insertAdjacentHTML("afterbegin", `<header class="flex desktop"></header>`);
    setHF();
    setMainPageLanguage();
    setLanguage();
    mediaMaxWidth(window.matchMedia("(max-width:600px)"));
}

initialization();

document.querySelector("#footer-change-lang").addEventListener("click", () => {
    document.querySelector("#lang-container").classList.toggle("visible");
});

document.querySelectorAll(".lang-flag").forEach(item => {
    item.addEventListener("click", event => {
        location.reload();
        setCookie("lang", item.getAttribute("lang"), 21);
        document.body.setAttribute("lang", item.getAttribute("lang"));

        if (!(window.matchMedia("(max-width:600px)").matches)) {
            document.querySelector("#navigation-list > ul").remove();
            setNavigationHeader(navigationHeader, "header");
        }
        setLanguage();
        document.querySelector("#lang-container").classList.remove("visible");
    });
});
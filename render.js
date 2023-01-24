const headerHtml = 
    `<header class="flex">
        <div><a href="/"><img class="logo" src="/media/rsz_main_logo.png" height="40" width="auto" alt=""></a></div>
        <nav>
            <ul>
                <li><a href="#">Меню</a></li>
                <li><a href="/promotions.html">Акції</a></li>
                <li><a href="/reviews.html">Відгуки</a></li>
            </ul>
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
    document.body.insertAdjacentHTML("beforeend", footerHtml);

    multiLang();
}

initialization();
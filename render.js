const headerHtml = 
    `<header class="flex">
        <a href="/"><img class="logo" src="/media/rsz_main_logo.png" height="60" width="auto" alt=""></a>
        <nav>
            <ul>
                <li><a href="/promotions.html"><img class="nav-icons" src="svg/coupon-discount.svg" width="auto" height="40" alt=""><span class="sr-only">Акції</span></a></li>
                <li><a href="/reviews.html"><img class="nav-icons" src="svg/book.svg" width="auto" height="40" alt=""><span class="sr-only">Відгуки</span></a></li>
                <li id="change-lang"><button id="change-lang"><img class="nav-icons" src="svg/english-to-chinese.svg" width="auto" height="40" alt=""><span class="sr-only">Зміна мови</span></button>
                    <div id="lang-container" class="lang-container">
                        <div class="lang-flag"><p>English</p><img class="lang-icon" src="/svg/usa.svg" width="auto" height="40" alt=""></div>
                        <div class="lang-flag"><p>Українська</p><img class="lang-icon" src="/svg/ua.svg" width="auto" height="40" alt=""></div>
                        <div class="lang-flag"><p>Polska</p><img class="lang-icon" src="/svg/pl.svg" width="auto" height="40" alt=""></div>
                    </div>
                </li>
            </ul>
        </nav>
    </header>`;
const footerHtml = 
    `<footer>
    <ul class="navigation-list">
        <li><a href="/promotions.html">Акції</a></li>
        <li><a href="/reviews.html">Відгуки</a></li>
        <li><button id="footer-change-lang" class="change-lang" href="#">Зміна мови</button></li>
    </ul>
    <address>
        <a href="https://www.google.pl/maps/place/Sobornyi+Ave,+159,+Zaporizhzhia,+Zaporiz'ka+oblast,+Ukraine,+69000/@47.8487776,35.1177497,17z/data=!3m1!4b1!4m5!3m4!1s0x40dc672eb5a116c1:0x3299cb53e8aa2196!8m2!3d47.848774!4d35.1203246" target="_blank">
            Запоріжжя, Проспект Соборний 159<br>
            SPOKIY Coffee<br>
            69000
        </a>
    </address>
    </footer>`;

const initialization = () => {
    document.body.insertAdjacentHTML("afterbegin", headerHtml);
    document.body.insertAdjacentHTML("beforeend", footerHtml);
}

initialization();
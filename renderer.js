//кнопки на панели 
const { event } = require("jquery");
const remote = require('electron').remote;
const {shell} = require('electron');
const path = require('path');

(function handleWindowControls() {

    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    };

    function init() {
        let window = remote.getCurrentWindow();
        const minButton = document.getElementById('min-button'),
            maxButton = document.getElementById('max-button'),
            restoreButton = document.getElementById('restore-button'),
            closeButton = document.getElementById('close-button');
        //Кнопка чтобы свернуть приложение 
        minButton.addEventListener("click", () => {
            window = remote.getCurrentWindow();
            window.minimize();
        });

        //Кнопка чтобы закрыть приложение
        closeButton.addEventListener("click", () => {
            window = remote.getCurrentWindow();
            window.close();
        });

        function toggleMaxRestoreButtons() {
            window = remote.getCurrentWindow();
            if (window.isMaximized()) {
                maxButton.style.display = "none";
                restoreButton.style.display = "flex";
            } else {
                restoreButton.style.display = "none";
                maxButton.style.display = "flex";
            }
        }
    }
})();

//Меню
// $("#js-menu").html(`
// <div class="menu-bg-blur">
//     <div class="menu-bg-close">
//  </div>
//  <div class="red-bg"></div>
// </div>

// <div id="menu">
//     <div id="dragmenu"></div>
//         <a href="./index.html"><div id="menu-logo"></div></a>
//             <div id="burger-menu">
//             <div id="line" class="line1"></div>
//         <div id="line" class="line2"></div>
//         <div id="line" class="line3"></div>
// </div>
// <div id="buttons">
//     <div id="window-controls">
//     <div class="button" id="close-button">

//     </div>
//     <!-- <div class="button" id="max-button"></div> -->
//     <div class="button" id="min-button">

//     </div>
// </div>

// </div>
// </div>
// <div id="but-menu">
//     <div class="vk-link"><span><a id="link-view" href="https://github.com/genshinlauncher" target="_blank">GITHUB</a></span></div>
//     <div class="dop-info">
//     <span class="version">  <span id="nowver" style="float: right;"></span></span>
//     <span class="author">by <a href="https://thefunnyday.github.io/" class="author" id="link-view" target="_blank"> TheFunnyDay</a></span>
//     </div>
// </div>
// <div class="pod-menu">
// <ul class="pod-menu-list">
// <div style="height: 100px;"></div>
//        <a href="./index.html"><li>главная</li></a>
//         <a href="./codes.html"><li>промокоды</li></a>
//         <a href="./map.html"><li>карта</li></a>
//         <a href="./settings.html"><li>настройки</li></a>
//         <li><a href="https://www.donationalerts.com/r/tfunnyday_"id="link-view" target="_blank">донат</a></li>
//         <li><a href="https://thefunnyday.github.io/" id="link-view" target="_blank">автор</a></li>
//        <!-- <a href="./thanks.html"><li>благодарность</li></a>--!>
//         <li><a href="https://forms.gle/BryYMYjkNoeZ9smP9" id="link-view" style="padding-right:0;" target="_blank">сообщить об ошибке</li></a>
// </ul>
// `);
//Закрытие меню через бургер 


//открытие игры
$('#play').on('click', () => {
    var game = path.join(__dirname, '..', '..', '..', '..'  + "\\Genshin Impact Game\\GenshinImpact.exe");
    var open = shell.openItem || shell.openPath;
    open(game);
    window = remote.getCurrentWindow();
    window.minimize();
});
$('#save').on('click', () => {
    remote.getCurrentWindow().reload();
});
$('body').on('click', 'a.link-view', (event) => {
    event.preventDefault();
    let link = event.target.href;
    require("electron").shell.openExternal(link);
});

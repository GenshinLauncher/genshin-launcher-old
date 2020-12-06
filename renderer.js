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
        minButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.minimize();
        });

        //Кнопка чтобы закрыть приложение
        closeButton.addEventListener("click", event => {
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
$("#js-menu").html(`
<div class="menu-bg-blur"></div>

<div id="menu">
    <div id="dragmenu"></div>
        <a href="./index.html"><div id="menu-logo"></div></a>
            <div id="burger-menu">
            <div id="line" class="line1"></div>
        <div id="line" class="line2"></div>
        <div id="line" class="line3"></div>
</div>
<div id="buttons">
    <div id="window-controls">
    <div class="button" id="close-button">

    </div>
    <!-- <div class="button" id="max-button"></div> -->
    <div class="button" id="min-button">

    </div>
</div>

</div>
</div>
<div id="but-menu">
    <div class="vk-link"><span><a id="link-view" href="https://github.com/genshinlauncher" target="_blank">GITHUB</a></span></div>
    <div class="dop-info">
    <span class="version">  <span id="nowver" style="float: right;"></span></span>
    <span class="author">by <a href="" id="author"> TheFunnyDay</a></span>
    </div>
</div>
<div class="pod-menu">
<ul class="pod-menu-list">
<div style="height: 100px;"></div>
        <a href="./codes.html"><li>Прокоды</li></a>
        <a href=""><li>донат</li></a>
        <a href=""><li>авторы</li></a>
        <a href="./thanks.html"><li>благодарность</li></a>
        <li><a href="https://forms.gle/BryYMYjkNoeZ9smP9" id="link-view" target="_blank">сообщить об ошибке</li></a>
</ul>
`);
document.querySelector('#burger-menu').addEventListener('click', function (e) {
  e.preventDefault();
  if (this.classList.contains('.burger-active')) {
      this.classList.remove('.burger-active');
      document.querySelector('.pod-menu').style.left = "-400px";
      document.querySelector('.line1').style.width =  '';
      document.querySelector('.line2').style.width =  '';
      document.querySelector('.line1').style.backgroundColor =  '';
      document.querySelector('.line2').style.backgroundColor =  '';
      document.querySelector('.line3').style.backgroundColor =  '';
      document.querySelector('.menu-bg-blur').style.opacity =  '0';
      document.querySelector('.menu-bg-blur').style.backdropFilther =  'blur(0px)';
      document.querySelector('.menu-bg-blur').style.left =  '-100%';
  }
  else {
      this.classList.add('.burger-active');
      document.querySelector('.menu-bg-blur').style.opacity =  '100%';
      document.querySelector('.menu-bg-blur').style.backdropFilther =  'var(--blur20)';
      document.querySelector('.menu-bg-blur').style.left =  '0%';
      document.querySelector('.pod-menu').style.left = "0px";
      document.querySelector('.line1').style.width =  '40px';
      document.querySelector('.line2').style.width =  '40px';
      document.querySelector('.line1').style.backgroundColor =  'rgb(0, 110, 255)';
      document.querySelector('.line2').style.backgroundColor =  'rgb(0, 110, 255)';
      document.querySelector('.line3').style.backgroundColor =  'rgb(0, 110, 255)';
  }
});



//открытие игры
$('.play').on('click', (event) => {
    var game = path.join(__dirname, '..', '..', '..', '..'  + "\\Genshin Impact Game\\GenshinImpact.exe");
    var open = shell.openItem || shell.openPath;
    open(game);
    window = remote.getCurrentWindow();
    window.minimize();
});

$('body').on('click', 'a#link-view', (event) => {
    event.preventDefault();
    let link = event.target.href;
    require("electron").shell.openExternal(link);
});

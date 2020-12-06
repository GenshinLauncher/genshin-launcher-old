

//Скрипты-стили

$("#app").css({
    "background-image": `url(${openinfo.bgNow})`,
})
$("#main-char").css({
    "background-image": `url(${charNow[Math.floor(Math.random() * charNow.length)]})`, 
});

//Автор лаунчераы
$("#author").html(`${openinfo.launcherAuthor}`);
//актуальная версия лаунчера
$("#nowver").html(`&nbsp;${ openinfo.launcherName + `&nbsp;` + openinfo.launcherVer}`);
//появление персонажа )
$("#main-char").animate({
    left: `-30%`, 
    opacity: '1',
}, 1200);



document.onkeydown = function(event) {
    if(event.code == 'AltLeft') flag = true;
    if(event.code == 'KeyC'&&flag) {
        flag = false;
        // window.open("https://youtu.be/rRPQs_kM_nw");
        $('#main-char').append(`
        <iframe class="polishcow" width="100" height="56" src="https://www.youtube.com/embed/rRPQs_kM_nw?autoplay=1;controls=0" frameborder="0" allow="accelerometer; autoplay="true"; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
        `)
    }
};
document.onkeyup = function(event) {
    if(event.code == 'AltLeft') flag = true;
    if(event.code == 'KeyX'&&flag) {
        flag = false;
        // window.open("https://youtu.be/rRPQs_kM_nw");
        $('.polishcow').remove();
    }
};


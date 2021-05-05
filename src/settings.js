
$(".see-bg").css({
    "background-image": `url(${localStorage.getItem("customAppBg") ||  openinfo.bgNow})`,
})
save.onclick = function(){
    let settingsBg = document.getElementById('userBg').value;
    localStorage.setItem('customAppBg', settingsBg);
};
var isFixed = false;
var oDiv = document.getElementsByClassName('banner')[0];
var fixFlage = false;
window.onscroll = function () {
    var scrooTop = window.pageYOffset;
    isFixed = scrooTop > 500 ? true : false;
    if (isFixed === fixFlage) {
        return;
    }else{
        if(isFixed) {
            oDiv.classList.add('active');
            fixFlage = true;
       }else{
        oDiv.classList.remove('active');
        fixFlage = false;
       }
    }
}
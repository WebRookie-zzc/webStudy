let imgWidth = $('img').width();
// console.log(imgWidth);
let startPointX = 0,
    startLeft = 0,
    movePointX = 0,
    len = $('.slide a').length;
    // console.log(len);
    ln = 0,
    cn = 0,
    timer = null;
var hn = 0;

$('.slide').on('touchstart', (e) => {
    clearInterval(timer);
    timer = null;
    startPointX = e.changedTouches[0].pageX;
    $('.slide').css('transition', '0s');
    // console.log(cn);
    if(cn === 0) {
        ln = cn % 5;
        cn = len / 2;
        hn = cn % 5;
    }else if(cn === len - 1){
        ln = cn % 5;
        cn = len / 2 - 1;
        hn = cn % 5;
    }
    $('.slide').css('transform', `translateX(${-cn * imgWidth}px)`)
    // console.log($('.slide')[0].style.transform);
    startLeft = parseInt($('.slide')[0].style.transform.split('(')[1]);
})

$('.slide').on('touchmove', (e) => {
    movePointX = e.changedTouches[0].pageX - startPointX;
    $('.slide').css('transform', `translateX(${startLeft + movePointX}px)`)
})

$('.slide').on('touchend', (e) => {
    move();
    movePointX = e.changedTouches[0].pageX - startPointX;
    let backWidth = imgWidth / 8;
    if(Math.abs(movePointX) > backWidth){
        ln = cn % 5;
        cn -= movePointX / Math.abs(movePointX);
        hn = cn % 5;
        // console.log(cn);
    }
    $('.slide').css({
        transform : `translateX(${-cn * imgWidth}px)`,
        transition : '.3s',
    })
    // console.log(ln, cn);
    $(`.line span:eq(${ln})`).removeClass('active');
    $(`.line span:eq(${hn})`).addClass('active');
})

function move () {
    timer = setInterval(() => {
        ln = cn % 5;
        cn++;
        $('.slide').css({
            transform : `translateX(${-cn * imgWidth}px)`,
            transition : '.3s',
        });
        hn = cn % 5;
        if(cn === len - 2){
            
            cn = 3;
            $('.slide').on('transitionend', function () {
                $(this).css({
                    transform : `translateX(${-cn * imgWidth}px)`,
                    transition : '0s'
                })
            })
        }
        $(`.line span:eq(${ln})`).removeClass('active');
        $(`.line span:eq(${hn})`).addClass('active');
    },2000)
}

move();
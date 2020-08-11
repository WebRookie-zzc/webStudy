$(function () {
    var per = 0;
    var timer1 = setInterval(function () {
        per ++;
        if(per > 100){
            clearInterval(timer1);
            $('.loading').addClass('accomplish');
            setTimeout(function () {
                $('.loading').fadeOut(500);
                setTimeout(function () {
                    $('.text').html(`
                        <h2>We are</h2></br>
                        <h2>SQUARE</h2><br/>
                        <h2>MONSTER</h2>
                        <span>Ahhhh,we'll eat you</span>
                    `)
                }, 2000);
            }, 500);
        }
        $('.loadedBar').css({
            width : per + '%',
        });
    }, 40);
})
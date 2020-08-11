function slideShow (index) {
    for(let i = 1; i <= 4; i++){
        if(i === index){
            document.getElementsByClassName('bg')[i-1].classList.add('active');
            $(`.item:nth-child(${i})`).css({
                width : '100%',
            });
            // $('i').css('display', 'block');
            // console.log(1);
        }else{
            document.getElementsByClassName('bg')[i-1].classList.remove('active');
            // console.log(2);
            $(`.item:nth-child(${i})`).css({
                width : '0%',
            });
        }
    }
}


function closeAll () {
    $('.bg').removeClass('active');
    $('.item').css('width', '25%');
    $('i').css('display', 'none');
    $('.dis').css('display', 'none');
}

for(let i = 1; i <= 4; i++){
    $(`.item:nth-child(${i})`).on('click', function () {
        slideShow(i);
        $('i').css('display', 'block');
        $('.dis').css('display', 'block');
    })
}

$('i').on('click', closeAll);

window.onscroll = function () {
    let vh = document.documentElement.clientHeight;
    let sh = document.documentElement.scrollTop;
    let height = vh - sh;
    console.log(height);
    if(height < 50){
        height = 50;
    }
    $('.blocks').css('height', `${height}px`);
}
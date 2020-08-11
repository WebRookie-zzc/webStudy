const ulW = parseInt($('ul').css('width'));
const ulH = parseInt($('ul').css('height'));
const liW = ulW / 5;
const liH = ulH / 5;
var $ul = $('ul');

function createLis () {
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            var index = 5 * i + j;
            $(`<li><div class='box'><img src='./imgs/${index}.jpg'></div></li>`).appendTo($ul)
            .css({
                width : liW + 'px',
                height : liH + 'px',
            })
            .find('.box').css({
                width: '100%',
                height : '100%',
                transform : 'scale(0.8)'
            })
            .find('img').css({
                width: '100%',
                height : '100%',
                transform : 'scale(0.9)',
            })
            .end()
            .end()
            .css({
                 transform : `rotate(${20*Math.random()-10}deg)
                 translateX(${30 * j - 60}px)
                 translateY(${20 * i - 40}px)
                 translateZ(${- Math.random() * 150}px)`,
            });
        }
    }
}

function addEvent () {
    var key = true;
    $('img').on('click', function () {
        if(key){
            $('li').css({
                transform : `rotate(0deg)
                 translateX(0px)
                 translateY(0px)
                 translateZ(0px)`,
            })
            .find('.box').css({
                transform : 'scale(1)'
            })
            .find('img').css({
                transform : 'scale(1)',
                width : '500%',
                height : '500%',
            })
            .attr('src', `${$(this).attr('src')}`);
            $('img').each(function (index) {
                $(this).css({
                    left : `-${(index%5)*liW}px`,
                    top : `-${parseInt(index/5)*liH}px`
                });
            });
            key = false;
        }else{
            key = true;
            $('li').each(function (index) {
                $(this).css({
                    transform : `rotate(${20*Math.random()-10}deg)
                     translateX(${30 * (index%5) - 60}px)
                     translateY(${20 * parseInt(index / 5) - 40}px)
                     translateZ(${- Math.random() * 150}px)`,
                })
                .find('img').attr('src', `./imgs/${index}.jpg`)
            })
            .find('.box').css({
                transform : 'scale(0.8)'
            })
            .find('img').css({
                transform : 'scale(0.9)',
                width : '100%',
                height : '100%',
            })
            $('img').each(function (index) {
                $(this).css({
                    left : `0`,
                    top : `0`
                });
            });
        }
    });
} 

createLis();
addEvent();
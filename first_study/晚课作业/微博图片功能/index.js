var ln = 0;
var cn = 0;
var position = 0;

function init() {
    addSrc();
    littleToBig();
    judgePosition();
    bigToLittle();
    change();
    move();
    changedrection();
}
init();

/**
 * 插入图片的路径
 */
function addSrc() {
    for(let i = 0; i < 10; i++) {
        $(`.front-item:eq(${i})`).find('img').attr('src', `./img/${i}.jpg`).attr('index', i);
    }
    
    for(let i = 0; i < 10; i++) {
        $(`.behind-item:eq(${i})`).find('img').attr('src', `./img/${i}.jpg`).attr('index', i);
    }
}
/**
 * 小图变大图
 */
function littleToBig() {
    $('.front-list').on('click', function (e) {
        $('.front').css({
            display : 'none',
            // opacity : 1,
        });
        $('.behind').css({
            display: 'block',
        })
        // console.log(e.target);
        // console.log(isImg);
        // console.log($(e.target));
        // console.log(e.target.src);
        if(!e.target.src){
            $('.bigImg').find('img').attr('src', './img/0.jpg');
            cn = 0;
            repleace();
            // console.log(1);
        }else{
            $('.bigImg').find('img').attr('src', e.target.src);
            cn = $(e.target).attr('index');
            repleace();
            wrapMove($('.behind-list').find('img')[cn]);
        }
    });
}

/**
 * 判断鼠标在大图的什么位置
 */
function judgePosition () {
    $('.bigImg').on('mousemove', function (e) {
        var dis = e.clientX - this.offsetLeft;
        // console.log(dis);
        if(dis < this.offsetWidth / 3){
            // console.log('left');
            position = 'left';
        }else if (dis > 2 * this.offsetWidth / 3){
            // console.log('right');
            position = 'right'
        }else{
            // console.log('center');
            position = 'center';
        }
        changeCursor();
    });
}

/**
 * 改变鼠标光标
 */
function changeCursor () {
    // console.log(position);
    if(position == 'left'){
        // console.log(1);
        $('.bigImg').find('img').css({
            cursor : "url(./img/pic_prev.cur), auto"
        });
    }else if(position == 'right'){
        $('.bigImg').find('img').css({
            cursor : "url(./img/pic_next.cur), auto"
        })
    }else{
        $('.bigImg').find('img').css({
            cursor : "zoom-out",
        });
    }
}
/**
 * 大图变小图
 */

function bigToLittle () {
    $('.bigImg').on('click', function () {
        if(position == 'center'){
            $('.front').css({
                display : 'block'
            });
            $('.behind').css({
                display: 'none',
            });
            $('.front').css({
                opacity : 0,
            });
            setTimeout(function () {
                $('.front').css({
                    opacity : 1,
                });
            }, 200);
    }else if(position == 'left'){
        cn--;
        if(cn < 0) {
            cn = 9
        }
    }else{
        cn++;
        if(cn > 9){
            cn = 0;
        }
    }
    // $('.bigImg').find('img').css({
    //     opacity : 0,
    // });
    repleace();
    // setTimeout(function () {
    //     $('.bigImg').find('img').css({
    //         opacity : 1,
    //     });
    //     // console.log(1);
    // }, 1);
    wrapMove($('.behind-list').find('img')[cn]);
    })
}

/**
 * 点击切换图片
 */

function change () {
    $('.behind-item').on('click', function () {
        var self = this;
        changeBigImg(self);

    })
}

function changeBigImg(self){
    // console.log($(this));
        // console.log($(this).attr('src'));
        // $('.behind-item').find(`img:eq(${ln})`).removeClass('active');
        $('.behind-item').find('img')[ln].classList.remove('active');
        // console.log($(this).find('img').attr('index'));
        cn = $(self).find('img').attr('index');
        // console.log(cn);
        // console.log($('.behind-item').find('img'));
        // console.log(cn);
        // $('.behind-item').find(`img:eq(${cn})`).addClass('active');
        $('.behind-item').find('img')[cn].classList.add('active');
        $('.bigImg').find('img').css({
            opacity : 0,
        });
        setTimeout(function () {
        $('.bigImg').find('img').css({
            opacity : 1,
        });
        $('.bigImg').find('img').attr('src', $(self).find('img').attr('src'));
        ln = cn;
        // console.log(1);
    }, 300);
        
        // console.log(cn == 0);
        // if(cn == 0){
        //     for(var i = 1; i < 10;i++){
        //         $('.behind-item').find(`img:eq(${i})`).removeClass('active');
        //      }
        // }
}

function repleace () {
    $('.behind-item').find('img')[ln].classList.remove('active');
    $('.behind-item').find('img')[cn].classList.add('active');
    $('.bigImg').find('img').css({
        opacity : 0,
    });
    
    setTimeout(function () {
        $('.bigImg').find('img').css({
            opacity : 1,
        });
        $('.bigImg').find('img').attr('src', `./img/${cn}.jpg`);
        ln = cn;
        // console.log(1);
    }, 300);
}

/**
 * 底部土片中心显示
 */
function move () {
    $('.behind-item').on('click', function () {
        var dis = -($(this).find('img')[0].offsetLeft + $(this).find('img')[0].offsetWidth / 2 - ($('.ul-list')[0].offsetLeft + 10 + 600 / 2));
        // console.log(dis);
        var oldDis = parseInt($('.behind-list').attr('style').split("(")[1]);
        // console.log(oldDis);
        var newDis = dis + oldDis;
        if(dis > 0){
            dis = 0;
        }else if(dis < -460){
            dis = -460;
        }
        $('.behind-list').css({
            transform: `translateX(${dis}px)`,
        });
    })
}

function wrapMove (dom) {
    // console.log(dom);
    var dis = -(dom.offsetLeft + dom.offsetWidth / 2 - ($('.ul-list')[0].offsetLeft  + 600 / 2));
    if(dis > 0){
        dis = 0;
    }else if(dis < -460){
        dis = -460;
    }
    // console.log(dis);
    $('.behind-list').css({
        transform: `translateX(${dis}px)`,
    });
}

/**
 * 箭头效果
 */

function changedrection () {
    $('.left').on('click', function () {
        // console.log(1);
        $('.behind-list').css({
            transform : 'translateX(-0)',
        });
    });
    $('.right').on('click', function () {
        $('.behind-list').css({
            transform : 'translateX(-460px)',
        })
    })
}


function changeBig () {
    $('.bigImg').find('img').on('click', function () {
        if(position == 'left'){}
    })
}
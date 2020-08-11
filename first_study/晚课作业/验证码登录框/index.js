//存储验证码的基本字符
const arr = [];
var val = '';
for(let i = 0; i <= 9; i++){
    arr.push(i);
}

for(let i = 65; i < 122; i++) {
    if(i > 90 && i < 97 ){
        continue;
    }
    arr.push(String.fromCharCode(i));
}

/**
 * 生成验证码字符串
 */
function createCode () {
    var value = '';
    var showValue = ''
    for(let i = 0; i < 6; i++) {
        let temp = arr[Math.floor(Math.random() * arr.length)];
        value += temp;
        showValue += temp + ' ';
    }
    return [value , showValue];
}

// let [value,showValue] = createCode();

/**
 * 创建画板元素
 */
function createCanvas () {
    let myCanvas = $('#code')[0];
    let ctx = myCanvas.getContext('2d');
    let oImg = new Image();
    oImg.src = './img/bg.jpg'
    oImg.onload = function () {
        let pattern = ctx.createPattern(oImg, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0,0, myCanvas.width,myCanvas.height )
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000';
        ctx.font = '25px Roboto Slab';
        ctx.setTransform(1, -0.12, 0.3, 1, 0, 12);
        let [value,showValue] = createCode(); 
        val = value;
        // console.log(val);
        // console.log(showValue);
        ctx.fillText(showValue,myCanvas.width / 2, 30)
    }
}
createCanvas();

/**
 * 点击刷新
 */
$('.fresh').on('click', function () {
    createCanvas();
    $('input')[0].value = '';
    $('.judge').css('display', 'none');
    $('.error').css('display', 'none');
});

/**
 * DOM
 */
$('input').on('input', function () {
    if($(this).val() != val){
        $('.wrong').css({
            color : '#f00',
            display: 'block'
        });
        $('.right').css('display', 'none');
        $('.error').css('display', 'block');
    }else if ($(this).val() == val) {
        $('.right').css({
            color : '#0f0',
            display: 'block'
        });
        $('.wrong').css('display', 'none');
        $('.error').css('display', 'none');
    }
})

$('.submit').on('click', function () {
    if($('input').val() == val){
        alert('提交成功')
    } else{
        alert('验证码不正确，提交失败')
    }
})
var page = 1;

/**
 * 渲染页面
 */
function render () {
    
    let temp = '';
    infoList.forEach((item) => {
        temp += `
        <li class="itme" style='background-image: url(${item.poster});'>
        <div class="black">
            <div class="info">
                <div class="title">${item.title}</div>
                <span class="up">up : ${item.up}</span><br>
                <span class="play">${item.play}播放</span>
            </div>
        </div>
    </li>
        `
    });
    $('ul').html(temp);
}

render();

$('.btn').on('click', function () {
    if($(this).hasClass('left')){
        if(page == 1) {
            $('ul').css('transform', 'translateX(-1718px)');
            page = 3;
        }else if(page == 2) {
            $('ul').css('transform', 'translateX(0px)');
            page = 1;
        }else{
            $('ul').css('transform', 'translateX(-854px)');
            page = 2;
        }
    }else if($(this).hasClass('right')){
        if(page == 1) {
            $('ul').css('transform', 'translateX(-854px)');
            page = 2;
        }else if(page == 2) {
            $('ul').css('transform', 'translateX(-1718px)');
            page = 3;
        }else{
            $('ul').css('transform', 'translateX(0px)');
            page = 1;
        }
    }
})
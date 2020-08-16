/**
 * 限免英雄的滑动
 */
function heroSlide (heros) {
    let freeHero = filter(heros, 'free',"");
    lastIndex = 0;
    // 渲染
    let html = ``;
    for(let i = 0; i < 7; i++){
        if(i==0){
            html += `
            <li class="header-free-hero-item header-active" index="${i}">
            <img src="${freeHero[0].bigImg}" class="free-hero">
                        </li>
            `
        }else{
            html += `
            <li class="header-free-hero-item" index="${i}">
            <img src="${freeHero[i].imgUrl}" class="free-hero">
            </li>
            `
        }
    }
    $('.header-free-hero-ul').html(html);
    $('.header-free-hero-item:eq(0)').css('width', '224px').find('.free-hero').css('width', '224px');
    // 注册事件
    $('.header-free-hero-item').on('mouseenter', function () {
        $(`.header-free-hero-item:eq(${lastIndex})`).removeClass('header-active')
        .css('width', '69px')
        .find('img')
        .css('width','69px');
            $(`.header-free-hero-item:eq(${lastIndex})`).find('img').attr('src', `${freeHero[lastIndex].imgUrl}`);
            // console.log(1);
        lastIndex = $(this).attr('index');
        $(this).css('width', '224px')
        .find('img')
        .css('width', '224px')
        .attr('src', freeHero[lastIndex].bigImg);
    })
}
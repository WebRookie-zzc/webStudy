/**
 * 将省市信息填到父元素中
 * @param {object} $container 父元素
 * @param {Array} data 信息
 */
function renderLinkage ($container, data) {
    let str = ``;
    if(data[0].provinceName){
        for(let i = 0; i < data.length;i++){
            str += `<li class="province-item" index="${i}"><span>${data[i].provinceName}</span></li>`;
        }
    }else{
        for(let i = 0; i < data.length;i++){
            str += `<li class="city-item"><span>${data[i].name}</span></li>`;
        }
    }
    $container.html(str);
}

/**
 * 控制元素是否可见
 * @param {object} $ele DOM元素
 * @param {boolean} bool 是否可见
 */
function visable($ele,bool) {
    if(bool){
        $ele.css('display', 'block');
    }else{
        $ele.css('display', 'none');
    }
}
/**
 * 注册事件
 */
function linkageEvent(data) {
    let lastSpan = null;
    let lastCitySpan = null;
    /**
     * 控制display
     */
    document.getElementsByClassName('divProvince')[0].addEventListener('click', () => {
        visable($('.provinceWap'),true);
    },true);
    document.addEventListener('click', () => {
        visable($('.provinceWap'),false);
        visable($('.cityWap'),false);
    },true);
    document.getElementsByClassName('divCity')[0].addEventListener('click', () => {
        if(!$('.divCity').hasClass('not-allow')){
            visable($('.cityWap'),true);
        }
    },true);
    $('.provinceLists li').on('click', function () {
        if(lastSpan){
            lastSpan.removeClass('active');
        }
        $(this).find('span').addClass('active');
        $('.divProvince .inInput').text($(this).find('span').text());
        $('.divCity .inInput').text("城市");
        lastSpan = $(this).find('span');
        renderLinkage ($('.cityLists'),data[$(this).attr('index')].cityInfoList);
        $('.cityLists li').on('click', function () {
            if(lastCitySpan){
                lastCitySpan.removeClass('active');
            }
            $(this).find('span').addClass('active');
            $('.divCity .inInput').text($(this).find('span').text());
            lastCitySpan = $(this).find('span');
        });
        $('.divCity').removeClass('not-allow');
    });
}
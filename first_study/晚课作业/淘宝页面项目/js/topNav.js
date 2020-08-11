/**
 * 鼠标悬停父元素，显示子元素列表
 * @param {object} parent 鼠标悬停的父元素
 * @param {object} child 显示的子元素
 */
function _hideAndShow (parent, child) {
    $(parent).on('mouseenter', function () {
        $(child).css('display', 'block');
        $(parent).addClass('active');
    });
    $(parent).on('mouseleave', function () {
        var timer1 = setTimeout(function () {
            $(child).css('display', 'none');
            $(parent).removeClass('active');
        }, 50);
        $(child).on('mouseenter', function () {
            clearInterval(timer1);
        });
        $(child).on('mouseleave', function () {
            $(this).css('display', 'none');
            $(parent).removeClass('active');
        })
    })
}

/**
 * 显示隐藏功能的封装；
 * 鼠标悬停父元素，显示子元素列表
 */
function topNav () {
    _hideAndShow($('.slideFirstParent'), $('.slideDownFirstChild'));
    _hideAndShow($('.slideSecondParent'), $('.slideDownSecondChild'));
    _hideAndShow($('.slideThirdParent'), $('.slideDownThirdChild'));
    _hideAndShow($('.slideForthParent'), $('.slideDownForthChild'));
    _hideAndShow($('.slideFifthParent'), $('.slideDownFifthChild'));
    _hideAndShow($('.slideSixthParent'), $('.sildeDownSixthChild'));
}
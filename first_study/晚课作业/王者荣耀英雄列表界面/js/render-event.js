/**
 * 渲染搜索结果
 * @param {Array} newData 过滤后的新数组
 */
function render (newData) {
    let html = ``;
    for(let i = 0; i < newData.length;i++){
        html += `
        <li class="hero-reasult">
            <img src="${newData[i].imgUrl}" class="hero-reasult-img">
            <span class="name">${newData[i].name}</span>
        </li>
        `
    }
    $('.search-reasult').html(html);
}
lastSelect = $('.select:eq(2)');
function cevent() {
    $('.select').on('click', function () {
        lastSelect.find('.outside').removeClass('select-active');
        $(this).find('.outside').addClass('select-active');
        lastSelect = $(this);
        var newData = filter(heros, $(this).attr('data-type'),$(this).attr('data-key'));
        render(newData);
    });
    $('input').on('input', () => {
        render(filter(heros, 'key', $('input').val()));
        lastSelect.find('.outside').removeClass('select-active');
        lastSelect = $('.select:eq(2)');
        lastSelect.find('.outside').addClass('select-active');
    })
}

cevent()
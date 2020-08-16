$.ajax({
    url: './data.json',
    dataType : "json",
    data : null,
    type : "GET",
    success: (data) => {
        render(data, 0);
        createEvent(data);
    }
})

/**
 * 数据渲染
 * @param {Object} data json对象
 * @param {number} index 城市索引
 */
function render(data, index) {
    let str = ``;
    for(let i = 0; i < 6; i++) {
        var temp = data[index].productList[i];
        str += `
        <li class="content-item">
        <img src="${temp.coverImage}" class="produce">
        <img src="https://p0.meituan.net/mmc/35ad1f9253761ea6ff822b5e659f234f3758.png" class="avatar">
        <p class="title">${temp.title}</p>
        <p class="live">整套${temp.layoutRoom}居室·可住${temp.maxGuestNumber}人 | ${temp.locationArea? temp.locationArea : ""}</p>
        <p class="pay">￥${temp.price}</p>
        </li>
        `
    }
    $('.content-wrapper').html(str);
}

function createEvent (data) {
    $('.nav-city').on('mouseenter', function () {
        setTimeout(() => {
            var index = $(this).attr('index');
            $('.nav-city').removeClass('active');
            $(this).addClass('active');
            render(data,index);
        },200);
    });
}
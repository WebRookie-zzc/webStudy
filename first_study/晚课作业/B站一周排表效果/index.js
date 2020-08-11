$.ajax({
    type : 'GET',
    url: './data.json',
    dataType: 'json',
    data : null,
    success: function (data) {
        // console.log(data[0]);
        render(data[0].New);
        $('.week').on('click',(e) => {
            head(e);
            prevRender(e,data);
        });
    }
})

/**
 * 
 * @param {Object} data json返回的数据
 */
let render = (newData) => {
    var str = ``;
    for(let i = 0; i < newData.length; i++){
            str += `
            <li class="anime">
            <img  class="pic" src="${newData[i].pic}">
            <p class="title">${newData[i].title}</p>
            <span class="num">${newData[i].num ? '第'+ newData[i].num + '话' : '本周停更'}</span>
        </li>
            `
    }
    $('.sheet').html(str);
}

/**
 * 
 * @param {Object} $e jquery对象
 */
function head (e) {
    $e = $(e.target);
    if($e.hasClass('week-item')){
        $('.week li').removeClass('active');
        $e.addClass('active');
    }
}

function prevRender (e, data){
    $e = $(e.target);
    if($e.hasClass('week-item')){
        var mark = e.target.classList[1];
        // console.log(mark);
        render(data[0][mark]);
    }
}
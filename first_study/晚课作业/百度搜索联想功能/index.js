function addLis (data) {
    setTimeout(function () {
        $('input').on('keyup', function () {
        })
        $('ul').html('');
        for(let i = 0; i < data.s.length; i++){
            $(`<li>${data.s[i]}</li>`).appendTo($('ul'))
        }
    }, 1000);
}


$('input').on('focus', function () {
    $('.search-container').addClass('foucs');
})

$('input').on('blur', function () {
    $('.search-container').removeClass('foucs').removeClass('tips');
})

$('input').on('keyup', function () {
    if($('input').val()){
        $('.search-container').addClass('foucs').addClass('tips');
        addLis();
    }else{
        $('ul').html('');
        $('.search-container').removeClass('tips');
    }
})

// function getData (value) {
//     $.ajax({
//         type: 'GET',
//         url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value,
//         data : null,
//         dataType : 'json',
//         beforeSend : function (XMLHttpRequest) {
//             XMLHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
//         },
//         success: function (data) {
//             console.log(data);
//         }
//     })
// }

// getData('jquery');

// result.onkeyup=function(e){
//     var value=this.value;
//     var sc=document.createElement("script");
//     //百度API接口  &cb=showData为回调函数   value是用户输入的值
//     sc.src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+value+"&cb=showData";
//     document.body.appendChild(sc);
//     sc.remove();//remove() 方法用于从下拉列表删除选项。
// };

$('input').on('keyup', function () {
    var sc=document.createElement("script");
    sc.src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$(this).val()+"&cb=addLis";
    document.body.appendChild(sc);
})
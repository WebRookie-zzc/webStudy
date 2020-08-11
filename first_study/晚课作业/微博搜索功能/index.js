var timer = null;

$('input').on('input', function () {
    var val = $(this).val();
    // console.log(val);
    var oScript = document.createElement('script');
    oScript.src = 'https://s.weibo.com/ajax/topsuggest.php?key='+ val + '&_v=getData';
    document.body.appendChild(oScript);
});

function getData (data) {
    var str = '';
    // console.log(this);
    $('.slideDown').html("");
    clearTimeout(timer);
    timer = setTimeout( () => {
        console.log(data);
        if(!data.data){
            return;
        }
        var querys = data.data.querys;
        var users = data.data.user;
        // console.log(users, querys);
        if(querys && querys.length){
            str += `
            <ul class='query'>
                <li>搜"<span class='val'>${$('input').val()}"</span>相关微博</li>
            `
            querys.forEach(function (item) {
                // console.log(item);
                str += `<li>${item.key}</li>`
            })
            str += '</ul>'
        }
        if(users && users.length){
            str += `
            <ul class="user">
                 <li>搜"<span class="val">"${$('input').val()}"</span>"相关用户  》》</li>
            `
            users.forEach(function (item) {
                str += `
                <li><img src="${item.u_pic}" alt="">
                         <span class="u_name">${item.u_name}</span>
                         <span class="sex ic male">${item.sex == 'm' ? '&#xe628;' : '&#xe629;'}</span>
                         <span class="fun">粉丝：${item.fans_n}</span>
                         </li>
                `
                str += '</ul> '
            });
        }
        // str+= `
        // 
        //     <ul class="user">
        //         <li>搜"<span class="val">广东</span>"相关用户  》》</li>
        //         <li><img src="https://tvax4.sinaimg.cn/crop.7.26.613.613.180/74fdc381ly8gdimm1xajpj20hs0hs40e.jpg?KID=imgbed,tva&Expires=1596041320&ssig=saWJtm7U%2Fw" alt="">
        //         <span class="u_name">健康广东</span>
        //         <span class="sex ic male">&#xe628;</span>
        //         <span class="fun">粉丝：55656776</span>
        //         </li>
        //     </ul>
        // `
        $('.slideDown').html(str);
    },300);
}
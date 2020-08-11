var data = [145, 235, 130, 242, 193, 945, ''];

var key = 1;

function render (data) {
    var temp = '';
    if(key){
        temp += 
        `
        <div class="vote-desc">你对最近的动漫感兴趣的是什么？</div>
        <ul class="content">
                <li class="item" index='0'>BanG Dream! 少女乐团派对！</li>
                <li class="item" index='1'>高达创形者 再起 第二季</li>
                <li class="item" index='2'>天气之子</li>
                <li class="item" index='3'>没落要塞</li>
                <li class="item" index='4'>Re：从零开始的异世界生活 第二季</li>
        </ul>
        <div class="line">
                <div class="info">945人已参与投票 还有5天结束</div>
                <div class="up"><a href='#'>@前端小川</a> 创建</div>
        </div>
        `
    }else{
        temp += 
        `
        <div class="vote-desc">你对最近的动漫感兴趣的是什么？</div>
        <ul class="content">
                <li class="item after clear"><div class="bg"></div><div class="clear name">BanG Dream! 少女乐团派对！</div><div class="voted-num clear">${data[0]}票</div></li>
                <li class="item after clear"><div class="bg"></div><div class="clear name">高达创形者 再起 第二季</div><div class="voted-num clear">${data[1]}票</div></li>
                <li class="item after clear"><div class="bg"></div><div class="clear name">天气之子</div><div class="voted-num clearm">${data[2]}票</div></li>
                <li class="item after clear"><div class="bg"></div><div class="clear name">没落要塞</div><div class="voted-num clear">${data[3]}票</div></li>
                <li class="item after clear"><div class="bg"></div><div class="clear name">Re：从零开始的异世界生活 第二季</div><div class="voted-num clear">${data[4]}票</div></li>
                </ul>
            <div class="line">
                <div class="info">${data[5]}人已参与投票 还有5天结束</div>
                <div class="up"><a href='#'>@前端小川</a> 创建</div>
            </div>
            <div class="item">分享我的投票理由</div>
        `
    }
    $('.vote').html(temp);
}

function handle (data) {
    $('ul').on('click', function (e) {
        // console.log(1);
        var dom = $(e.target);
        if(dom.hasClass('after')){
            // console.log(1);
            key = 1;
            var isCancle = confirm("是否取消投票？")
                if(isCancle){
                    data[5]--;
                    data[index]--;
                    // console.log(data[index]);
                    data[6] = '';
                    render(data);
                    handle(data);
                }
            // $('li').on('click', function () {
            //     var isCancle = confirm("是否取消投票？")
            //     if(isCancle){
            //         data[5]--;
            //         data[index]--;
            //         // console.log(data[index]);
            //         data[6] = '';
            //         render(data);
            //         handle(data);
            //     }
            // })
        }else if(dom.hasClass('item')){
            index = dom.attr('index');
            // console.log(index);
            data[6] = index;
            data[index]++;
            data[5]++;
            key = 0;
            render(data);
            for(let i = 0; i < 5; i++) {
                $(`li:eq(${i})`).find('.bg')
                .css({
                    width : `${data[i] / data[5] * 100}%`
                })
                if(i == index){
                    $(`li:eq(${i})`).addClass('active');
                }
            }
            handle(data);
        }
    })
}

render(data);
handle(data);
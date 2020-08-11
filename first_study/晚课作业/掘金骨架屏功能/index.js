var $wrapper = $('.wrapper');

setTimeout(function () {
    $wrapper.html(`
    <div class="first">
    <span class="red">荐</span>·<span class="purple">专栏</span> · 字节跳动技术团队 · 6小时前 · Android / 架构
    </div>
    <div class="second"><a href="#">今日头条 Android '秒' 级编译速度优化</a></div>
    <div class="third">
        <li><img src="https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg" class="up"><span class="q">99</span></li>
        <li><img src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" class="down"><span class="f">49</span></li>
    </div>
    <img src="https://user-gold-cdn.xitu.io/2020/7/19/1736746b854df609?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1" alt="" class="right">
    `);
}, 3000)

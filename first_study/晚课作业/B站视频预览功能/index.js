var lineWidth = 196;
var videoWidth = 206;
var videoHeight = 116;

$(function () {
    $.ajax({
        type: 'GET',
        url: './data.json',
        dataType: 'json',
        success: function (beforData) {
            const data = beforData.content;
            // console.log(data);
            var temple = ''; 
            for(let i = 0 ; i < 8; i++) {
                temple += `
                <li class="video">
                <div class="poster">
                    <img src="${data[i].poster}" alt="">
                    <div class="video-info">
                        <div class="play">${data[i].play > 10000? data[i].play / 10000 +'万' : data[i].play}</div>
                        <div class="likes">${data[i].likes}</div>
                    </div>
                    <div class="mask" index='${i}'>
                        <div class="line">
                            <div class="bottom"></div>
                            <div class="top"></div>
                        </div>
                    </div>
                </div>
                <div class="title" title="${data[i].title}">${data[i].title}</div>
                <div class="up">${data[i].up}</div>
            </li>
                `
            }

            function render () {
                $('ul').html(temple);
            }
            render();
            handle();
            function handle () {
                $('.video-list').on('mousemove', function (e) {
                    var dom = $(e.target);
                    var isMask = dom.hasClass('mask');
                    if(isMask){
                        var x = e.offsetX;
                        // console.log(1);
                        setLineWidth(dom, x);
                        setMaskBackgroundImg(dom, x);
                    }
                })
            }

            function setLineWidth (oMask, x) {
                oMask.find('.top')
                .css('width', x * lineWidth / videoWidth + 'px');
            }

            function setMaskBackgroundImg (oMask, x) {
                var index = oMask.attr('index');
                // console.log(index);
                var pvideo = data[index].pvideo;
                var bgLen = pvideo.index.length;
                var xLen = pvideo.img_x_len;
                var picWidth = window.videoWidth / bgLen;
                var position = Math.floor(x / picWidth);
                var bgIndex = Math.floor(position / 100);
                // console.log(pvideo.index);
                // console.log(bgLen);
                // console.log(window.videoWidth);
                // console.log(picWidth);
                // console.log(position);
                // console.log(bgIndex);
                // console.log(pvideo.image[bgIndex]);
                oMask.css({
                    backgroundImage : `url(${pvideo.image[bgIndex]})`,
                    backgroundPositionY : `-${Math.floor(position / xLen) * 116}px`,
                    backgroundPositionX : `-${position % xLen * 206}px`
                })
            }


        }
    })
})
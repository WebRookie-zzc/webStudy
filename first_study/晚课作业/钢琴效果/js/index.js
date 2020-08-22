let piano = {
    aud : {},
    isdown : false,
    init () {
        this.forbidSelect();
        this.downOrNot();
        this.initData();
        this.initUI();
        this.initAudio();
    },
    initData () {
        this.$wrap = $('.wrapper');
        this.wrapWidth = parseInt(this.$wrap.css('width'));
        this.whiteWidth = this.wrapWidth / 52;
        this.blackWidth = this.whiteWidth * 3 / 5;
        this.keys = Object.keys(MIDISound);
    },
    initUI () {
        let whiteNum = 0;
        for(let i = 0; i < this.keys.length; i++){
            var $dom = $(document.createElement('div')).addClass('item');
            if(this.keys[i].length === 2){
                whiteNum ++;
                $dom.addClass('white')
                .css({
                    'width' : `${this.whiteWidth}px`,
                    'left' : `${(whiteNum -1 ) * this.whiteWidth}px`
                })
                .attr('key', this.keys[i]);
            }else{
                $dom.addClass('black')
                .css({
                    'width' : `${this.blackWidth}px`,
                    'left' : `${whiteNum * this.whiteWidth - this.blackWidth / 2}px`
                })
                .attr('key', this.keys[i]);
            }
            $dom.html(`<span>${this.keys[i]}<span>`);
            $dom.appendTo(this.$wrap);
            this.bindEvent ($dom);
        }
    },
    createAudio (key) {
        let aud = new Audio (MIDISound[key]);
        let timer = null;
        let $div = $(`div[key=${key}]`);
        return {
            play () {
                clearInterval(timer);
                aud.currentTime = 0;
                aud.volume = 1;
                aud.play();
                $div.addClass('active');
            },
            stop () {
                $div.removeClass('active');
                timer = setInterval(() => {
                    var v = aud.volume - 0.002;
                    if(v <= 0){
                        clearInterval(timer);
                        aud.pause();
                    }else{
                        aud.volume = v;
                    }
                }, 15);
            }
        }
    },
    initAudio () {
        for(let key in MIDISound){
            this.aud[key] = this.createAudio(key);
        }
    },
    bindEvent ($div) {
        $div.on('mousedown', () => {
            let key = $div.attr('key');
            this.aud[key].play();
        });
        $div.on('mouseup', () => {
            let key = $div.attr('key');
            this.aud[key].stop();
        })
        $div.on('mouseenter', () => {
            if(this.isdown){
                let key = $div.attr('key');
                this.aud[key].play();
            }
        });
        $div.on('mouseleave', () => {
            let key = $div.attr('key');
            this.aud[key].stop();
        })
    },
    forbidSelect () {
        document.documentElement.onselectstart = function () {
            return false;
          };
    },
    downOrNot () {
    $(window).on('mousedown', () => {
        this.isdown = true;
    });
    $(window).on('mouseup', () => {
        this.isdown = false;
    });
    }
}

piano.init();
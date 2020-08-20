let block = {
    color : ['red', 'blue', 'green', 'black'],
    timer : null,
    speed : 5,
    score : 0,
    init(){
        this.initData();
        this.handleStart();
    },
    initData(){
        this.$wrapper = $('.wrapper');
        this.$start = $('.start');
        this.$score = $('.score');
        this.$mask = $('.mask');
    },
    handleStart () {
        this.$start.on('click', function () {
            $(this).css('display', 'none');
            block.move();
        })
    },
    createRow () {
        $domWrp = $(document.createElement('div')).addClass('row');
        let index = Math.floor(Math.random() * 4);
        for(let i = 0; i< 4; i++){
            if(i === index){
                $(document.createElement('div'))
                .appendTo($domWrp)
                .addClass('color')
                .css('background-color', this.color[Math.floor(Math.random() * 4)]);
            }else{
                $(document.createElement('div')).appendTo($domWrp);
            }
        }
        this.$wrapper.prepend($domWrp);
    },
    move () {
        clearInterval(this.timer);
        let len = 0;
        this.timer = setInterval(() => {
            var top = parseInt($('.wrapper').css('top'));
            if(top >= 0) {
                this.createRow();
                len++;
                if(len === 6){
                    if(this.$wrapper.find('.row:eq(5)').find('div').hasClass('color')){
                        this.failGame();
                    }
                    this.$wrapper.find('.row:eq(5)').remove();
                    len--;
                }
                top = -150;
            }
            var newTop = top + this.speed + 'px';
            $('.wrapper').css('top', newTop);
        }, 20);
        this.handleClick();
    },
    handleClick () {
        this.$wrapper.on('click', (ev) => {
            if($(ev.target).hasClass('color')){
                $(ev.target).css('background-color', '#ccc')
                .removeClass('color');
                this.score ++;
                this.addSpeed();
                this.$score.text('得分 ： '+ this.score);
            }else if ($(ev.target).hasClass('start')){}else{
                this.failGame();
            }
        })
    },
    addSpeed () {
        if(!(this.score % 5)){
            this.speed ++;
        }
    },
    failGame () {
        clearInterval(this.timer);
        this.$mask.css('display', 'block')
        .find('span')
        .text(this.score);
        $('button').on('click', () => {
            window.location.reload();
        })
    }
}

block.init();
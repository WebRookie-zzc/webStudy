lottery = {
  data: {
    arrIndex: [0, 1, 2, 4, 7, 6, 5, 3],
    timer: null,
    index: 0,
    key: true
  },
  init() {
    this.initData();
    this.cEvent();
  },
  initData() {
    this.$items = $('.item');
    this.$a = $('.start');
    this.$mask = $('.mask');
  },
  cEvent() {
    this.$a.on('click', () => {
      if (this.data.key) {
        this.data.timer = setInterval(() => {
          this.$mask.css({
            'display' : 'none'
          });
          $(this.$mask[this.data.arrIndex[this.data.index]]).css({
            'display': 'block'
          });
          this.data.index++;
          if(this.data.index == 8){
            this.data.index = 0;
          }
          // console.log(this);
        }, 50)
        setTimeout(() => {
          clearInterval(this.data.timer)
          key = true;
          //阻止拿到手机大奖
          if(this.data.index == 7){
            this.data.index++;
            this.$mask.css({
              'display' : 'none'
            });
            $(this.$mask[1]).css({
              'display': 'block'
            });
            this.data.index = 1;
          }
        }, Math.random() * 500 + 1500);
        }
    })
  }
}

lottery.init();
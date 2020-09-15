let num = {
  data: {
    colorArr: ['#f26395', '#62efab', '#ef7658', '#ffe868', '#80e3f7', '#d781f9'],
    nextNum: 1,
    timer: null,
  },
  init() {
    this.initData();
    this.cEvent();
  },
  initData() {
    this.$wrapper = $('.wrapper');
    this.$center = $('.center');
  },
  cEvent() {
     $(window).on('click', () => {
      if(!this.data.timer){
        this.data.timer = setInterval(() => {
          this.createNum();
        }, 200);
      }else{
        clearInterval(this.data.timer);
        this.data.timer = null;
      }
     })
  },
  createNum() {
    let $div = $(document.createElement('div'))
      .addClass('item')
      .text(this.data.nextNum)
      .appendTo(this.$wrapper);
      $div[0].scrollIntoView();
      this.$center.text(this.data.nextNum);
      if(this.isPrime(this.data.nextNum)){
        $div.css({
          'color': this.data.colorArr[this.getRandom(0, this.data.colorArr.length)],
          'text-shadow' : '0 0 100px'
        });
        $newCenter = $(document.createElement('div'))
          .addClass('center')
          .appendTo($('body'))
          .text(this.data.nextNum)
          .css({
            'transition': 'transform 1s ease-in, opacity 1s ease-in',
            // 'transform': `traselate(${this.getRandom(-300, 300)}px, ${this.getRandom(-300, 300)}px)`,
            'opacity': '1',
            // 'color': this.data.colorArr[this.getRandom(0, this.data.colorArr.length)]
          });
          getComputedStyle($newCenter[0]).left;
          $newCenter.css({
            'transform': `translate(${num.getRandom(-300, 300)}px,${num.getRandom(-300, 300)}px)`,
            'opacity': '0',
            'color': this.data.colorArr[this.getRandom(0, this.data.colorArr.length)]
          })
          .on('transitionend', function () {
            $(this).remove();
          });
      }
    this.data.nextNum++;
  },
  /**
   * 获得一个随机数
   * @param {*} min 
   * @param {*} max 
   */
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  /**
   * 判断是否为质数
   * @param {*} num 
   */
  isPrime(num) {
    if (num == 1) return false;
    for (let i = 2; i <= num ** 0.5; i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
}

num.init();
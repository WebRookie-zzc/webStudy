let cal = {
  init() {
    this.initDate();
    this.render();
  },
  initDate() {
    this.local = window.navigator.language;
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();
    this.week = this.date.toLocaleDateString(this.local, {weekday: 'long'});
  },
  render() {
    let html = `
    <div class="month">${this.month+1}月</div>
    <div class="day">${this.day}</div>
    <div class="week">${this.week}</div>
    <div class="year">${this.year}</div>
    `
    $('.cal').html(html);
  },
  /**
   * 下一页日历的信息
   */
  getNewDate() {
    let daysNum = new Date(this.year, this.month, 0);
    if(this.day == this.daysNum){
      this.day = 1;
      if(this.month == 11){
        this.month = 0;
        this.year++;
      }else{
        month++;
      }
    }else{
      this.day++;
    }
  }
}

cal.init();
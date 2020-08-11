function GetArgs (options) {
    this.current = options.current;
    this.maxPage = options.maxPage;
    this.dom = $('<ul></ul>')
}
/**
 * 创建结构
 */
GetArgs.prototype.initHTML = function () {
    this.dom.html('');
    if(this.current == 1){
        $('<li>首页</li>').appendTo(this.dom).addClass('text').addClass('none');
        $('<li><上一页</li>').appendTo(this.dom).addClass('text').addClass('none');
    }else{
        $('<li>首页</li>').appendTo(this.dom).addClass('text');
        $('<li><上一页</li>').appendTo(this.dom).addClass('text');
    }
    if(this.maxPage <= 10){
        createPage(1, this.maxPage, this.dom);
    }else{
        if(this.current - 5 > 0 && this.current + 4 <= this.maxPage ){
            createPage(this.current-5, this.current + 4, this.dom, this.current);
        }else if(this.current - 5 <= 0){
            createPage(1, 10, this.dom,this.current);
        }else{
            createPage(this.maxPage - 9, this.maxPage, this.dom, this.current);
        }
    }
    if(this.current == this.maxPage){
        $('<li>下一页></li>').appendTo(this.dom).addClass('text').addClass('none');
        $('<li>尾页</li>').appendTo(this.dom).addClass('text').addClass('none');
    }else{
        $('<li>下一页></li>').appendTo(this.dom).addClass('text');
        $('<li>尾页</li>').appendTo(this.dom).addClass('text');
    }
    $(`<span class='last'>${this.current} / ${this.maxPage}</span>`).appendTo(this.dom);
}
/**
 * 初始化事件
 */
GetArgs.prototype.initEvent = function () {
    self = this;
    $('.wrapper').on('click', 'li', function () {
        $('li').removeClass('active').removeClass('none');
        if(!$(this).hasClass('text')){
            self.current = parseInt($(this).text());
            self.initHTML();
        }
        if($(this).text() === '首页'){
            self.current = 1;
            self.initHTML();
        }else if($(this).text() === '尾页'){
            self.current = self.maxPage;
            self.initHTML();
        }else if($(this).text() === '<上一页'){
            if(self.current > 1){
                self.current --;;
                self.initHTML();
            }else{
                self.current = 1;
                self.initHTML();
            }
        }else if($(this).text() === '下一页>'){
            if(self.current < self.maxPage){
                self.current ++;
                self.initHTML();
            }else{
                self.current = self.maxPage;
                self.initHTML();
            }
        }
    })
}
/**
 * 创建整体
 * @param {object} options 对象参数
 */
function createTurnPage (options) {
    var oDom = new GetArgs(options);
    oDom.initHTML();
    oDom.initEvent();
    $('.wrapper').append(oDom.dom);
}
/**
 * 创建页码数字
 * @param {number} startPage 开始的页码数
 * @param {number} endPage 结束的页码数
 * @param {object} dom 添加到的父级元素
 */
function createPage (startPage, endPage, dom, n) {
    for(let i = startPage; i <= endPage; i++){
        if(i == n){
            // console.log(i);
            // console.log(n);
            $('<li>'+ i + '</li>').appendTo(dom).addClass('active');
        }else{
            $('<li>'+ i + '</li>').appendTo(dom);
        }
    } 
}

/**
 * 创建星星的区域
 * @param {object} config 参数为对象
 */
function creatStar(config) {
    var dom = config.dom;
    var maxNumber = config.maxNumber || 5;
    var value = config.value || 0;
    var text = config.text || ["未评分",'很差','较差','一般','推荐','力推']
    var div, label;
    var spans = [];

    function init() {
        div =  _createElement('div', 'starsContainer',dom);
        label = _createElement('label', '', dom);
        _createElement('br', '', dom);
        for(var i = 0; i < maxNumber; i++) {
            var span = _createElement('span', '', div);
            spans.push(span);
        }
    }
    init();
    /**
     * 创建元素，并添加到父元素中
     * @param {string} tagname 要创建的标签名
     * @param {string} classname 要创建的标签的类名
     * @param {object} parent 要添加到的父元素
     */
    function _createElement (tagname, classname, parent) {
        var tag = document.createElement(tagname);
        tag.className = classname;
        parent.appendChild(tag);
        return tag;
    }
    /**
     * 改变value的值，来改变星星的数量
     * @param {number} value 星星的数量
     */
    function setStars (value) {
        if(value < 0) {
            value = 0;
        }else if (value > maxNumber){
            value = maxNumber;
        }
        for(var i = 0; i < maxNumber; i++) {
            if(i < value){
                spans[i].className = 'fill';
            }else{
                spans[i].className = 'hollow';
            }
        }
        label.innerText = text[value];
    }
    setStars(value);
    /**
     * 鼠标滑动的时候，改变星星的数量
     */
    div.onmousemove = function (e) {
        var val = _getTempValue(e);
        setStars(val);
    }
    /**
     * 鼠标移出时，将星星回复原状
     */
    div.onmouseleave = function () {
        setStars(value);
    }
    div.onclick = function (e) {
         value = _getTempValue(e);

    }
    /**
     * 获取临时的value(星星值)
     * @param {*} e 
     */
    function _getTempValue (e) {
        var width = div.clientWidth;
        var left = e.clientX - div.getClientRects()[0].left;
        var val = Math.ceil((left / width)*maxNumber);
        return val;
    }
}

var all = document.getElementsByClassName('all')[0];
creatStar({dom :all});
creatStar({
    dom : all,
    maxNumber : 3,
    value : 0,
    text : ['请您评分','差', '中', '优']
});
creatStar({
    dom : all,
    maxNumber : 6,
    value : 0,
    text : ['请打分', 'F', 'E', 'D', 'C', 'B', 'A']
})
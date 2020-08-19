/**
 * 创建元素
 * @param {*} tagName 
 * @param {*} classArr 
 * @param {*} style 
 */
function createEle (tagName, classArr, style) {
    let dom = document.createElement(tagName);
    classArr.forEach((item) => {
        $(dom).addClass(item);
    });
    $(dom).css(style);
    return $(dom);
}

/**
 * 本地化存储
 * @param {*} key 
 * @param {*} value 
 */
function setLocal(key, value) {
    let val = JSON.stringify(value);
    localStorage.setItem(key, val);
}

/**
 * 获取本地化存储的数据
 * @param {} key 
 */
function getLocal (key) {
    var res = localStorage.getItem(key);
    if(res == null) return [];
    return JSON.parse(res);
}
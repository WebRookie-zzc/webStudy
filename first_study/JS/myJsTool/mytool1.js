
/**
 * 获取滚动条滑动的距离，返回一个对象
 */
 function getScroolOffset() {
     if(window.pageXOffset){
         return {
             X : window.pageXOffset,
             Y : window.pageYOffset,
         }
     }else{
         return {
             X : document.body.scrollLeft,
             Y : document.body.scrollTop,
         }
     }
 }


 /**
  * 获取可视窗口的属性
  */
 function getViewportOffset() {
     if(window.innerWidth){
         return {
             w : window.innerWidth,
             h: window.innerHeight,
         }
     }else{
         if(document.compatMode === "BackCompat"){
             return {
                 w : document.body.clientWidth,
                 h : document.body.clientHeight,
             }
         }else{
             return {
                 w : document.documentElement.clientWidth,
                 h: document.documentElement.clientHeight,
             }
         }
     }
 }

 /**
 * 绑定事件兼容函数
 * @param {object} elem 元素
 * @param {string} type 事件类型
 * @param {function} handler 事件的执行函数
 */
function addEvent (elem, type, handler) {
    if(elem.addEventListener){
        elem.addEventListener(type, handler, false);
    }else if(elem.attachEvent){
        elem.attachEvent(type, function () {
            handler.call(elem);
        });
    }else{
        elem['on' + type] = handler;
    }
}

/**
 * 取消冒泡的兼容函数
 * @param {object} event 事件对象
 */
function stopBubble (event) {
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}

/**
 * 清除默认事件的兼容函数
 * @param {object} event 事件对象
 */
function cancleHandler (event) {
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}

/**
 * 异步加载js
 * @param {string} url js路径
 * @param {function} callback 回调函数
 */
function loadScript (url, callback) {
    var script = document.createElement('script');
    script.src = url;
    if(script.readyState) {
        script.onreadystatechange = function () {//IE
            if(script.readyState == 'complete' || script.readyState == 'loaded') {
                callback();
            }
        }
    }else{
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
}
var danmuContainer = document.getElementById("danmu-container");
var containerWidth = danmuContainer.clientWidth; 
var maxLine = 16; 
var lineHeight = 30; 
var currentLine = 0; 
/**
 * 创建一条弹幕
 * @param content 弹幕内容
 * @param color 弹幕颜色
 */
function createOneDanmu(content, color) {
  var span = document.createElement("span");
  span.innerText = content;
  span.style.color = color;
  danmuContainer.appendChild(span);


  var left = containerWidth;
  span.style.left = left + "px";
  var top = lineHeight * currentLine;
  span.style.top = top + "px";

  // currentLine++; // 当前行变化
  // if (currentLine === maxLine) {
  //   currentLine = 0;
  // }
  currentLine = (currentLine + 1) % maxLine;

  span.speed = getRandom(100, 301); 
  span.left = left;
  span.width = span.clientWidth;
}

function getRandom(min, max) {
  // Math.random()    0~1
  // Math.random() * (max - min)    0~(max - min)
  // Math.random() * (max - min) + min    min~max
  return Math.floor(Math.random() * (max - min) + min);
}

var timer = null; // 移动弹幕的计时器
/**
 * 开始移动弹幕
 */
function startMove() {
  if (timer) {
    // 已经在移动了
    return;
  }
  var duration = 14;
  timer = setInterval(function () {
    for (var i = 0; i < danmuContainer.children.length; i++) {
      var span = danmuContainer.children[i];
      span.left -= (span.speed * duration) / 1000;
      span.style.left = span.left + "px"; // 把新的位置应用到元素上
      if (span.left <= -span.width){
        span.remove();
        i--;
      }
    }
  }, duration);
}

/**
 * 停止移动
 */
function stopMove() {
  clearInterval(timer);
  timer = null;
}

/**
 * 移除所有弹幕
 */
function clearDanmu() {
  danmuContainer.innerHTML = "";
  currentLine = 0;
}

var vdo = document.getElementById("vdo");

vdo.onplay = function () {
  startMove();
};

vdo.onpause = function () {
  stopMove();
};

var lastCreateTime = -1; // 上一次创建弹幕的时间点
vdo.ontimeupdate = function () {
  if (isClose) {
    return;
  }
  var currentTime = parseInt(vdo.currentTime);
  if (Math.abs(currentTime - lastCreateTime) > 1) {
    clearDanmu();
  }
  if (currentTime === lastCreateTime) {
    return;
  }
  for (var i = 0; i < danmu.length; i++) {
    var d = danmu[i];
    if (d.time === currentTime) {
      createOneDanmu(d.content, d.color); // 创建新弹幕
    } else if (d.time > currentTime) {
      break;
    }
  }
  lastCreateTime = currentTime;
};

var toggleBtn = document.getElementById("toggle");
var isClose = false; 
toggleBtn.onclick = function () {
  if (isClose) {
    isClose = false;
    document.getElementsByTagName('button')[0].innerText = "隐藏弹幕";
  } else {
    isClose = true;
    clearDanmu();
    document.getElementsByTagName('button')[0].innerText = "显示弹幕";
  }
};

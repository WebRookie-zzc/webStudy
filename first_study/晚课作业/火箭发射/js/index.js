
var spaceship = document.querySelector(".spaceship"),
    fire = document.querySelector(".fire"),
    btnLaunch = document.querySelector(".btnLaunch"),
    btnLand = document.querySelector(".btnLand"),
    btnStart = document.querySelector(".btnStart"),
    txtLaunch = document.querySelector(".btnLaunch span"),
    txtLand = document.querySelector(".btnLand span"),
    txtStart = document.querySelector(".btnStart span"),
    shadow = document.querySelector(".shadow");

btnLaunch.addEventListener("click", launch);
btnLand.addEventListener("click", land);
btnStart.addEventListener("click", start);

function launch() {
   btnStart.classList.add("disable");
   fire.classList.add("burn");
   spaceship.classList.remove("land");
   spaceship.classList.add("launch");
   spaceship.removeEventListener("animationend", burn);
   shadow.style.opacity = "0";

   /*buttons*/
   btnLaunch.classList.add("active");
   btnStart.disabled = true;
   btnStart.classList.remove("active");
   btnLand.classList.remove("active");
   btnLand.classList.remove("disable");
   btnLand.disabled = false;

   /*text buttons*/
   txtLaunch.innerText = "发射";
   txtStart.innerText = "开始";
   txtLand.innerText = "着陆";
}

function land() {
   spaceship.classList.remove("launch");
   spaceship.classList.add("land");
   spaceship.addEventListener("animationend", burn);
  
   /*buttons*/
   btnLaunch.classList.remove("active");
   btnLand.classList.add("active");
   btnStart.classList.remove("disable");
   btnStart.disabled = false;
   /*text buttons*/
   txtLand.innerText = "着陆";
   txtLaunch.innerText = "发射";
}

function burn() {
   fire.classList.remove("burn");
   spaceship.classList.remove("land");
   shadow.style.opacity = "0.2";
   /*buttons*/
   btnLand.classList.remove("active");
   btnLand.classList.add("disable");
   btnLand.disabled = true;
   /*text buttons*/
   txtLand.innerText = "着陆";
}

function start() {
   if (btnStart.classList.contains("active")) {
      fire.classList.remove("burn");
      btnStart.classList.remove("active");
      txtStart.innerText = "start";
   } else {
      fire.classList.add("burn");
      btnStart.classList.add("active");
      txtStart.innerText = "停止";
      btnLand.classList.remove("active");
   }
}

function stop() {
   fire.classList.remove("burn");
}
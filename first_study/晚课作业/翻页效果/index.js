var imgs = document.querySelectorAll('#wrap img'),
	shadow = document.querySelector('#shadow'),
	modal = document.querySelector('#modal'),
	prev = document.querySelector('.prev'),
	next = document.querySelector('.next'),
	frontImg = document.querySelector('.front');
	backImg = document.querySelector('.back');

var cn = 0;	//当前图片的索引
var canClick=true;	//用户是否可以进行下一次的点击，true为可以点击；false为不能够点击

//图片预加载(图片对象数组，回调函数)
function loadImg(imgs, cb) {
	var loadImgs = [];	//已经加载完的图片集合
	var loadImgNum = 0;	//已经加载完的图片数量

	for (var i = 0; i < imgs.length; i++) {
		loadImgs[i] = new Image();
		loadImgs[i].onload = function () {
			loadImgNum++;
			if (loadImgNum == imgs.length) {
				//这个条件成立说明所有的图片都已经加载完成了
				cb(loadImgs);	//当所有图片都已经加载完成了，就调用一下函数，同时需要把加载完成的图片都传进去
			}
		};

		//把用户传进来的图片的地址赋值给loadImgs
		loadImgs[i].src = imgs[i].getAttribute('src');
	}
}

//把页面里所有的图片都预加载一下
loadImg(imgs, function (loadedArr) {
	// console.log(loadedArr);
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].parentNode.index = i;
		imgs[i].parentNode.onclick = function () {
			shadow.style.display = modal.style.display = 'block';

			setTimeout(function () {
				shadow.style.opacity = modal.style.opacity = 1;
				modal.style.transform = 'scale(1)';
			}, 0);

			cn = this.index;

			frontImg.src = loadedArr[cn].getAttribute('src');
		}
	}

	nextClick(loadedArr);
	prevClick(loadedArr);
});

//鼠标点击遮罩层的时候，隐藏掉弹出的那些东西
shadow.onclick = function () {
	if(!canClick){
		//点遮罩层的时候，一定得让动画走完才能隐藏
		return;
	}

	shadow.style.display = modal.style.display = 'none';
	shadow.style.opacity = modal.style.opacity = 0;
	modal.style.transform = 'scale(0)';
};

//下一张功能
function nextClick(images) {
	var nextNum = 0;	//下一张图片的索引（背后那张图）
	next.onclick = function () {
		if(!canClick){
			//canClick为false证明动画还没完，不能让用户再次的点击
			return;
		}
		canClick = false;	//一上来为true，点击后立马变成false。再运动完成的时候再让它变成true


		nextNum = cn + 1;
		if (nextNum == imgs.length) {
			nextNum = 0;
		}

		//更新背后图片的地址
		backImg.src = images[nextNum].getAttribute('src');

		//前面图片往左走，伴随旋转
		frontImg.style.transformOrigin = 'left';
		frontImg.style.transform = 'translateX(600px) rotateY(-10deg)';

		var fen = 0;	//前面图片过渡结束的次数
		//前面图片过渡结束了（后面图张开，前面图收回去）
		frontImg.addEventListener('transitionend', function () {
			//console.log(1);
			fen++;

			//后面的图张开
			backImg.style.transform = 'rotateY(-10deg)';
			backImg.style.transformOrigin = 'left';

			//同时前面的图收回去
			frontImg.style.transform = 'translateX(0) rotateY(0)';

			//这个条件成立，说明前面的图已经收回去了
			if (fen == 2) {
				//后面的图合住
				backImg.style.transform = 'rotateY(0)';

				//把前后图的顺序调换一下
				backImg.style.zIndex = 2;	//后面的图到前面去
				frontImg.style.zIndex = 1;	//前面的图到后面去
			}
		});

		//后面的图过渡结束了（要把图片层级还原，要不第二次无法点击）
		var ben = 0;	//后面图片过渡结束的次数
		backImg.addEventListener('transitionend', function () {
			ben++;

			//这个条件成立说明后面的图片已经合上了
			if (ben == 2) {
				//还原层级关系
				backImg.style.zIndex = 1;
				frontImg.style.zIndex = 2;

				//层级还原后，前后图肯定要变，但是这里只改变了前面的图，因为后面的图看不见，同时它改值是在点击的时候改，所以这里只用改前图就行了
				frontImg.src = images[nextNum].getAttribute('src');
				
				//还有一件事，更新当前的值
				cn++;
				if (cn == imgs.length) {
					cn = 0;
				}

				canClick=true;	//所有的运动都完成了，就可以允许用户再次点击了
			}
		})
	}
}

//上一张功能
function prevClick(images) {
	var prevNum = 0;
	prev.onclick = function () {
		if(!canClick){
			return;
		}
		canClick = false;

		prevNum = cn - 1;	
		if (prevNum == -1) {
			prevNum = imgs.length-1;
		}

		backImg.src = images[prevNum].getAttribute('src');

		frontImg.style.transformOrigin = 'right';
		frontImg.style.transform = 'translateX(-600px) rotateY(10deg)';

		var fen = 0;
		frontImg.addEventListener('transitionend', function () {
			fen++;

			backImg.style.transform = 'rotateY(10deg)';
			backImg.style.transformOrigin = 'right';

			frontImg.style.transform = 'translateX(0) rotateY(0)';

			if (fen == 2) {
				backImg.style.transform = 'rotateY(0)';

				backImg.style.zIndex = 2;
				frontImg.style.zIndex = 1;
			}
		});

		var ben = 0;	//后面图片过渡结束的次数
		backImg.addEventListener('transitionend', function () {
			ben++;

			if (ben == 2) {
				backImg.style.zIndex = 1;
				frontImg.style.zIndex = 2;

				frontImg.src = images[prevNum].getAttribute('src');
				
				cn--;
				if (cn == -1) {
					cn = imgs.length - 1;
				}

				canClick=true;
			}
		})
	}
}
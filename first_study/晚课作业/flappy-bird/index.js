let bird = {
    speed : 2,
    backgroundPositionX : 0,
    count : 0,
    top : 235,
    startColor : 'blue',
    prevColor :"",
    isStart : false,
    drugSpeed : 0,
    timer : null,
    pipeNum : 7,
    pipeArr : [],
    pipeLastIndex : 6,
    score : 0,
    scoreArr : getLocal('score'),
    init () {
        this.initData();
        this.animate();
        this.handelStart();

        if(sessionStorage.getItem('play')){
            this.start();
        }
    },
    initData () {
        this.$el = $('#game');
        this.$bird = this.$el.find('.bird');
        this.$start = this.$el.find('.start');
        this.$score = this.$el.find('.score');
        this.$mask = this.$el.find('.mask');
        this.$end = this.$el.find('.end');
        this.$rankList = this.$el.find('.rank-list');
        this.$restart = this.$el.find('.restart');
        this.$finalScore = this.$el.find('.final-score');
    },
    animate () {
        this.timer = setInterval(() => {
            this.count++;
            this.skyMove();
            if(this.count % 10 === 0){
                if(!this.isStart){
                    this.birdJump();
                    this.startText()
                }
                this.birdFly(this.count);
            }
            if(this.isStart){
                this.birdDurg();
                this.pipeMove();
            }
        },30);
    },
    skyMove () {
        this.backgroundPositionX += this.speed;
        this.$el.css('backgroundPositionX', -this.backgroundPositionX + 'px');
    },
    birdJump () {
        this.top = this.top === 220 ? 260 : 220;
        this.$bird.css('top', this.top + 'px');
    },
    birdFly (count) {
        this.$bird.css('backgroundPositionX', (- count % 3 * 30) + 'px');
    },
    startText () {
        this.prevColor = this.startColor;
        this.startColor = this.startColor === 'blue' ? 'white' : 'blue';
        this.$start
        .removeClass('start-' + this.prevColor)
        .addClass('start-' + this.startColor);
    },
    birdDurg () {
        this.top += this.drugSpeed++;
        this.$bird.css('top', this.top + 'px');
        this.clickJump();
        this.judgeOver();
    },
    createAPipe (x) {
        let topHeight = 50 + Math.floor(Math.random() * 175);
        var $top = createEle('div', ['pipe', 'pipe-top'], {
            height : topHeight + 'px',
            left : x * 200+ 'px'
        })
        .appendTo('#game');
        var $bottom = createEle('div', ['pipe', 'pipe-bottom'], {
            height : 450 - topHeight + 'px',
            left : x * 200 + 'px'
        })
        .appendTo('#game');
        this.pipeArr.push({
            up : $top,
            down : $bottom,
            y : [topHeight, topHeight + 130]
        });
    },
    pipeMove () {
        this.pipeArr.forEach($item => {
            if(parseInt($item.up.css('left')) < -52){
                $item.up.css('left', '1400px');
                $item.down.css('left', '1400px');
                this.addScore();
            }else{
                var oldLeft = parseInt($item.up.css('left'));
            $item.up.css('left', oldLeft - this.speed + 'px');
            $item.down.css('left',  oldLeft - this.speed + 'px');
            }
        })
    },
    judgeOver () {
        if(parseInt(this.$bird.css('top')) <= 0 || parseInt(this.$bird.css('top')) >= 570){
            this.fail();
        }
        this.judgePipe();
    },
    judgePipe () {
        let index = this.score % 7;
        let pipeX = parseInt(this.pipeArr[index].up.css('left'));
        let pipeY = this.top;
        if(pipeX >= 13 && pipeX <= 95 && (pipeY <= this.pipeArr[index].y[0] || pipeY >= this.pipeArr[index].y[1])){
            this.fail();
        }
    },
    addScore() {
        this.score ++;
        this.$score.text(this.score);
    },
    getDate () {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    setScore () {
        this.$finalScore.text(this.score);
        this.scoreArr.push({
            score : this.score,
            date : this.getDate(),
        });
        this.scoreArr.sort(function (a, b) {
            return b.score - a.score;
        });
        let scoreLength = this.scoreArr.length;
        this.scoreArr.length = scoreLength > 8 ? 8 : this.scoreArr.length;
        setLocal('score', this.scoreArr);
    },
    handelStart () {
        this.$start.on('click', () => {
           this.start();
        });
    },
    handleReStart() {
        this.$restart.on('click', () => {
            sessionStorage.setItem('play', true);
            window.location.reload();
        })
    },
    start () {
            $('.pipe').remove();
            this.$start.css('display', 'none');
            this.isStart = true;
            this.$bird.css({
                transition : "none",
                left : '80px',
                top : '235px'
            });
            this.top = 235;
            this.$mask.css('display', 'none');
            this.$end.css('display', 'none');
            this.speed = 5;
            for(let i = 0; i < this.pipeNum; i++){
                this.createAPipe(i+1);
            }
    },
    renderRankList () {
        let template = ``;
        for(let i = 0; i < this.scoreArr.length;i++) {
            let degreeClass;
            let scoreObj = getLocal('score')[i];
            switch (i){
                case 0 :
                    degreeClass = 'first';
                    break;
                case 1 : 
                    degreeClass = 'second';
                    break;
                case 2 : 
                degreeClass = 'third';
            }
            template += `
                <li class="rank-item">
                    <span class="rank-degree ${degreeClass}">${i + 1}</span>
                    <span class="rank-score">${scoreObj.score}</span>
                    <span class="rank-time">${scoreObj.date}</span>
                </li>
      `;
        }
        this.$rankList.html(template);
    },
    clickJump () {
        $('#game').on('click', () => {
            this.drugSpeed = -10;
        })
    },
    fail () {
        clearInterval(this.timer);
        this.$mask.css('display', 'block');
        this.$end.css('display', 'block');
        this.setScore();
        this.renderRankList();
        this.handleReStart();
    }
}

bird.init();
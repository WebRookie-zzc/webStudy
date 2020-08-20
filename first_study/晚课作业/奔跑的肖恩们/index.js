let sheep = {
    data: {
        $stage: $('.wrapper'),
        frequency: 70,
        backNum: 0,
        speed: 10,
        maxSheepNum: 8
    },
    init() {
        this.createSheep(this.data);
    },
    Sheep: class {
        constructor(data) {
            this.sheep = $(document.createElement('div'))
                .addClass('sheep').appendTo(data.$stage);
            this.frequency = Math.floor(Math.random() * (data.frequency)) + 30;
            this.bkTop = 0;
            this.speed = data.speed;
            this.backNum = data.backNum;
            this.currentSpeed = this.speed;
        }
    },
    createSheep(data) {
        let timer = setInterval(() => {
            let sheepNum = this.data.$stage[0].children.length;
            if (sheepNum < this.data.maxSheepNum) {
                let sheep = new this.Sheep(data);
                this.sheepRun(sheep);
            }
        }, 1000);
    },
    sheepRun(sheepWrap) {
        sheepWrap.sheepAnimation = setInterval(() => {
            sheepWrap.backNum += 164;
            if (sheepWrap.backNum >= 1312) {
                sheepWrap.backNum = 0;
            }
            let cot = sheepWrap.sheep[0].offsetLeft - sheepWrap.speed;
            if (cot < -165) {
                clearInterval(sheepWrap.Animation);
                sheepWrap.sheep.remove();
            }
            sheepWrap.sheep.css({
                'left': `${cot}px`,
                'background-position': `${-sheepWrap.backNum}px ${sheepWrap.bkTop}px`
            })
        }, sheepWrap.frequency);
        this.bindEvent(sheepWrap);
    },
    bindEvent(sheepWrap) {
        sheepWrap.sheep.on('mousedown', (ev) => {
            sheepWrap.speed = 0;
            sheepWrap.bkTop = -128;
            sheepWrap.x= ev.pageX;
            sheepWrap.y = ev.pageY;
            sheepWrap.left = parseInt(sheepWrap.sheep.css('left'));
            // console.log(sheepWrap.left);
            sheepWrap.top = parseInt(sheepWrap.sheep.css('top'));
            $(document).on('mousemove', (ev) => {
                let lesserX = ev.pageX - sheepWrap.x;
                let lesserY = ev.pageY - sheepWrap.y;
                // console.log(sheepWrap.sheep[0].offsetLeft, lesserX);
                sheepWrap.sheep.css({
                    'left' : `${sheepWrap.left + lesserX}px`,
                    'top' : `${sheepWrap.top + lesserY }px`
                })
            });
            $(document).on('mouseup', () => {
                sheepWrap.speed = sheepWrap.currentSpeed;
                sheepWrap.bkTop = 0;
                $(document).unbind('mousemove');
            });
        })
    }
}

sheep.init();
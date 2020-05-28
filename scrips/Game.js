//创建游戏类：游戏入口

const gameOverDom = document.querySelector('.game-over');

const speed = -100; //大地与水管的移动速度是相同的

class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(speed);
        this.bird = new Bird();
        this.producer = new PipePareProducer(speed); //创建水管对
        this.timer = null;
        this.tick = 16;
        this.gameOver = false; //标记游戏是否结束
    }

    start() {
        if (this.timer) {
            return;
        }

        if (this.gameOver) {
            //刷新页面，重新开始游戏
            window.location.reload();
        }

        this.producer.startProduce(); //开始生成水管对
        this.bird.startSwing(); //煽动翅膀

        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.producer.pipePares.forEach(value => {
                value.move(duration);
            });
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
            }
        }, this.tick);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.producer.stopProduce();
        this.bird.stopSwing();
    }

    //判断两个矩形是否发生碰撞
    isHit(rec1, rec2) {
        //矩形碰撞检验规则：
        //横向：两个矩形的中心点的横向距离是否小于两个矩形宽度之和的一半
        //纵向：两个矩形的中心点的纵向距离是否小于两个矩形高度之和的一半
        const centerX1 = rec1.left + rec1.width / 2;
        const centerY1 = rec1.top + rec1.height / 2;

        const centerX2 = rec2.left + rec2.width / 2;
        const centerY2 = rec2.top + rec2.height / 2;

        const disX = Math.abs(centerX1 - centerX2); //中心点横向距离
        const disY = Math.abs(centerY1 - centerY2); //中心点纵向距离

        if (disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2) {
            return true;
        }
        return false;
    }

    //判断游戏是否应该结束
    isGameOver() {
        if (this.bird.top === this.bird.maxY) {
            //像素鸟碰到大地
            gameOverDom.style.display = 'block';
            return true;
        }
        if (this.bird.top === 0) {
            gameOverDom.style.display = 'block';
            return true;
        }
        for (let i = 0; i < this.producer.pipePares.length; i++) {
            const value = this.producer.pipePares[i];
            if (this.isHit(this.bird, value.upPipe) || this.isHit(this.bird, value.downPipe)) {
                gameOverDom.style.display = 'block';
                return true;
            }
        }
        return false;
    }

    //绑定事件
    regEvent() {
        window.onkeydown = e => {
            if (e.key === 'Enter') {
                if (this.timer) {
                    this.stop();
                } else {
                    this.start();
                }
            } else if (e.key === ' ') {
                this.bird.jump();
            }
        }
    }
}

const game = new Game();

game.regEvent();
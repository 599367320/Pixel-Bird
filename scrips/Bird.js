//创建子类：像素鸟

const birdDom = document.querySelector('.bird');
const birdStyles = getComputedStyle(birdDom); //获取dom元素的最终样式
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);

const gameDom = document.querySelector('.game');
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);

        this.g = 1000; //向下的加速度 单位：像素/秒^2
        this.maxY = gameHeight - landHeight - this.height; //y坐标的最大值
        this.swingStatus = 1; //翅膀的状态
        this.render();
    }

    render() {
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`;
    }

    move(duration) {
        super.move(duration); //执行父类的move方法
        this.ySpeed += this.g * duration;
        this.timer = null; //翅膀煽动的计时器
    }

    onMove() {
        //控制y坐标范围
        if (this.top <= 0) {
            this.top = 0
        } else if (this.top >= this.maxY) {
            this.top = this.maxY;
        }
    }

    //跳跃：设置一个向上的速度
    jump() {
        this.ySpeed = -400;
    }

    //开始煽动翅膀
    startSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus = (this.swingStatus + 1) % 3 + 1;

            this.render();
        }, 300);
    }

    //停止煽动翅膀
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

// const bird = new Bird();

// setInterval(() => {
//     bird.move(16 / 1000);
// }, 16);
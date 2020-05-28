//创建子类：单个水管

const gameWidth = gameDom.clientWidth;

class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(52, height, gameWidth, top, speed, 0, dom)
    }

    onMove() {
        //移除超出游戏区域的水管对
        if (this.left <= -this.width) {
            this.dom.remove();
        }
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//创建水管对类
class PipePare {
    constructor(speed) {
        this.spaceHeight = 150; //上下水管间的空隙距离
        this.minHeight = 80; //水管最小高度
        this.maxHeight = landTop - this.spaceHeight - this.minHeight; //水管最大高度

        const upHeight = getRandom(this.minHeight, this.maxHeight);

        const upDom = document.createElement('div');
        upDom.className = 'pipe up';

        this.upPipe = new Pipe(upHeight, 0, speed, upDom); //创建上水管

        const downHeight = landTop - upHeight - this.spaceHeight;
        const downTop = landTop - downHeight;

        const downDom = document.createElement('div');
        downDom.className = 'pipe down';

        this.downPipe = new Pipe(downHeight, downTop, speed, downDom);

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }

    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }

    //判断水管对是否超出游戏区域
    useLess() {
        return this.upPipe.left <= -this.upPipe.width;
    }
}

//不断创建水管对
class PipePareProducer {
    constructor(speed) {
        this.speed = speed;
        this.pipePares = [];
        this.timer = null;
        this.tick = 1500;
    }

    //开始创建水管对
    startProduce() {
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            this.pipePares.push(new PipePare(this.speed));
            for (let i = 0; i < this.pipePares.length; i++) {
                if (this.pipePares[i].useLess()) {
                    //删除数组中存储的超出游戏区域的水管对
                    this.pipePares.splice(i, 1);
                    i--;
                }
            }
        }, this.tick);
    }

    //停止创建水管对
    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}


// const producer = new PipePareProducer(speed);
// producer.startProduce(); //开始创建水管对

// setInterval(() => {
//     producer.pipePares.forEach(value => {
//         value.move(16 / 1000);
//     });
// }, 16);
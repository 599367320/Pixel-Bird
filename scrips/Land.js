//创建子类：大地

const landDom = document.querySelector('.land');
const landStyles = getComputedStyle(landDom); //获取dom元素的最终样式
const landWidth = parseFloat(landStyles.width);
const landHeight = parseFloat(landStyles.height);
const landTop = parseFloat(landStyles.top);

class Land extends Rectangle {
    constructor(speed) {
        //属性：宽度、高度、横坐标、纵坐标、横向速度、纵向速度、对应的dom对象
        super(landWidth, landHeight, 0, landTop, speed, 0, landDom);
    }

    onMove() {
        if (this.left <= -landWidth / 2) {
            this.left = 0;
        }
    }
}

// const land = new Land();

// setInterval(() => {
//     land.move(16 / 1000);
// }, 16);
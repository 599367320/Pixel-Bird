//创建子类：天空

const skyDom = document.querySelector('.sky');
const skyStyles = getComputedStyle(skyDom); //获取dom元素的最终样式
const skyWidth = parseFloat(skyStyles.width);
const skyHeight = parseFloat(skyStyles.height);

class Sky extends Rectangle {
    constructor() {
        //属性：宽度、高度、横坐标、纵坐标、横向速度、纵向速度、对应的dom对象
        super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom);
    }

    onMove() {
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
    }
}

// const sky = new Sky();

// setInterval(() => {
//     sky.move(16 / 1000);
// }, 16);
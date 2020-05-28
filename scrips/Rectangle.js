//创建父类：可移动的矩形
//属性：宽度、高度、横坐标、纵坐标、横向速度、纵向速度、对应的dom对象

class Rectangle {
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;

        this.render(); //重新渲染
    }

    //页面渲染
    render() {
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.top = this.top + 'px';
        this.dom.style.left = this.left + 'px';
    }

    //移动：根据矩形的速度和时间进行移动 duration：时间/秒
    move(duration) {
        const xDis = this.xSpeed * duration;
        const yDis = this.ySpeed * duration;

        this.top = this.top + yDis;
        this.left = this.left + xDis;

        //判断是否需要进行初始化操作
        if (this.onMove) {
            this.onMove();
        }

        this.render(); //重新渲染
    }
}
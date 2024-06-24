class Queue {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.queue = [];
    }

    getAllValues() {
        return this.queue.map(element => ` [${element}]`);
    }

    enQueue(element) {
        this.queue.push(element);
        this.drawQueueNode(50, 100); // Update the queue draw whenever a element is added
    }

    deQueue() {
        if (this.isEmpty()) {
            alert('Queue is empty.');
            return null;
        }

        const firstElement = this.queue.shift();
        this.drawQueueNode(50, 100); // Update the queue draw whenever a element is removed
        return firstElement;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    print() {
        if (!this.isEmpty()) {
            this.queue.forEach(function(element) {
                console.log(element);
            });
        } else {
            console.log('Fila vazia!');
        }
    }

    drawQueue(x, y, label) {
        const rectWidth = 60;
        const rectHeight = 30;

        this.ctx.beginPath();
        this.ctx.rect(x, y - rectHeight / 2, rectWidth, rectHeight);
        this.ctx.fillStyle = '#754bd6';
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 14px sans-serif';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(label, x + rectWidth / 2, y);
    }

    drawQueueNode(x, y) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Redraw queue
        let currentX = x;
        this.queue.forEach((label) => {
            this.drawQueue(currentX, y, label);
            currentX += 2 * 30;
        });
    }
}

export default Queue;
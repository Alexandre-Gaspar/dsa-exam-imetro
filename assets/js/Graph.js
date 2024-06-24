class Graph {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.nodeList = [];
        this.links = [];
    }

    getAllValues() {
        return this.nodeList.map(node => ` [${node.label}]`);
    }

    isEmpty() {
        return this.nodeList.length === 0;
    }

    addNode(label) {
        if (this.nodeList.some(node => node.label === label)) {
            alert(`Node with label ${label} already exists.`);
            return;
        }
        const newNode = { label, x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height };
        this.nodeList.push(newNode);
        this.drawGraph();
    }

    removeNode(label) {
        const nodeIndex = this.nodeList.findIndex(node => node.label === label);
        if (nodeIndex === -1) {
            alert(`Node with label ${label} does not exist.`);
            return;
        }
        this.nodeList.splice(nodeIndex, 1);
        this.links = this.links.filter(link => link.from !== label && link.to !== label);
        this.drawGraph();
    }

    addlink(from, to) {
        if (!this.nodeList.some(node => node.label === from) || !this.nodeList.some(node => node.label === to)) {
            alert(`Both node must exist to create an link.`);
            return;
        }
        this.links.push({ from, to });
        this.drawGraph();
    }

    drawGraph() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.links.forEach(link => {
            const fromNode = this.nodeList.find(node => node.label === link.from);
            const toNode = this.nodeList.find(node => node.label === link.to);
            this.drawLink(fromNode, toNode);
        });
        this.nodeList.forEach(node => {
            this.drawNode(node);
        });
    }

    drawNode(node) {
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, 20, 0, Math.PI * 2, true);
        this.ctx.fillStyle = '#007bff';
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.font = 'bold 14px sans-serif';
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(node.label, node.x, node.y);
    }

    drawLink(fromNode, toNode) {
        this.ctx.beginPath();
        this.ctx.moveTo(fromNode.x, fromNode.y);
        this.ctx.lineTo(toNode.x, toNode.y);
        this.ctx.stroke();
    }
}

export default Graph;

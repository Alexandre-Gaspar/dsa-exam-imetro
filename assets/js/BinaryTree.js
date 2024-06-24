const NODE_RADIUS = 20; // Radius of each node circle in the tree visualization
const LEVEL_HEIGHT = 100; // Vertical distance between levels in the tree visualization
const MIN_HORIZONTAL_SPACING = 20; // Minimum horizontal spacing between this.nodeList at the same level

class BinaryTree {
    constructor() {
        this.root = null;
        this.links = []; // Array to store the connection between this.nodeList
        this.nodeList = [] // Array to store the this.nodeList
    }

    getAllValues() {
        return this.nodeList.map(node => ` [${node.label}]`);
    }

    isEmpty() {
        return this.nodeList.length === 0;
    }

    drawTree(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        this.links.forEach(link => {
            const fromNode = this.nodeList[link.from];
            const toNode = this.nodeList[link.to];
            this.drawLink(ctx, fromNode.x, fromNode.y, toNode.x, toNode.y);
        });
    
        this.nodeList.forEach(node => {
            this.drawNode(ctx, node.x, node.y, node.label);
        });
    }

    drawNode(ctx, x, y, label) {
        ctx.beginPath();
        ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2, true);
        ctx.fillStyle = '#ceae46';
        ctx.fill();
        ctx.stroke();
        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y);
    }

    drawLink(ctx, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    
        const arrowLength = 10;
        const angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - arrowLength * Math.cos(angle - Math.PI / 6), y2 - arrowLength * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(x2 - arrowLength * Math.cos(angle + Math.PI / 6), y2 - arrowLength * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fillStyle = 'yellow';
        ctx.fill();
    }

    getNodeAtPosition(x, y) {
        return this.nodeList.find(node => {
            const dx = node.x - x;
            const dy = node.y - y;
            return dx * dx + dy * dy <= NODE_RADIUS * NODE_RADIUS;
        });
    }

    getNodeIndex(x, y) {
        return this.nodeList.findIndex(node => {
            const dx = node.x - x;
            const dy = node.y - y;
            return dx * dx + dy * dy <= NODE_RADIUS * NODE_RADIUS;
        });
    }

    updateNodePositions(canvas) {
        const setNodePosition = (node, x, y, depth) => {
            if (node === null) return;
    
            node.x = x;
            node.y = y;
    
            const leftChild = this.nodeList[node.left];
            const rightChild = this.nodeList[node.right];
    
            if (leftChild) {
                const leftWidth = getSubtreeWidth(leftChild);
                setNodePosition(leftChild, x - leftWidth / 2, y + LEVEL_HEIGHT, depth + 1);
            }
    
            if (rightChild) {
                const rightWidth = getSubtreeWidth(rightChild);
                setNodePosition(rightChild, x + rightWidth / 2, y + LEVEL_HEIGHT, depth + 1);
            }
        };
    
        const getSubtreeWidth = (node) => {
            if (node === null) return 0;
    
            const leftChild = this.nodeList[node.left];
            const rightChild = this.nodeList[node.right];
    
            const leftWidth = leftChild ? getSubtreeWidth(leftChild) : MIN_HORIZONTAL_SPACING;
            const rightWidth = rightChild ? getSubtreeWidth(rightChild) : MIN_HORIZONTAL_SPACING;
    
            return leftWidth + rightWidth;
        };
    
        const initialX = canvas.width / 2;
        const initialY = 50; // Initial position from top of canvas
    
        setNodePosition(this.nodeList[0], initialX, initialY, 0);
    }
    
    
    addNode(canvas, label) { // Function to insert a node to the listNode

        // Check if label is a number
        if (isNaN(label)) {
            alert('Label must be a number.');
            return;
        }

        // Convert label to number type
        label = parseInt(label);

        // Check if label already exists in the tree
        if (this.nodeList.some(node => node.label === label)) {
            alert(`Node with label ${label} already exists in the tree.`);
            return;
        }

        const newNode = { x: 0, y: 0, label: label, left: null, right: null };
        if (this.nodeList.length === 0) {
            this.nodeList.push(newNode);
        } else {
            this.insertNode(this.nodeList[0], newNode);
        }
        this.updateNodePositions(canvas);
    }

    insertNode(parentNode, newNode) {
        if (parseInt(newNode.label) < parseInt(parentNode.label)) {
            if (parentNode.left === null) {
                this.nodeList.push(newNode);
                parentNode.left = this.nodeList.length - 1;
                this.links.push({ 
                    from: this.nodeList.indexOf(parentNode), 
                    to: parentNode.left 
                });
            } else {
                this.insertNode(this.nodeList[parentNode.left], newNode);
            }
        } else {
            if (parentNode.right === null) {
                this.nodeList.push(newNode);
                parentNode.right = this.nodeList.length - 1;
                this.links.push({ from: this.nodeList.indexOf(parentNode), to: parentNode.right });
            } else {
                this.insertNode(this.nodeList[parentNode.right], newNode);
            }
        }
    }

    removeNode(canvas, label) {
        const removeNodeRecursively = (parentNode, node, label) => {
            if (node === null) return node;
    
            if (label < node.label) {
                node.left = removeNodeRecursively(node, this.nodeList[node.left], label);
            } else if (label > node.label) {
                node.right = removeNodeRecursively(node, this.nodeList[node.right], label);
            } else {
                // Node found, handle deletion logic
                if (node.left === null) {
                    return node.right;
                } else if (node.right === null) {
                    return node.left;
                }
    
                // Node with two children: Get the inorder successor (smallest in the right subtree)
                const minValueNode = this.findMinNode(this.nodeList[node.right]);
                node.label = minValueNode.label;
                node.right = removeNodeRecursively(node, this.nodeList[node.right], minValueNode.label);
            }
            return node;
        };
    
        this.root = removeNodeRecursively(null, this.root, label);
        this.nodeList = this.nodeList.filter(node => node !== null);
        this.updateNodePositions(canvas);
    }
    
    findMinNode(node) {
        while (node.left !== null) {
            node = this.nodeList[node.left];
        }
        return node;
    }
    
}

export default BinaryTree;
import BinaryTree from "./BinaryTree.js";

const $canvasTree = document.getElementById('tree-canvas');
const ctx = $canvasTree.getContext('2d');
const $nodeValueInput = document.querySelector('#node-value');
const $contentValues = document.querySelector('.values>div.content');
const $addButton = document.querySelector('.btn-add');
const $deleteButton = document.querySelector('.btn-delete');

const tree = new BinaryTree();

function updateTreeDisplay() {
    tree.drawTree(ctx, $canvasTree);
    $contentValues.innerHTML = tree.generateNodeList();
};

$addButton.addEventListener('click', () => {
    const node = $nodeValueInput.value.trim();
    if (node) {
        tree.addNode($canvasTree, node);
        updateTreeDisplay();
        $nodeValueInput.value = '';
    } else 
        alert('Please, enter a valid node value.');
    // console.log(tree.nodeList.length);
});

$deleteButton.addEventListener('click', () => {
    const node = $nodeValueInput.value.trim();
    if (node) {
        tree.removeNode($canvasTree, node);
        updateTreeDisplay();
        $nodeValueInput.value = '';
    } else 
        alert('Please, enter a valid node value.');
    // console.log(tree.nodeList.length);
});


tree.drawTree(ctx, $canvasTree); // Draw binary tree whenever a node is added
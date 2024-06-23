import BinaryTree from "./BinaryTree.js";
import Queue from "./Queue.js";
import Graph from "./Graph.js"; // Assumindo que você também tenha uma classe Graph

const $nodeValueInput = document.querySelector('#node-value');
const $addButton = document.querySelector('.btn-add');
const $deleteButton = document.querySelector('.btn-delete');

const canvases = {
    'queue': document.getElementById('canvasQueue'),
    'tree': document.getElementById('canvasTree'),
    'graph': document.getElementById('canvasGraph')
};

const contexts = {
    'queue': canvases['queue'].getContext('2d'),
    'tree': canvases['tree'].getContext('2d'),
    'graph': canvases['graph'].getContext('2d')
};

const structures = {
    'queue': new Queue(contexts['queue'], canvases['queue']),
    'tree': new BinaryTree(),
    'graph': new Graph() // Assumindo que você também tenha uma classe Graph
};

let currentStructure = 'queue';

document.getElementById('menu__item-queue').addEventListener('click', () => switchCanvas('queue'));
document.getElementById('menu__item-tree').addEventListener('click', () => switchCanvas('tree'));
document.getElementById('menu__item-graph').addEventListener('click', () => switchCanvas('graph'));

$addButton.addEventListener('click', () => modifyCurrentStructure('add'));
$deleteButton.addEventListener('click', () => modifyCurrentStructure('remove'));

function switchCanvas(structure) {
    currentStructure = structure;
    for (let key in canvases) {
        canvases[key].classList.toggle('hidden', key !== structure);
    }
    drawCurrentStructure();
}


function modifyCurrentStructure(action) {
    const value = $nodeValueInput.value;
    if (!value) return;

    const structure = structures[currentStructure];
    if (action === 'add') {
        if (currentStructure === 'queue') {
            structure.enQueue(value);
        } else if (currentStructure === 'tree') {
            structure.addNode(canvases['tree'], value);
        } else if (currentStructure === 'graph') {
            structure.addNode(value); // Assumindo que você tenha um método addNode na classe Graph
        }
    } else if (action === 'remove') {
        if (currentStructure === 'queue') {
            structure.deQueue();
        } else if (currentStructure === 'tree') {
            structure.removeNode(canvases['tree'], value);
        } else if (currentStructure === 'graph') {
            structure.removeNode(value); // Assumindo que você tenha um método removeNode na classe Graph
        }
    }
    drawCurrentStructure();
}

function drawCurrentStructure() {
    const ctx = contexts[currentStructure];
    ctx.clearRect(0, 0, canvases[currentStructure].width, canvases[currentStructure].height);
    if (currentStructure === 'queue') {
        structures[currentStructure].drawQueueNode(50, 100); // Ajuste conforme a implementação da fila
    } else {
        structures[currentStructure].drawTree(ctx, canvases[currentStructure]);
    }
}
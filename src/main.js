const container = document.querySelector(".data-container");
const form = document.getElementById('form');
var isSortedGlobal;
var executionDelay = 100;
var systemBusy = false;
form.addEventListener('submit', onFormSubmit);
function onFormSubmit(eve) {
    eve.preventDefault();
    if(systemBusy) {
        printLog("Please wait until I finish 😌");
        return;
    }
    const selectedAlgorithm = eve.target.elements[0].value;
    const dataSize = eve.target.elements[1].value;
    const searchElement = eve.target.elements[2].value;
    executionDelay = eve.target.elements[3].value;

    switch (selectedAlgorithm) {
        case "0":
            systemBusy = true;
            document.getElementById("heading").innerHTML = `Linear Search for ${searchElement}`;
            printLog("Roger that! looking for " + searchElement + " 🧐");
            onDoLinearSearch(dataSize,searchElement);
            break;
        case "1":
            systemBusy = true;
            document.getElementById("heading").innerHTML = `Binary Search for ${searchElement}`;
            printLog("Roger that! looking for " + searchElement + " 🧐");
            onDoBinarySearch(dataSize,searchElement);
            break;
        case "2":
            systemBusy = true;
            document.getElementById("heading").innerHTML = `Bubble Sort`;
            printLog("Started Sorting 🤹‍♀️");
            onDoBubbleSort(dataSize);
            break;
        case "3":
            document.getElementById("heading").innerHTML = `Selection Sort`;
            printLog("Started Sorting 🤹‍♀️");
            onDoSelectionSort(dataSize);
            break;
        default:
            break;
    }
}

function onDoBubbleSort(dataSize) {
    blocks = document.querySelectorAll(".block");
    if (blocks.length !== +dataSize) {
        generateGraph(+dataSize);
    }
    bubbleSort();
}
function onDoSelectionSort(dataSize) {
    blocks = document.querySelectorAll(".block");
    if (blocks.length !== +dataSize) {
        generateGraph(+dataSize);
    }
    selectionSort();
}
function generateGraph(num = 20, isSorted = false) {
     isSortedGlobal = isSorted;
    container.innerHTML ="";
    var sortedValues = Array.from({length: num}, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
    for (let i = 0; i < num; i += 1) {
        const value = (isSorted) ? sortedValues[i] : Math.floor(Math.random() * 100);
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.height = `${value * 3}px`;
        block.style.transform = `translateX(${i * 30}px)`;
        const blockLabel = document.createElement("label");
        blockLabel.classList.add("block__id");
        blockLabel.innerHTML = value;
        block.appendChild(blockLabel);
        container.appendChild(block);
    }
}

function swap(el1, el2) {
    return new Promise(resolve => {
        const style1 = window.getComputedStyle(el1);
        const style2 = window.getComputedStyle(el2);
        const transform1 = style1.getPropertyValue("transform");
        const transform2 = style2.getPropertyValue("transform");
        el1.style.transform = transform2;
        el2.style.transform = transform1;
        // Wait for the transition to end!
        window.requestAnimationFrame(function () {
            setTimeout(() => {
                exchangeElements(el2, el1);
                resolve();
            }, 250);
        });
    });
}

async function bubbleSort(delay = 100) {
    executionDelay = delay;
    let start = performance.now();
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";
            await new Promise((resolve) => {
                return setTimeout(() => {
                    resolve();
                }, delay);
            });
            const value1 = Number(blocks[j].childNodes[0].innerHTML);
            const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }
            blocks[j].style.backgroundColor = "#58B7FF";
            blocks[j + 1].style.backgroundColor = "#58B7FF";
        }

        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }
    systemBusy = false;
let end = performance.now();

    printLog(`All done 🤹 in ${((end-start)/1000).toFixed(2)} sec 🥳`);

}
async function selectionSort(delay = 100) {
    executionDelay = delay;
    let start = performance.now();
    let blocks = document.querySelectorAll(".block");
    let len = blocks.length;
    for (let i = 0; i < len; i++) {
        await new Promise((resolve) => {
            return setTimeout(() => {
                resolve();
            }, delay);
        });
        blocks = document.querySelectorAll(".block");
        repaintAll(blocks);
        let min = i;
        for (let j = i + 1; j < len; j++) {
            const value1 = Number(blocks[min].childNodes[0].innerHTML);
            const value2 = Number(blocks[j].childNodes[0].innerHTML);
            blocks[min].style.backgroundColor = "#FF4949";
            blocks[j].style.backgroundColor = "#FF4949";
            if (value1 > value2) {
                min = j;
            }
            blocks[min].style.backgroundColor = "#58B7FF";
            blocks[j].style.backgroundColor = "#58B7FF";

        }
        if (min !== i) {
            await swap(blocks[min], blocks[i]);
        }
    }
systemBusy = false;
let end = performance.now();
printLog(`All done 🤹 in ${((end-start)/1000).toFixed(2)} sec 🥳`);


}

function exchangeElements(element1, element2) {
    var clonedElement1 = element1.cloneNode(true);
    var clonedElement2 = element2.cloneNode(true);
    element2.parentNode.replaceChild(clonedElement1, element2);
    element1.parentNode.replaceChild(clonedElement2, element1);
    return clonedElement1;
}

function repaintAll(blocks) {
    blocks.forEach(el => {
        el.style.backgroundColor = "#58B7FF";
    });
}

async function onDoLinearSearch(dataSize, elementToFind) {
    blocks = document.querySelectorAll(".block");
    if (blocks.length !== +dataSize) {
        generateGraph(+dataSize);
    }
    linearSearch(elementToFind);

}
async function linearSearch(elToFind) {
    let blocks = document.querySelectorAll(".block");
    let elementFound = false;
    for (var i=0; i<blocks.length; i++) {
        const value = Number(blocks[i].childNodes[0].innerHTML);
        blocks[i].style.backgroundColor = "#FF4949";
        await new Promise((resolve) => {
            return setTimeout(() => {
                resolve();
            }, executionDelay);
        });
        if (value == elToFind) {
        elementFound = true;
        blocks[i].style.backgroundColor = "#13CE66";
        printLog(`Element Found at index ${i} 😎 🎉`);
        systemBusy = false;
        return i;
      }
      blocks[i].style.backgroundColor = "#58B7FF";
    } 
if (!elementFound) {

        printLog(`Sorry ! couldn't find ${elToFind} 😕
    Try changing the search element !`);
}  
systemBusy = false;
}
function onDoBinarySearch(dataSize, elementToFind) {
    blocks = document.querySelectorAll(".block");
    if (blocks.length !== +dataSize || isSortedGlobal === false) {
        generateGraph(+dataSize,true);
    }
    binarySearch(elementToFind);

}
async function binarySearch(elToFind) {
    let blocks = document.querySelectorAll(".block");
    repaintAll(blocks);
    let lowIndex = 0;
    let highIndex = blocks.length - 1;
    while (lowIndex <= highIndex) {
        let midIndex = Math.floor((lowIndex + highIndex) / 2);
        const value = Number(blocks[midIndex].childNodes[0].innerHTML);
        if (blocks[highIndex])blocks[highIndex].style.backgroundColor = "#FF4949";
        if (blocks[midIndex])blocks[midIndex].style.backgroundColor = "#FF4949";
        if (blocks[lowIndex])blocks[lowIndex].style.backgroundColor = "#FF4949";
        await new Promise((resolve) => {
            return setTimeout(() => {
                resolve();
            }, executionDelay);
        });
      if (value == elToFind) {
        printLog(`Element Found at index ${midIndex} 😎 🎉`);
          blocks[midIndex].style.backgroundColor = "#13CE66";
        if (blocks[highIndex] && highIndex !== midIndex)blocks[highIndex].style.backgroundColor = "#58B7FF";
        if (blocks[lowIndex] && lowIndex !== midIndex)blocks[lowIndex].style.backgroundColor = "#58B7FF";
        systemBusy = false;
          return midIndex;


      } else if (value < elToFind) {
        if (blocks[highIndex])blocks[highIndex].style.backgroundColor = "#58B7FF";
       if (blocks[midIndex])blocks[midIndex].style.backgroundColor = "#58B7FF";
       if (blocks[lowIndex])blocks[lowIndex].style.backgroundColor = "#58B7FF";
        lowIndex = midIndex + 1;
      } else {
        if (blocks[highIndex])blocks[highIndex].style.backgroundColor = "#58B7FF";
        if (blocks[midIndex])blocks[midIndex].style.backgroundColor = "#58B7FF";
        if (blocks[lowIndex])blocks[lowIndex].style.backgroundColor = "#58B7FF";
        highIndex = midIndex - 1;

    }
    }
    repaintAll(blocks);
    printLog(`Sorry ! couldn't find ${elToFind} 😕
    Try changing the search element`);
systemBusy = false;

    return null;
  }
generateGraph();
function printLog(text, clearAll = false) {
    const logger = document.getElementById("logger");
if (clearAll) {
    logger.innerHTML ="";
}
var newNode = document.createElement('p');
newNode.className = 'log-text';
newNode.innerHTML = text;
logger.appendChild(newNode);
logger.scrollTop = logger.scrollHeight;
}
// 1. Information Panel
// 2. Speed Control
// 
// Search highlight
// code refractor for binary
// implement quick sort
const container = document.querySelector(".data-container");
const form = document.getElementById('form');
const errorAlert = document.getElementById('errorAlert');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(eve) {
    eve.preventDefault();
    const selectedAlgorithm = eve.target.elements[0].value;
    const dataSize = eve.target.elements[1].value;
    const searchElement = eve.target.elements[2].value;
    switch (selectedAlgorithm) {
        case "0":
            document.getElementById("heading").innerHTML = `Linear Search for ${searchElement}`;
            onDoLinearSearch(dataSize,searchElement);
            break;
        case "1":
            document.getElementById("heading").innerHTML = `Binary Search for ${searchElement}`;
            binarySearch(searchElement);
            break;
        case "2":
            document.getElementById("heading").innerHTML = `Bubble Sort`;
            onDoBubbleSort(dataSize);
            break;
        case "3":
            document.getElementById("heading").innerHTML = `Selection Sort`;
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
function generateGraph(num = 10, isSorted = false) {
    container.innerHTML ="";
    let sortedValues = Array.from({length: num}, () => Math.floor(Math.random() * 100)).sort();
    for (let i = 0; i < num; i += 1) {
        const value = (isSorted) ? sortedValues[num] : Math.floor(Math.random() * 100);
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
}
async function selectionSort(delay = 100) {
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
    const delay = 100;
    let blocks = document.querySelectorAll(".block");
    let elementFound = false;
    for (var i=0; i<blocks.length; i++) {
        const value = Number(blocks[i].childNodes[0].innerHTML);
        blocks[i].style.backgroundColor = "#FF4949";
        await new Promise((resolve) => {
            return setTimeout(() => {
                resolve();
            }, delay);
        });
        if (value == elToFind) {
        elementFound = true;
        blocks[i].style.backgroundColor = "#13CE66";
        alert(`Element Found  😎 🎉!`)
        return i;
      }
      blocks[i].style.backgroundColor = "#58B7FF";
    } 
if (!elementFound) {
    alert(`Sorry ! couldn't find ${elToFind} 😕!
    Try changing the search element`);
}  
}
generateGraph();

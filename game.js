let cellsOn = [];
let cellsNeighbour = [];
let liveNeighbours = 0;
let gameStart = false;
let gameUnlock = false;
let cellsMatrix = [];
let newCellsMatrix = [];
let numberOfLine = document.getElementById("numberOfLine").value;
let numberOfColomn = document.getElementById("numberOfColomn").value;

// Au lieu de la repetition sur le html

let myDivTable = document.getElementById("table");
let myTable = document.createElement("table");
myTable.setAttribute("id", "myTable")

// Les boutons
function gameStartBtn() {
    gameStart = true;
    for (let index = 0; index < cellsOn.length; index++) {
        let myCell = cellsOn[index];
        // let [firstLine, firstColomn] = myCell.split('-').map(Number);
        nextGen(myCell);
    }
}

function gameUnlockBtn() {
    console.log('Game Unlocked');
    // for (let i = 0; i < numberOfLine; i++) {
    //     for (let j = 0; j < numberOfColomn; j++) {
    //         document.getElementById(i+'-'+j).removeAttribute("disabled");
    //     }
    // }
    gameUnlock = true;
}

function gameLockBtn() {
    console.log('Game locked');
    // for (let i = 0; i < numberOfLine; i++) {
    //     for (let j = 0; j < numberOfColomn; j++) {
    //     document.getElementById(i+'-'+j).setAttribute("disabled", "disabled");
    //     }
    // }
    gameUnlock = false;
}

function gameResetBtn() {
    document.getElementById("myTable").style.color = 'black';
}


// Generer le tableau
function generateTableBack(numberOfLine, numberOfColomn) {
    myTable.setAttribute("border", "2px black");
    myDivTable.appendChild(myTable);

    for (let i = 0; i < numberOfLine; i++) {
        let line = document.createElement("tr");
        for (let j = 0; j < numberOfColomn; j++) {
            if (!cellsMatrix[i]) cellsMatrix[i] = [];
            cellsMatrix[i][j] = document.createElement("td");
            cellsMatrix[i][j].setAttribute("id", i + '-' + j);
            cellsMatrix[i][j].setAttribute("value", 0);
            cellsMatrix[i][j].setAttribute("onclick", `onClickChangeBg('${i + '-' + j}')`);
            line.appendChild(cellsMatrix[i][j]);
        }
        myTable.appendChild(line);
    }
}

function generateTable() {
    if (gameUnlock == false)
        alert('Unlock the game');
    else
        generateTableBack(numberOfLine, numberOfColomn);
}

// recuperer le nombre de ligne et colonne dans html
function onChange(id) {
    if (id == "numberOfLine")
        numberOfLine = document.getElementById(id).value;
    else
        numberOfColomn = document.getElementById(id).value;
}

// Matrix ??
function addNumOnMatrix() {
    for (let i = 0; i < cellsMatrix.length; i++) {
        for (let j = 0; j < cellsMatrix.length; j++) {
            if (!cellsMatrix[i]) cellsMatrix[i] = new Array();
            var case_courante = (i + 1) + '-' + (j + 1);
            cellsMatrix[i][j] = case_courante;
            // cellsMatrix[i][j] = j;
            // console.log(cellsMatrix[i][j]);
        }
    }
    console.log(cellsMatrix);
}

function showMatrix() {
    for (let i = 0; i < cellsMatrix.length; i++) {
        for (let j = 0; j < cellsMatrix.length; j++) {
            cellsMatrix[i][j] = j;
            comsole.log(cellsMatrix[i][j]);
        }
    }
}

// Action dans le tableau
function onClickChangeBg(id) {
    if (gameUnlock) {
        let cell = document.getElementById(id);
        let cellLine = id.toString().charAt(0);;
        let cellCol = id.toString().charAt(2);
        let initBgColor = cell.style.backgroundColor;
        if (cell.style.backgroundColor == 'white') {
            cell.style.backgroundColor = 'blue';
            killcell(cellsOn, cell.id);
            cell.setAttribute("value", 0);
            cellsMatrix[cellLine][cellCol] = 0;
        } else {
            cell.style.backgroundColor = 'white';
            cellsOn.push(cell.id);
            cell.setAttribute("value", 1);
            cellsMatrix[cellLine][cellCol] = 1;
        }
    } else {
        alert('Unlock Game');
    }
}

function onClickAddIdOnArray(id) {
    let cell = document.getElementById(id);
    if (gameUnlock == true) {
        cellsOn.push(cell.id);
        console.log(cellsOn);
    } else {
        killcell(cellsOn, cell.id);
        console.log(cellsOn);
    }
}

function onClickStartAlgo(id) {
    if (gameStart) {
        getNeighbour();
    }
}

// console.log('cellsMatrix[firstLine]', cellsMatrix[firstLine])

// les voisins
function getNeighbours(id) {
    cellsNeighbour = [];
    let [theLine, theColomn] = id.split('-').map(Number);
    for (let i = theLine - 1; i <= theLine + 1; i++) {
        for (let j = theColomn - 1; j <= theColomn + 1; j++) {
            if (i >= 0 && i < cellsMatrix.length && j >= 0 && j < cellsMatrix[0].length && (i != theLine || j != theColomn)) {
                cellsNeighbour.push(cellsMatrix[i][j]);
            }
        }
    }

    // console.log(cellsMatrix[firstLine][firstColomn]);
    console.log("cellsOn", cellsOn);
    console.log("cellsNg", cellsNeighbour);
}

function getNumberOfNeighbour() {
    if (nombre == 3) {
        console.log("");
    }
}

// supprimer un element du tableau
function killcell(cellsOn, cell) {
    let index = cellsOn.indexOf(cell);
    if (index > -1)
        cellsOn.splice(index, 1);
}

// Algo
function theAlgo(cell, liveNeighbours) {
    if (cell == 1 && (liveNeighbours == 2 || liveNeighbours == 3)) {
        return 1;
    } else if (cell == 0 && liveNeighbours == 3) {
        return 1;
    } else {
        return 0;
    }
}

// T+1
function nextGen(id) {
    newCellsMatrix = [];
    for (let i = 0; i < numberOfLine; i++) {
        let newLine = [];
        for (let j = 0; j < numberOfColomn; j++) {
            getNeighbours(i + '-' + j);
            liveNeighbours = cellsNeighbour.reduce((acc, curr) => acc + curr, 0);
            let newCellState = theAlgo(cellsMatrix[i][j], liveNeighbours);
            newLine.push(newCellState);
        }
        newCellsMatrix.push(newLine);
    }
    cellsMatrix = newCellsMatrix.slice();
}
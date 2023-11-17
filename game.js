let cellsOn = [];
let gameUnlock = false;
let cellsMatrix = new Array();
let numberOfLine = document.getElementById("numberOfLine").value;
let numberOfColomn = document.getElementById("numberOfColomn").value;

// Au lieu de la repetition sur le html

let myDivTable = document.getElementById("table");
let myTable = document.createElement("table");
myTable.setAttribute("id", "myTable")

function gameStartBtn() {
    gameUnlock = true;
}

function gameUnlockBtn() {
    console.log('Game Unlocked');
    for (let i = 0; i < numberOfLine; i++) {
        for (let j = 0; j < numberOfColomn; j++) {
            document.getElementById(i+'-'+j).removeAttribute("disabled");
        }
    }
    gameUnlock = true;
}

function gameLockBtn() {
    console.log('Game locked');
    for (let i = 0; i < numberOfLine; i++) {
        for (let j = 0; j < numberOfColomn; j++) {
        document.getElementById(i+'-'+j).setAttribute("disabled", "disabled");
        }
    }
    gameUnlock = false;
}

function gameResetBtn() {
    document.getElementById("myTable").style.color = 'black';
}

function generateTableBack(numberOfLine, numberOfColomn) {
    myTable.setAttribute("border","2px black");
    myDivTable.appendChild(myTable);
console.log('numberOfColomn - numberOfLine', numberOfColomn, numberOfLine)

    for (let i = 0; i < numberOfColomn; i++) {
        let line = document.createElement("tr");
        for (let j = 0; j < numberOfLine; j++) {
            if (!cellsMatrix[i]) cellsMatrix[i] = new Array();
            cellsMatrix[i][j] = document.createElement("td");
            cellsMatrix[i][j].setAttribute("id",i +'-' +j);
            cellsMatrix[i][j].setAttribute("onclick",`onClickChangeBg('${i+'-'+j}')`);
            line.appendChild(cellsMatrix[i][j]);
        }
        myTable.appendChild(line);
    }
    console.log('cellsMatrix', cellsMatrix)
}

function generateTable() {
    if (gameUnlock == false)
        alert('Start the game');
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

function addNumOnMatrix() {
    for (let i = 0; i < cellsMatrix.length; i++) {
        for (let j = 0; j < cellsMatrix.length; j++) {
            if (!cellsMatrix[i]) cellsMatrix[i] = new Array(); 
            var case_courante = (i+1) + '-' + (j+1);
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

function onClickChangeBg(id){
    let cell = document.getElementById(id);
    let initBgColor = cell.style.backgroundColor;
    if(cell.style.backgroundColor == 'white'){
        cell.style.backgroundColor = 'blue';
        killcell(cellsOn, cell.id);
        console.log(cellsOn);
    }else{
        cell.style.backgroundColor = 'white';
        cellsOn.push(cell.id);
        console.log(cellsOn);
    }
}

function onClickAddIdOnArray(id) {
    let cell = document.getElementById(id);
    if (gameUnlock == true) {
        cellsOn.push(cell.id);
        console.log(cellsOn);
    }else{
        killcell(cellsOn, cell.id)
        console.log(cellsOn);
    }
}

// ???
function neighNum(nombre) {
    if (nombre == 3) {
        console.log("");
    }
}

function killcell(cellsOn, cell) {
    let index = cellsOn.indexOf(cell);
    if (index > -1)
        cellsOn.splice(index, 1);
}
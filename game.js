let cellsOn = [];
let gameUnlock = false;
let cellsMatix = new Array();
let numberOfLine = 5;
let numberOfColomn = 5;

cellsMatix.length = 5;

function addNumOnMatrix() {
    for (let i = 0; i < cellsMatix.length; i++) {
        for (let j = 0; j < cellsMatix.length; j++) {
            if (!cellsMatix[i]) cellsMatix[i] = new Array(); 
            var case_courante = (i+1) + '-' + (j+1);
            cellsMatix[i][j] = case_courante;
            // cellsMatix[i][j] = j;
            // console.log(cellsMatix[i][j]);

        }
    }
    console.log(cellsMatix);
}

function showMatrix() {
    for (let i = 0; i < cellsMatix.length; i++) {
        for (let j = 0; j < cellsMatix.length; j++) {
            cellsMatix[i][j] = j;
            comsole.log(cellsMatix[i][j]);
        }        
    }
}

function gameUnlockBtn() {
    console.log('Game Unlocked');
    for (let i = 1; i <= numberOfLine; i++) {
        for (let j = 1; j <= numberOfColomn; j++) {
            document.getElementById(i+'-'+j).removeAttribute("disabled");
        }
    }
    gameUnlock = true;
}

function gameLockBtn() {
    console.log('Game locked');
    for (let i = 1; i <= numberOfLine; i++) {
        for (let j = 1; j <= numberOfColomn; j++) {
        document.getElementById(i+'-'+j).setAttribute("disabled", "disabled");
        }
    }
    gameUnlock = false;
}

function onClickGetId(id) {
    if (gameUnlock == true) {
        if (document.getElementById(id).value == 'off') {
            cellsOn.push(document.getElementById(id).id);
            document.getElementById(id).value = 'on';
            console.log(document.getElementById(id).value);
            console.log(cellsOn);
        }else{
            document.getElementById(id).value = 'off';
            cellsOn.push(document.getElementById(id).id);
            console.log(document.getElementById(id).value);
            console.log(cellsOn);
        }
    }else{
        console.log('Start the game');
    }
}

function neighNum(nombre) {
    if (nombre == 3) {
        console.log("");
    }
}

function addcell(params) {
    
}

function killcell(params) {
    
}
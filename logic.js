let boxes = document.querySelectorAll(".play-box");
let resetBtn = document.querySelector(".reset");
let body = document.querySelector("body")
let playerTurn = "X";
let msg = document.querySelector(".msg");
let newGameBtn = document.querySelector(".hide");
let noOfTurns = 0; 



// assuming the grid as a matrix and indexing from 1
let winningSequences = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
]

for(let box of boxes){
    box.addEventListener("click",() => {
        if(playerTurn == "X"){
            box.innerText = "X";
            playerTurn = "O"
            msg.innerText = `${playerTurn} Turn`;
        }
        else if(playerTurn == "O"){
            box.innerText = "O"
            playerTurn = "X"
            msg.innerText = `${playerTurn} Turn`;
        }
        box.disabled = true;
        noOfTurns++;
        tabulate();
    })
}   


let tabulate = () => {
    for(let seq of winningSequences){
        let x_streak = 0;
        let y_streak = 0;
        for(let boxNo of seq){
            if(boxes[boxNo-1].innerText == "X"){
                x_streak++;
                if(x_streak == 3){
                    msg.innerText = `X is the winner`;
                    for(let i = 0 ; i < 3 ; i++){
                        boxes[seq[i]-1].style.backgroundColor = "lightgreen";
                    }
                    disableAllBoxes();
                    newGameBtn.classList.remove("hide")
                    noOfTurns = 0;
                    return;
                }
            }   
            else if(boxes[boxNo-1].innerText == "O"){
                y_streak++;
                if(y_streak == 3){
                    msg.innerText = `O is the winner`;
                    for(let i = 0 ; i < 3 ; i++){
                        boxes[seq[i]-1].style.backgroundColor = "lightgreen";
                    }
                    disableAllBoxes();
                    newGameBtn.classList.remove("hide")
                    noOfTurns = 0;
                    return;
                }   
            }            
        } 
    }
    if(noOfTurns==9){
        msg.innerText = `Match Tied`
        newGameBtn.classList.remove("hide");
        return;
    }         
}



let disableAllBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

let enableAllBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
    }
}

let restart = () => {
    enableAllBoxes();
    for(let box of boxes){
        box.innerText = "";
        box.style.backgroundColor = "#FFDC7F"
    }
    playerTurn = "X"
    msg.innerText = `${playerTurn} Turn`;
    newGameBtn.classList.add("hide");
    noOfTurns = 0;
}

resetBtn.addEventListener("click",restart)
newGameBtn.addEventListener("click",restart)



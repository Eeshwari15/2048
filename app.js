let grid;
let score=0;
function isGameWon(){
    for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
        if(grid[i][j]===2048)
          return true;
    }}
    return false;
    }
    
    
    
    




function isGameOver(){
for(let i=0;i<4;i++){
for(let j=0;j<4;j++){
    if(grid[i][j]===0)
    return false;
    if(j!==3 && grid[i][j]===grid[i][j+1])
    return false;
    if(i!==3 && grid[i][j]===grid[i+1][j])
    return false;

    }

}
return true;
}










function blankGrid(){
    grid=[[0 ,2, 0, 0],
          [0 ,0, 0, 0],
          [0 ,0, 0, 0],
          [0 ,0, 0, 0]];
          return grid;
}
function setup(){
    createCanvas(400,400);
    noLoop();
    grid=blankGrid();
    addNumber();
    addNumber();
    updateCanvas();
    console.table(grid);
    

}
function compare(past,grid){
    for(let i=0;i<4;i++){
         for(let j=0;j<4;j++){
             if(past[i][j]!==grid[i][j])
             return true;
         }
    }
    return false;
}

function flipGrid(grid){
    for(let i=0;i<4;i++){
        grid[i].reverse();
    }
    return grid;
}
function rotateGrid(grid){
    newGrid=blankGrid();
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
           newGrid[i][j]=grid[j][i];
        }
    }
    
    return newGrid;
}

function keyPressed(){
    var played=false;
   if(keyCode===UP_ARROW){
          flipGrid(grid);
         var flipped=true;
         played=true;
   }
   else if(keyCode===DOWN_ARROW){
       //do nothing
       played=true;
   }
   
   else if(keyCode===RIGHT_ARROW){
        rotateGrid(grid);
        var rotated=true;
        played=true;
}
else if(keyCode===LEFT_ARROW){
    grid=rotateGrid(grid);
    grid=flipGrid(grid);
    var flipped=true;
    var rotated=true;
    played=true;
}

   if(played===true){
        
        past=gridCopy(grid);
        for(let i=0;i<4;i++){
            grid[i]=operate(grid[i]);
                 }
                 let changed=compare(past,grid);
                 if(flipped)
                    grid=flipGrid(grid);
                if(rotated){
                   grid= rotateGrid(grid);
                    grid=rotateGrid(grid);
                    grid=rotateGrid(grid);
                }
                
                 addNumber( );
                 updateCanvas();
                 let gameover=isGameOver();
                 if(gameover){
                   alert("Game Over!!!!");
                }
                   if(isGameWon){
                       let gamewon=isGameWon();
                      console.log(gamewon);
                   }
            }
}
function gridCopy(grid){
    extra=blankGrid();
    for(let i=0;i<4;i++){
         for(let j=0;j<4;j++){
             extra[i][j]=grid[i][j];
         }
    }
   return extra;
}




function operate(row){
    row=slide(row);
    row=combine(row);
    row=slide(row);
    return row;
}
function addNumber(){
    let options=[];
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(grid[i][j]==0)
            options.push({
                x:i,
                y:j
            });
        }
    }
    if(options.length>0){
    let spot=random(options);
    let r=random(1);
    grid[spot.x][spot.y]=r>0.5?2:4;
    }
}
function combine(row){
    for(let i=3;i>=0;i--){
        let a=row[i];
        let b=row[i-1];
        if(a===b){
            row[i]=a+b;
            score=score+a+b;
            printScore(score);
            row[i-1]=0;
            
        }
        
    }
    return row;

}
function updateCanvas(){
    background(255);
    drawGrid();
    document.getElementById("score").innerHTML=score;
    }
function drawGrid(){
    let w=100;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            noFill();
            strokeWeight(2);
            stroke(0);
            rect(i*w,j*w,w,w);
            let val=grid[i][j];
            textAlign(CENTER,CENTER);
            let s=""+val;
            let len=s.length-1;
            let sizes=[64,64,36,18];
            textSize(sizes[len]);
            fill(0);
            noStroke();
            text(val,i * w + w / 2,j * w + w/2);

        }
    }


}

function slide(row){
    let arr=row.filter(val=>val);
    let missing=4-arr.length;
    let zeros=Array(missing).fill(0);
    arr=zeros.concat(arr);
   return arr;
   console.log(arr);
}
function printScore(score){
    document.getElementById("score").innerHTML=score;
}
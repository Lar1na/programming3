function matrixGenerator(matrixSize,grassCount,grEatCount,predatorCount, energy_giver_count){
    let matrix = [];

      for(let i = 0; i < matrixSize;i++){
              matrix[i] = []
          for(let j = 0; j < matrixSize; j++){
                  matrix[i][j] = 0;
          }
      }

      for(let i = 0 ; i < grassCount; i++ ){
            
           let x  = Math.floor(Math.random() * matrixSize)
           let y  = Math.floor(Math.random() * matrixSize)

                 if(matrix[y][x] == 0){
                     matrix[y][x] = 1;
                 }

      }

      for(let i = 0 ; i < grEatCount; i++ ){
            
         let x  = Math.floor(Math.random() * matrixSize)
         let y  = Math.floor(Math.random() * matrixSize)

               if(matrix[y][x] == 0){
                   matrix[y][x] = 2;
               }

    }
    for(let i = 0 ; i < predatorCount; i++ ){
            
         let x  = Math.floor(Math.random() * matrixSize)
         let y  = Math.floor(Math.random() * matrixSize)

               if(matrix[y][x] == 0){
                   matrix[y][x] = 3;
               }

    }
    for(let i= 0; i <= energy_giver_count; i++ ){
      let x  = Math.floor(Math.random() * matrixSize)
      let y  = Math.floor(Math.random() * matrixSize)
      if(matrix[y][x] == 0){
          matrix[y][x] = 4;
      }
    }


 return matrix ;     
}


var side = prompt("Ներմուծեք յուրաքանչյուր վանդակի երկարությունը(լռելայն ՝ 20)");
var matrix_size = prompt("Ներմուծեք աղյուսակի վանդակների թիվը(լռելայն ՝ 30)")
var color_of_canvas = prompt("Ներմուծեք դատարկ վանդակների գույնը(լռելայն ՝ սպիտակ)")

if(side == ""){
    side = 20
}
if(matrix_size == ""){
    matrix_size = 30
}
let matrix = matrixGenerator(matrix_size,50,15,25, 5);



var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var energy_giver = [];
var bomb_arr = []; 
var amenaker_arr = []
function AddBomb() {
    for (let i = 0; i < 1; i++) {
        let x = Math.floor(random(matrix_size));
        let y = Math.floor(random(matrix_size));
        matrix[y][x] = 5;
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 5) {
                let bomb = new Bomb(x, y);
                bomb_arr.push(bomb);
            }

        }
    }
}
function AddAmenaker() {
    for (let i = 0; i < 1; i++) {
        let x = Math.floor(random(matrix_size));
        let y = Math.floor(random(matrix_size));
        matrix[y][x] = 6;
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 6) {
                let amenaker = new Amenaker(x, y);
                amenaker_arr.push(amenaker);
            }

        }
    }
}
function setup(){
frameRate(10)
createCanvas(matrix[0].length * side, matrix.length * side);

 for(var y = 0 ; y < matrix.length ;y++){
      for(var x = 0; x < matrix[y].length;x++){
                     if(matrix[y][x] == 1){
                          var gr = new Grass(x,y)

                          grassArr.push(gr)
                     }else  if(matrix[y][x] == 2){
                        var grEat = new GrassEater(x,y)

                        grassEaterArr.push(grEat)
                   }else  if(matrix[y][x] == 3){
                        var pre = new Predator(x,y)

                        predatorArr.push(pre)
                   }else if(matrix[y][x] == 4){
                       var en_giv = new Energy_giver(x, y)
                   }
      }
 }

}
function draw(){
 for(var y = 0; y < matrix.length; y++){
      for(var x = 0; x < matrix[y].length;x++){
          
               if(matrix[y][x] == 1){
                    rect(x  * side ,y * side , side , side)
                    fill("green")
               }
               else if(matrix[y][x] == 2){
                    rect(x  * side ,y * side , side , side)
                    fill("yellow")
              }
              else if(matrix[y][x] == 3){
                                  fill("red")
              }
              else if(matrix[y][x] == 4){
                    fill("blue")
                    rect(x  * side ,y * side , side , side)
            
              }
              else if(matrix[y][x] == 5){
                    fill("black")
                    rect(x  * side ,y * side , side , side)
              }
              else if(matrix[y][x] == 6){
                    fill("purple")
                    rect(x  * side ,y * side , side , side)
              }
              else{
                    fill(color_of_canvas)
                    rect(x  * side ,y * side , side , side)
               }
               

      }
 }

 for(var i in grassArr){
       grassArr[i].mul()
 }

 for (let j in grassEaterArr) {
    grassEaterArr[j].mul()
    grassEaterArr[j].eat()
}

for (let j in predatorArr) {
    predatorArr[j].mul()
    predatorArr[j].eat()
}
for (let j in bomb_arr) {
    bomb_arr[j].mul()
    
}
for (let j in amenaker_arr) {
    amenaker_arr[j].eat()
    
}
}

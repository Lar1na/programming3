const socket = io();
var side = prompt("Ներմուծեք յուրաքանչյուր վանդակի երկարությունը(լռելայն ՝ 20)");
var color_of_canvas = prompt("Ներմուծեք դատարկ վանդակների գույնը(լռելայն ՝ սպիտակ)")
var matrix_size = +prompt("Ներմուծեք աղյուսակի վանդակների թիվը(լռելայն ՝ 30)")

if(side == ""){
    side = 20
}
if(matrix_size == ""){
    matrix_size = 30
}




function AddBomb() {
    for (let i = 0; i < 1; i++) {
        let x = Math.floor(Math.random * 20);
        let y = Math.floor(Math.random * 20);
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
        let x = Math.floor(Math.random * 20);
        let y = Math.floor(Math.random * 20);
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
    createCanvas(30 * side, 30 * side);

}
function nkarel(matrix){
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

}
socket.on('send matrix', nkarel)
// setInterval(
//     function(){
//         socket.on('send matrix', nkarel)
//     },1000
// )

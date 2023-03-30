const socket = io();
var side = prompt("Ներմուծեք յուրաքանչյուր վանդակի երկարությունը(լռելյայն ՝ 20)");
var color_of_canvas = prompt("Ներմուծեք դատարկ վանդակների գույնը(լռելյայն ՝ սպիտակ)")
var matrix_size = +prompt("Ներմուծեք աղյուսակի վանդակների թիվը(լռելյայն ՝ 30)")

if(side == ""){
    side = 20
}
if(matrix_size == ""){
    matrix_size = 30
}
if(color_of_canvas == ""){
    color_of_canvas = 'white'
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

function AddBomb(){
    socket.emit("add bomb")
}
function AddAmenaker(){
    socket.emit("addAmenaker")
}
// setInterval(
//     function(){
//         socket.on('send matrix', nkarel)
//     },1000
// )

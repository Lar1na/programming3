const socket = io();
var side = prompt("Ներմուծեք յուրաքանչյուր վանդակի երկարությունը(լռելյայն ՝ 20)");
var matrix_size = +prompt("Ներմուծեք աղյուսակի վանդակների թիվը(լռելյայն ՝ 30)")
weather = 'spring'

if(side == ""){
    side = 20
}
if(matrix_size == ""){
    matrix_size = 30
}

let colors = ["green","yellow", "red", "blue", "black", "purple"]

function weatherFunc(weather){
    if(weather == 'winter'){
        colors = ["#617143","#E7B10A", '#871616', '#163287', 'black', '#871680']
        // colors = ["green","yellow", "red", "blue", "black", "purple"]
    }
    else if (weather == 'spring'){
        colors = ["green","yellow", "red", "blue", "black", "purple"]
    }
    else if(weather == 'autumn'){
        colors = ['#898121', '#E7B10A', "#DD4A48", '#8FBDD3', 'black', '#B97A95']
    }
    else{
        colors = ['#379237', '#F0FF42', "#C21010", '#2192FF', 'black', '#B97A95']
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
                    fill(colors[0])
               }
               else if(matrix[y][x] == 2){
                    fill(colors[1])
              }
              else if(matrix[y][x] == 3){
                    fill(colors[2])
              }
              else if(matrix[y][x] == 4){
                    fill(colors[3])            
              }
              else if(matrix[y][x] == 5){
                    fill(colors[4])
              }
              else if(matrix[y][x] == 6){
                    fill(colors[5])
              }
              else{
                    fill('white')
               }
               rect(x  * side ,y * side , side , side)
        
            }
 }
} 
socket.on('send matrix', nkarel)
socket.on('send weather', weatherFunc)
function AddBomb(){
    socket.emit("add bomb")
}
function AddAmenaker(){
    socket.emit("addAmenaker")
}
function Winter(){
    socket.emit("winter")
}
function Spring(){
    socket.emit("spring")
}
function Autumn(){
    socket.emit("autumn")
}
function Summer(){
    socket.emit("summer")
}
// setInterval(
//     function(){
//         socket.on('send matrix', nkarel)
//     },1000
// )

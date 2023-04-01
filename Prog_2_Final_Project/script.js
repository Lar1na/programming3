const socket = io();
var side = prompt("Ներմուծեք յուրաքանչյուր վանդակի երկարությունը(լռելյայն ՝ 20)");
var color_of_canvas = prompt("Ներմուծեք դատարկ վանդակների գույնը(լռելյայն ՝ սպիտակ)")
var matrix_size = +prompt("Ներմուծեք աղյուսակի վանդակների թիվը(լռելյայն ՝ 30)")
weather = 'spring'

if(side == ""){
    side = 20
}
if(matrix_size == ""){
    matrix_size = 30
}
if(color_of_canvas == ""){
    color_of_canvas = 'white'
}

let colors = ["green","yellow", "red", "blue", "black", "purple"]

function weatherFunc(weather){
    if(weather == 'winter'){
        colors = ["#214508","#818716", '#871616', '#163287', 'black', '#871680']

        // colors = ["green","yellow", "red", "blue", "black", "purple"]
    }
    else if (weather == 'spring'){
        colors = ["green","yellow", "red", "blue", "black", "purple"]

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
            
            // else if(weather == 'winter'){
            //     if(matrix[y][x] == 1){
            //          fill("#214508")
            //     }
            //     else if(matrix[y][x] == 2){
            //          fill("#818716")
            //    }
            //    else if(matrix[y][x] == 3){
            //          fill("#871616")
            //    }
            //    else if(matrix[y][x] == 4){
            //          fill("#163287")            
            //    }
            //    else if(matrix[y][x] == 5){
            //          fill("black")
            //    }
            //    else if(matrix[y][x] == 6){
            //          fill("#871680")
            //    }
            //    else{
            //          fill(color_of_canvas)
            //     }
            //  }
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
// setInterval(
//     function(){
//         socket.on('send matrix', nkarel)
//     },1000
// )

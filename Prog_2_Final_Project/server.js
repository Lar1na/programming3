var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res){
   
    res.redirect('index.html');
});
server.listen(3000);


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
// var matrix_size = +prompt("Ներմուծեք աղյուսակի վանդակների թիվը(լռելայն ՝ 30)")

 matrix = matrixGenerator(20,50,15,25, 5);

io.sockets.emit('send matrix', matrix)

grassArr = [];
grassEaterArr = [];
predatorArr = [];
energy_giver = [];
bomb_arr = []; 
amenaker_arr = []

Grass = require("./grass");
GrassEater = require("./grassEater");
Predator = require("./predator");
EnergyGiver = require("./energy_giver");
Bomb = require("./bomb")


function CreateObject(){
    console.log(matrix);
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
   io.sockets('send matrix', matrix) 
}


function game(){
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
 io.sockets.emit('send matrix', matrix) 
}


setInterval(game, 200)




io.sockets.emit('send matrix', matrix) 


io.on('connection', function(){
    CreateObject()
})

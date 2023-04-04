var express = require('express');
var app = express();
var server = require('http').createServer(app);
var fs = require("fs");
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

matrix = [];
let v = 200
function matrixGenerator(matrixSize, grassCount, grEatCount, predatorCount, energy_giver_count) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = []
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < grassCount; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }

    }

    for (let i = 0; i < grEatCount; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }

    }
    for (let i = 0; i < predatorCount; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }

    }
    for (let i = 0; i <= energy_giver_count; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }

    io.emit('send matrix', matrix)
    return matrix;
}
matrix = matrixGenerator(30, 50, 60, 60, 30);

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
Bomb = require('./bomb');
Amenaker = require('./amenaker');


function CreateObject() {
    // console.log(matrix);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                var pre = new Predator(x, y)
                predatorArr.push(pre)
            } else if (matrix[y][x] == 4) {
                var en = new EnergyGiver(x, y)
                energy_giver.push(en)
            }
        }
    }
    io.emit('send matrix', matrix)
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }

    for (let j in grassEaterArr) {
        grassEaterArr[j].eat()
    }
    // console.log(predatorArr);
    
    for (let j in predatorArr) {
        predatorArr[j].eat()
    }
    for (let j in bomb_arr) {
        bomb_arr[j].mul()
    }
    for (let j in amenaker_arr) {
        amenaker_arr[j].eat()

    }
    io.emit('send matrix', matrix)
}



function AddAmenaker() {
    
    for (let i = 0; i < 1; i++) {
        let x = Math.floor(Math.random() * 20);
        let y = Math.floor(Math.random() * 20);
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
    io.emit('send matrix', matrix)

}
function AddBomb() {
    // console.log('hello worldddd');
    for (let i = 0; i < 1; i++) {
        let x = Math.floor(Math.random() * 20);
        let y = Math.floor(Math.random() * 20); 
        matrix[y][x] = 5;
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 5) {
                let bomb = new Bomb(x, y);
                bomb_arr.push(bomb);
                // console.log(matrix);
            }

        }
    }
    io.emit('send matrix', matrix)

}
function Winter(){
    weather = 'winter'
    clearInterval(interval)
    setInterval(game,500)
    io.emit('send weather', weather)
}
function Spring(){
    weather = 'spring'
    clearInterval(interval)
    setInterval(game,350)
    io.emit('send weather', weather)

}
function Autumn(){
    weather = 'autumn'
    clearInterval(interval)
    setInterval(game,400)
    io.emit('send weather', weather)
}
function Summer(){
    weather = 'summer'
    clearInterval(interval)
    setInterval(game,300)
    io.emit('send weather', weather)

}
// function add (n){
//     console.log(n);
// }

// io.on("add bomb", add);
    // io.emit("add bomb", addBomb)÷

// function AddAmenaker(){
//     socket.emit("addAmenaker")
// }

io.on('connection', function(socket) {
    CreateObject();
   
    socket.on('add bomb', AddBomb);
    socket.on('addAmenaker', AddAmenaker);
    socket.on('winter', Winter);
    socket.on('spring', Spring);
    socket.on('autumn', Autumn);
    socket.on('spring', Summer);
    
});
st = {}

setInterval(function() {
    st.Grass = grassArr.length;
    st.GrassEater = grassEaterArr.length;
    st.Predator = predatorArr.length;
    st.Bomb = bomb_arr.length;
    st.Amenaker = amenaker_arr.length;
    st.EnergyGiver = energy_giver.length;

    fs.writeFile("st.json", JSON.stringify(st), function(){
        console.log("heloo");
    })
},500)


let interval = setInterval(game, 350)


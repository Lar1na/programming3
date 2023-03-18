let LivingCreature = require("./LivingCreature")
module.exports = class Amenaker extends LivingCreature {
    constructor(x, y){
      super(x,y)
        this.energy = 15
        this.directions =  [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char, char1, char2) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char1) {
                    found.push(this.directions[i]);
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var emptyCells = this.chooseCell(0)
        var newCell  =  emptyCells[Math.floor(Math.random * emptyCells.length)];


        if (newCell) {
            this.energy--
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 6
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy < 0) {
                this.die()
            }
        }
        else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }

    }
    eat() {
        let emptyCell = this.chooseCell(1, 2, 3);
        var newCell  =  emptyCell[Math.floor(Math.random * emptyCell.length)];
        

        if (newCell) {
            this.energy += 3;
            let x = newCell[0];
            let y = newCell[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 50) {
                this.mul()
            }
        } else {
            this.move()
        }
    }

    mul(){
            var emptyCells = this.chooseCell(0);
            var newCell  =  emptyCells[Math.floor(Math.random * emptyCells.length)];

    
            if (newCell && this.energy > 8) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 6;
    
                var amKer = new Amenaker(newX, newY);

                amenaker_arr.push(amKer);
                this.energy = 20
            }
        }
    
        die() {
            matrix[this.y][this.x] = 0;
            for (var i in amenaker_arr) {
                if (this.x == amenaker_arr[i].x && this.y == amenaker_arr[i].y) {
                    amenaker_arr.splice(i, 1);
                    break;
                }
            }
        }
            
}
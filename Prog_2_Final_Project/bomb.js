let LivingCreature = require("./LivingCreature")
module.exports = class Bomb extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 1
        this.directions = this.directions = [
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

    getNewCoordinates() {
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

    chooseCell(char1, char2, char3, char4) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
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
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char3) {
                    found.push(this.directions[i]);
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char4) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
   
    mul() {
        let emptyCell = this.chooseCell(0, 1, 2, 3, 4, 6);
        var newCell  =  emptyCell[Math.floor(Math.random * emptyCell.length)];


        if (newCell) {
            this.energy++
            let x = newCell[0];
            let y = newCell[1];

            for (let i = 0; i < bomb_arr.length; i++) {
                if (bomb_arr[i].x == x && bomb_arr[i].y == y) {
                    bomb_arr.splice(i, 1)
                }
            }

            matrix[y][x] = 5
            matrix[this.y][this.x] = 5

            this.x = x
            this.y = y

        }
        if (this.energy > 15) {
            this.die()
        }
    
}

    die() {
        for (let i = 0; i < bomb_arr.length; i++) {
            if (bomb_arr[i].x == this.x && bomb_arr[i].y == this.y) {
                bomb_arr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0

        for (let x = 0; x < matrix.length; x++) {
            for (let y = 0; y < matrix[x].length; y++) {
                if (matrix[x][y] == 5) {
                    matrix[x][y] = 7
                }
            }
        }
    }
}

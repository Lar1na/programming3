class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1    ],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1    ],
            [this.x + 1, this.y + 1],
        ]
    }


    chooseCell(char) {
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;
    }


      mul(){
            this.multiply++
             var emptyCell  =  this.chooseCell(0);
             var newCell  =    random(emptyCell);

                   if(newCell && this.multiply >= 5){
                          
                            var newX = newCell[0];
                            var newY = newCell[1];

                                matrix[newY][newX] = 1;

                                var gr = new Grass(newX,newY); 

                                grassArr.push(gr);

                                this.multiply = 0;
                         
                   }
      }
}


class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.multiply = 0
        this.directions = [];
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

    chooseCell(char) {
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
        }
        return found;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var grEat = new GrassEater(newX, newY);
            grassEaterArr.push(grEat);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCell = this.chooseCell(0)
        var newCell = random(emptyCell)

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCell = this.chooseCell(1)
        var emptyCell1 = this.chooseCell(4)
        var newCell = random(emptyCell)
        var newCell1 = random(emptyCell1)
        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        }
        else if(newCell1){
            this.energy+=2
            var newX = newCell1[0]
            var newY = newCell1[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in energy_giver) {
                if (newX == energy_giver[i].x && newY == energy_giver[i].y) {
                    energy_giver.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}


class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.multiply = 0
        this.directions = [];
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

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 16) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var pre = new Predator(newX, newY);
            predatorArr.push(pre);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells);

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = this.chooseCell(2)
        var newCell = random(emptyCells);

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}
class Energy_giver{
    constructor(x, y){
        this.x = x
        this.y = y
        this.energy = 1
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1    ],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1    ],
            [this.x + 1, this.y + 1],
        ]
    }
    chooseCell(char) {
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;
    }
    die(){
         matrix[this.y][this.x] = 0;
        for (var i in energy_giver) {
                if (this.x == energy_giver[i].x && this.y == energy_giver[i].y) {
                    energy_giver.splice(i, 1);
                    break;
                }
            }

    }
    
}

class Bomb{
        constructor(x, y) {
            this.x = x;
            this.y = y;
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
            let newCell = random(emptyCell)
    
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


class Amenaker{
    constructor(x, y){
        this.x = x
        this.y = y
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
        var newCell = random(emptyCells);

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
        let newCell = random(emptyCell)

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
            var newCell = random(emptyCells);
    
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
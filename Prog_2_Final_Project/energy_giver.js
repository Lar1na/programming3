
class Energy_giver extends LivingCreature{
    constructor(x, y){
        super(x,y)
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


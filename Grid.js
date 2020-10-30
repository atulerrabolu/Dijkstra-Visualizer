class Grid {
    //Creates a gird with 16x16 node objects
    constructor() {
        this.matrix = new Array(16);
        for(let i = 0; i < this.matrix.length; i++) {
            this.matrix[i] = new Array(16);
            for(let j = 0; j < this.matrix[i].length; j++) {
                this.matrix[i][j] = new Node(i, j, 40);
            }
        }
    }

    //Displays the grid
    show() {
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                this.matrix[i][j].show();
            }
        }
    }
}
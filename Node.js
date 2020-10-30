class Node {
    //Set the attributes of a node object
    constructor(row, col, width) {
        this.row = row;
        this.col = col;
        this.x = col * width;
        this.y = row * width;
        this.width = width;
        this.status = '';
        this.distance = 0;
    }

    //Check if the mouse is within the bounds of the node object
    inBounds(x, y) {
        return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.width;
    }

    //Draw the node object onto the grid
    show() {
        stroke(0);
        fill(255);

        if(this.status == 'wall') {
            fill("black");
        } else if(this == start) {
            fill('blue');
        } else if(this == end) {
            fill('red');
        } else if(this.status == 'path') {
            fill('green');
        } else if(this.status == 'searched') {
            fill(127, 250, 136); //light green
        }

        square(this.x,this.y,this.width);
        if(this.distance != 0 && this != end && this != start) {
            fill(0);
            textSize(12);
            text(Math.round(this.distance*10)/10, this.x + this.width/2 , this.y + this.width/2);
        }
    }

    toString() {
        return this.row + ", " + this.col;
    } 
}
let grid;
let dijkstra;
let start;
let end;
let startAlgo;
let radio;
let button;
let restart;

//Setup the visualizer
function setup() {
    radio = createRadio();
    radio.option('start');
    radio.option('end');
    radio.option('wall');
    radio.position(700, 200);
    radio.style('width', '60px');
    radio.selected('start'); 
    textAlign(CENTER);

    grid = new Grid();
    startAlgo = false;
    start = null;
    end = null;
    createCanvas(900,640);
    button = createButton('run dijkstra');
    button.position(700, 300);

    //Check to see if there is a start and end node present
    button.mousePressed(()=> {
        if(start == null || end == null) {
            alert("You need a start and end node!");
            if(start == null) {
                radio.selected('start'); 
            } else {
                radio.selected('end');
            }
        } else if(!startAlgo) {
            startAlgo = true;
            dijkstra = new Dijkstra(end);
        }
    });

    //Allow the user to restart the visualization
    restart = createButton('restart');
    restart.position(700, 350);
    restart.mousePressed(()=> {
        startAlgo = false;
        start = null;
        end = null;
        grid = new Grid();
    });
}

//Display the visualization
function draw() {
    if(startAlgo) {
        dijkstra.update();
    }
    grid.show()
}

//Allow the user to interact with the grid
function mouseDragged() {
    for (let i = 0; i < grid.matrix.length; i++) {
        for (let j = 0; j < grid.matrix[i].length; j++) {
            if(!startAlgo && grid.matrix[i][j].inBounds(mouseX, mouseY)) {
                //Create walls
                if(radio.value() == 'wall') {
                    grid.matrix[i][j].status = 'wall';
                } 
                
                //Move around the start node
                else if(radio.value() == 'start') {
                    if(start != null) {
                        start.status = '';
                    }
                    start = grid.matrix[i][j];
                    start.status = 'start';
                } 
                
                //Move around the end node
                else if(radio.value() == 'end') {
                    if(end != null) {
                        end.status = '';
                    }
                    end = grid.matrix[i][j];
                    end.status = 'end';
                } 
            }
        }
    }
}

function mousePressed() {
    for (let i = 0; i < grid.matrix.length; i++) {
        for (let j = 0; j < grid.matrix[i].length; j++) {
            if(!startAlgo && grid.matrix[i][j].inBounds(mouseX, mouseY)) {
                //Create a wall object
                if(radio.value() == 'wall') {
                    grid.matrix[i][j].status = 'wall';
                } 
                
                //Create a start node
                else if(radio.value() == 'start') {
                    if(start != null) {
                        start.status = '';
                    }
                    start = grid.matrix[i][j];
                    start.status = 'start';
                } 
                
                //Create an end node
                else if(radio.value() == 'end') {
                    if(end != null) {
                        end.status = '';
                    }
                    end = grid.matrix[i][j];
                    end.status = 'end';
                } 
            }
        }
    }
}

//Get the neighbors for each node
function getNeighbors() {
    let graph = new Map();
    for(let i = 0; i < grid.matrix.length; i++) {
        for(let j = 0; j < grid.matrix[i].length; j++) {
            let neighbors = new Map();

            //Up, down, left, right have a distance of 1
            if(validate(i-1, j)) {
                neighbors.set(grid.matrix[i-1][j], 1);
            } 
            if(validate(i+1, j)) {
                neighbors.set(grid.matrix[i+1][j], 1);
            }
            if(validate(i, j+1)) {
                neighbors.set(grid.matrix[i][j+1], 1);
            }
            if(validate(i, j-1)) {
                neighbors.set(grid.matrix[i][j-1], 1);
            }

            //Diagonals have a distance of Sqrt(2)
            if(validate(i+1, j+1)) {
                neighbors.set(grid.matrix[i+1][j+1], Math.sqrt(2));
            }
            if(validate(i+1, j-1)) {
                neighbors.set(grid.matrix[i+1][j-1], Math.sqrt(2));
            }
            if(validate(i-1, j-1)) {
                neighbors.set(grid.matrix[i-1][j-1], Math.sqrt(2));
            }  
            if(validate(i-1, j+1)) {
                neighbors.set(grid.matrix[i-1][j+1], Math.sqrt(2));
            }     
            
            graph.set(grid.matrix[i][j], neighbors);
        }
    }
    return graph;
}

//Check if the node object is within the grid bounds
function validate(row, col) {
    return (row >= 0 && row < grid.matrix.length) && (col >= 0 && col < grid.matrix[row].length) && (grid.matrix[row][col].status != 'wall');
}

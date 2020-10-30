class Dijkstra {
    constructor(end) {
        this.graph = getNeighbors();  //Get the neighbors for each node in the graph

        //Initialize the distances from the start node to each node as infinity
        this.distances = new Map();
        this.graph.forEach((value, node) => {
            this.distances.set(node, Number.MAX_VALUE);
        });

        //Initalize each node's previous node as null
        this.previous = new Map();
        this.previous.forEach((value, node) => {
            this.previous.set(node, null);
        });

        this.distances.set(start, 0); //Set the distance from start node to itself as 0
        this.pq = new PriorityQueue(start); //Create a priority queue for the algorithm
        this.end = end;
    }

    update() {
        //Dijkstra's algorithm
        if(!this.pq.isEmpty()) {
            let node = this.pq.dequeue()[0];
            node.status = 'searched';   
         
            //Loop through each neighbor and update the shortest distance
            this.graph.get(node).forEach((value, neighbor) => {
                neighbor.status = 'searched';
                let newPath = this.distances.get(node) + this.graph.get(node).get(neighbor);    
                if(newPath < this.distances.get(neighbor)) {
                    this.distances.set(neighbor, newPath);
                    neighbor.distance = newPath;
                    this.previous.set(neighbor, node);
                    this.pq.enqueue(neighbor, newPath);
                }
            });
        }
        //There is no path
        else if (this.previous.get(end) == undefined) {
            startAlgo = false;
            alert("No path found!");
        }
        //Reconstruct the shortest path
        else {
            if (this.end != start) {
                this.end.status = 'path';
                this.end = this.previous.get(this.end);
            }
        }
    } 
}
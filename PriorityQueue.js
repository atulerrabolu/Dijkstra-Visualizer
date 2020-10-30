
class PriorityQueue {
    constructor(start) {
        this.heap = new Array([start, 0]);
    }

    //Enqueue a node with its distance into the priority queue
    enqueue(node, distance) {
        let element = [node, distance]
        this.deleteDups(node); //Remove duplicates
        this.heap.push(element);
        let spot = this.heap.length-1;
        while(this.heap[spot][1] < this.heap[this.getParent(spot)][1]) {
            this.swap(spot, this.getParent(spot));
            spot = this.getParent(spot)
        }
    }

    //Dequeue the lowest priority (shortest distance) node from the priority queue
    dequeue() {
        this.swap(0, this.heap.length-1);
        let min = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    //Deletes any duplicate nodes
    deleteDups(node) {
        for(let i = 0; i < this.heap.length; i++) {
            if(this.heap[i][0] == node) {
                this.heap.splice(i,1);
            }
        }
    }
    
    //Places a node in its right location based on its priority (distance)
    bubbleDown(spot) {
        let left = this.getLeft(spot);
        let right = this.getRight(spot);
        let smallest;
        if(left < this.heap.length && this.heap[left][1] < this.heap[spot][1])
            smallest = left;
        else
            smallest = spot;
        if(right < this.heap.length && this.heap[right][1] < this.heap[spot][1])
            smallest = right;
        else
            smallest = spot;

        if(smallest != spot) {
            this.swap(smallest, spot);
            this.bubbleDown(smallest);
        }
    }

    //Swaps 2 nodes
    swap(a, b) {
        let temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    }

    //Gets the parent node from a child node
    getParent(spot) {
        return Math.floor(spot/2);
    }

    //Gets the left child from a parent node
    getLeft(spot) {
        return 2*spot;
    }

    //Gets the right child from a parent node
    getRight(spot) {
        return 2*spot+1;
    }

    //Checks to see if the priority queue is empty
    isEmpty() {
        return this.heap.length == 0;
    }
}


export class Life {
    board_current = [];
    board_next = [];
    constructor() {
        for(var x = 0; x < 5; x++) {
            this.board_current[x] = [];
            this.board_next[x] = [];
            for (var y = 0; y < 5; y++) {
                this.board_current[x][y] = 0;
                this.board_next[x][y] = 0;
            }
        }
        this.board_current[0] = [0,0,1,0,0];
        this.board_current[1] = [1,0,1,0,0];
        this.board_current[2] = [0,1,1,0,0];
        this.board_current[3] = [0,0,0,0,0];
        this.board_current[4] = [0,0,0,0,0];
    }

    async init() {
        console.log("init");
        var current_gen = 0;
        do {
            this.step();
            current_gen += 1;
            this.display(this.board_current, current_gen);
            await this.sleep(5000);
        } while(1)
    }

    sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    display(board, current_generation) {
        console.log(`printing board with gen: ${current_generation}`);
        for(var x = 0 ; x < board.length; x++) {
            console.log(board[x]);
        }
    }

    step() {
        // advances the simulation by 1 tick
        // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
        for(var x = 0; x < this.board_current.length; x++) {
            for(var y = 0; y < this.board_current[x].length; y++) {
                var neighborsAlive = this.countNeighbors(this.board_current, x, y);
                var futureCellIsAlive = false; // all other cells die
                futureCellIsAlive |= (this.board_current[x][y] && (neighborsAlive == 2 || neighborsAlive == 3)); // current living cell stays alive if it has exactly 2 or 3 neighbors
                futureCellIsAlive |= (!this.board_current[x][y] && neighborsAlive == 3); // current dead cell resurrects if it has exactly 3 neighbors
                this.board_next[x][y] = futureCellIsAlive;
            }
        }

        // swap boards
        var temp = this.board_current;
        this.board_current = this.board_next;
        this.board_next = temp;
    }

    countNeighbors(board, x, y) {
        var max_width = board.length - 1;
        var max_height = board[x].length - 1;
        var neighborCount = 0;
        neighborCount += (x > 0) && board[x - 1][y]; // left
        neighborCount += (x > 0 && y > 0) && board[x - 1][y - 1]; // top left
        neighborCount += (y > 0) && board[x][y - 1]; // top
        neighborCount += (y > 0 && x < max_width) && board[x + 1][y - 1]; // top right
        neighborCount += (x < max_width) && board[x + 1][y]; // right
        neighborCount += (y < max_height && x < max_width) && board[x + 1][y + 1]; // bottom right
        neighborCount += (y < max_height) && board[x][y + 1]; // bottom
        neighborCount += (y < max_height && x > 0) && board[x - 1][y + 1]; // bottom left
        return neighborCount;
    }
}
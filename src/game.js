export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playfield = this.createPlayfield(); //taxtak
    activePiece = {//aktiv el 2-rd 3-rd tarberakner
        x: 0,
        y: 0,
        get blocks() {
            return this.rotations[this.rotationIndex];
        },
        blocks: [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],
    };

    /*1-in tarberak get-i toxn el ka
    activePiece = {//aktiv el
        x: 0,
        y: 0,
        get blocks() {
            return this.rotations[this.rotationIndex];
        },
        rotationIndex: 0,
        rotations: [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],
        [
            [0,1,0],
            [0,1,1],
            [0,1,0]
        ],
        [
            [0,0,0],
            [1,1,1],
            [0,1,0]
        ],
        [
            [0,1,0],
            [1,1,0],
            [0,1,0]
        ],
    };
    */

    getState() {
        const playfield = this.createPlayfield();
        const {y: pieceY, x: pieceX, blocks } = this.activePiece;

        for (let y = 0; y < this.playfield.length; y++) {
            playfield[y] = [];

            for (let x = 0; x < this.playfield[y].length; x++) {
                playfield[y][x] = this.playfield[y][x];
            }
        }  

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playfield[pieceY + y][pieceX +x] = blocks[y][x];
                }
            }
        }

        return {
            playfield
        };
    }

    createPlayfield() {
        const playfield = [];

        for (let y = 0; y < 20; y++) {
            playfield[y] = [];

            for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0;
            }
        } 
        return playfield; 
    }

    movePieceLeft() {//dzax gna
        this.activePiece.x -= 1;

        if (this.hasCollision()) {
            this.activePiece.x += 1;
        }
    }

    movePieceRight() {//aj gna
        this.activePiece.x += 1;

        if (this.hasCollision()) {
            this.activePiece.x -= 1;
        }
    }

    movePieceDown() {//ijni nerqev
        this.activePiece.y += 1;

        if (this.hasCollision()) {
            this.activePiece.y -= 1;
        }
    }

    rotatePiece() { // el-@ shrjeci
        this.rotateBlocks();

        if (this.hasCollision()) {
            this.rotateBlocks(false);
        }
    }

    rotateBlocks(clockwise = true) { //jamslaqi uxxutyamb ptti
        const blocks = this.activePiece.blocks;
        const length = blocks.length;
        const x = Math.floor(length / 2);
        const y = length -1;

        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                const temp = blocks[i][j];

                if (clockwise) {
                    blocks[i][j] = blocks[y - j][i];
                    blocks[y - j][i] = blocks[y - i][y - j];
                    blocks[y - i][y - j] = blocks[j][y - i];
                    blocks[j][y - i] = temp;
                } else {
                    blocks[i][j] = blocks[j][y - i];
                    blocks[j][y - i] = blocks[y - i][y - j];
                    blocks[y - i][y - j] = blocks[y - j][i];
                    blocks[y - j][i] = temp;
                }
            }
        }
    }      

    /*1-in tarberak
    rotatePiece() {
        this.activePiece.rotationIndex = this.activePiece.rotationIndex < 3 ? this.activePiece.rotationIndex + 1 : 0; // 3-rd ptuytic heto 1-inin ancni
        
        if (this.hasCollision()) {
            this.activePiece.rotationIndex = this.activePiece.rotationIndex > 0 ? this.activePiece.rotationIndex - 1 : 3;
        }

        return this.activePiece.blocks;
    }
    /*
       this.activePiece.rotationIndex = (this.activePiece.rotationIndex + 1) % 4;
       kam` if (this.activePiece.rotationIndex === 3) {
            this.activePiece.rotationIndex = 0;
        } else {
            this.activePiece.rotationIndex += 1;
        } 
        kam` 1-in toxi grac@
    */

    /* 2-rd tarberak
    rotatePiece() {
        const blocks = this.activePiece.blocks;
        const length = blocks.length;

        const temp = []; //shrjvac el
        for (let i = 0; i < length; i++) {
            temp[i] = new Array(length).fill(0);
        }

        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                temp[x][y] = blocks[length - 1 - y][x];//
            }
        }
         this.activePiece.blocks = temp;

         if (this.hasCollision()) { /* hima hakarak uxxutyamb pttenq, ete hpum ka -> veradarnanq naxkin dirqin
             this.activePiece.blocks = blocks; 
         }
    }
    */

    hasCollision() {// voreve tex taxtaki sahmannerin kam ayl el-i kpnum e el-@? ->true or false 
        const {y: pieceY, x: pieceX, blocks } = this.activePiece; // destructuring

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; y++) {
                if (
                    blocks[y][x] && //!== 0 or === 1 taki 0-neri toxy ijecri taxtakic nerqev 
                    ((this.playfield[pieceY +y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) || // taxtaki sahmannerum e el?
                    this.playfield[pieceY + y][pieceX + x]) // tex@ azat e nor el-i hmr?
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    lockPiece() {
        const {y: pieceY, x: pieceX, blocks } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; y++) {
                if (blocks[y][x]) {
                    this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
                }
            }
        }
    }
}


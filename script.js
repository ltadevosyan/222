import Game from './src/game.js';
import View from './src/view.js';

const root = document.querySelector('#root');

const game = new Game();
const view = new View(root, 320, 640, 20, 10);

window.game = game;
window.view = view;

document.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 37: // left
            game.movePieceLeft();
            view.render(game.getState());
            break;
        case 38: //up
            game.rotatePiece();
            view.render(game.getState());
            break;
        case 39: //right
            game.rotatePieceRight();
            view.render(game.getState());
            break;
        case 40: //down
            game.rotatePieceDown();
            view.render(game.getState());
            break;
    }
})

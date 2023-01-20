export default class GamePlay {
  constructor() {
    this.boardSize = 3;
    this.container = null;
    this.boardEl = null;
    this.cellIndex = null;
    this.cells = [];
    this.cellClickListeners = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUi() {
    this.container.innerHTML = `
      <div class="controls">
      <button class="start-game">New game</button>
      <div class="game-over hidden">GameOver</div>
      <div class="pointsContainer">
            <div class="point">0</div>
            <div class="losePoint">0</div>
        </div>
      </div>
      <div class="board-container cursor">
        <div data-id="board" class="board"></div>
      </div>
    `;
    this.startBtn = this.container.querySelector('.start-game');
    this.point = this.container.querySelector('.point');
    this.losePoint = this.container.querySelector('.losePoint');
    this.boardEl = this.container.querySelector('[data-id=board]');
    this.gameOver = this.container.querySelector('.game-over');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      this.boardEl.appendChild(cellEl);
      cellEl.addEventListener('click', (event) => this.onCellClick(event));
    }
    this.cells = Array.from(this.boardEl.children);
  }

  moveToRandomCell(arrLength) {
    const getRandom = () => {
      const i = Math.floor(Math.random() * arrLength);
      if (i === this.cellIndex && this.cellIndex !== undefined) {
        getRandom();
      } else {
        this.cellIndex = i;
      }
    };
    getRandom();
    if (this.currentCell) { this.currentCell.classList.remove('goblin'); }
    this.currentCell = this.cells[this.cellIndex];
    this.currentCell.classList.add('goblin');
    // console.log(new Date())
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(null, index));
  }
}

/* eslint-disable no-shadow */
import Interval from './Interval';

export default class GameControll {
  constructor(gameplay) {
    this.gameplay = gameplay;
  }

  init(container) {
    this.gameplay.bindToDOM(container);
    this.gameplay.drawUi();
    this.interval = new Interval();

    this.gameplay.startBtn.addEventListener('click', () => {
      if (this.gameplay.currentCell) { this.gameplay.currentCell.classList.remove('goblin'); }
      this.gameplay.gameOver.classList.add('hidden');
      this.losePoint = 0;
      this.point = 0;
      this.gameplay.point.textContent = 0;
      this.gameplay.losePoint.textContent = 0;
      this.interval.clear();

      const startTimer = new Promise((resolve) => {
        const a = [3, 2, 1];
        let d = null;
        for (let i = 0; i <= a.length; i += 1) {
          if (i === 3) {
            d = new Promise((resolve) => {
              setTimeout(() => {
                this.gameplay.cells[4].textContent = a[i];
                resolve();
              }, i * 1000);
            });
          } else {
            setTimeout(() => {
              this.gameplay.cells[4].textContent = a[i];
            }, i * 1000);
          }
        }
        d.then(() => resolve());
      });

      startTimer.then(() => {
        this.gameplay.cells[4].textContent = '';
        this.gameplay.moveToRandomCell(this.gameplay.cells.length);
        this.interval.intervalInit(this.gameplay, this);
        this.gameplay.addCellClickListener((i) => {
          if (this.gameplay.cellIndex === i) {
            this.interval.clear();
            this.gameplay.moveToRandomCell(this.gameplay.cells.length);
            this.interval.intervalInit(this.gameplay, this);
            this.point += 1;
            this.gameplay.point.textContent = this.point;
          }
        });
      });
    });
  }
}

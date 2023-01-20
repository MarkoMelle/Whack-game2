export default class Interval {
  intervalInit(gamePlay, gameControll) {
    this.gamePlay = gamePlay;
    this.gameControll = gameControll;
    this.interval = setInterval(() => {
      this.gamePlay.moveToRandomCell(this.gamePlay.cells.length);
      this.gameControll.losePoint += 1;
      if (this.gameControll.losePoint >= 5) {
        this.gamePlay.gameOver.classList.remove('hidden');
        clearInterval(this.interval);
        this.gamePlay.cellClickListeners = [];
      }
      this.gamePlay.losePoint.textContent = this.gameControll.losePoint;
    }, 1000);
  }

  clear() {
    clearInterval(this.interval);
  }
}

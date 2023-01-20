export default class Interval {
   constructor() {

   }

   intervalInit(gamePlay,gameControll) {
      this.gamePlay = gamePlay
      this.gameControll = gameControll;
      setInterval(() => {
         this.gameplay.moveToRandomCell(this.gameplay.cells.length);
         this.gameControll.losePoint += 1
         if (this.gameControll.losePoint >= 5) {
            this.gameplay.gameOver.classList.remove('hidden')
            clearInterval(this.gameControll.interval);
            this.gameplay.cellClickListeners = []
         }
         this.gameplay.losePoint.textContent = this.losePoint;
      }, 1000);
   }
}
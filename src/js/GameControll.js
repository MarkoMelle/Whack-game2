
export default class GameControll {
   constructor(gameplay) {
      this.gameplay = gameplay;
   }

   init(container) {
      this.gameplay.bindToDOM(container);
      this.gameplay.drawUi();

      this.gameplay.startBtn.addEventListener('click', (e) => {
         this.gameplay.gameOver.classList.add('hidden')
         this.losePoint = 0;
         this.point = 0;
         this.gameplay.point.textContent = 0;
         this.gameplay.losePoint.textContent = 0;
         this.gameplay.moveToRandomCell(this.gameplay.cells.length);
         clearInterval(this.interval);
         this.interval = setInterval(() => {
            this.gameplay.moveToRandomCell(this.gameplay.cells.length);
            this.losePoint += 1
            if (this.losePoint >= 5) {
               this.gameplay.gameOver.classList.remove('hidden')
               clearInterval(this.interval);
               this.gameplay.cellClickListeners = []
            }
            this.gameplay.losePoint.textContent = this.losePoint;
         }, 1000);
         this.gameplay.addCellClickListener((i) => {
            if (this.gameplay.cellIndex === i) {
               clearInterval(this.interval);
               this.gameplay.moveToRandomCell(this.gameplay.cells.length);
               this.interval = setInterval(() => {
                  this.gameplay.moveToRandomCell(this.gameplay.cells.length);
                  this.losePoint += 1
                  if (this.losePoint >= 5) {
                     this.gameplay.gameOver.classList.remove('hidden')
                     clearInterval(this.interval);
                     this.gameplay.cellClickListeners = []
                  }
                  this.gameplay.losePoint.textContent = this.losePoint;
               }, 1000);
               this.point += 1;
               this.gameplay.point.textContent = this.point;
            }
         })
      })
   }
}
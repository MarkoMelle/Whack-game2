import GamePlay from './GamePlay';
import GameControll from './GameControll';

document.addEventListener('DOMContentLoaded', () => {
  const gamePlay = new GamePlay();
  const gameControll = new GameControll(gamePlay);
  gameControll.init(document.querySelector('#game-container'));
});

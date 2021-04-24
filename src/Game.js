const MILLISECOND_PER_SECOND = 1000;

class Game {
  constructor(ctx) {
    console.log('Game constructed');

    this.width = 200;
    this.height = 150;
    this.ctx = ctx;

    this.updatePerSecond = 30;
    this.drawPerSecond = 30;
    this._updateDelay = MILLISECOND_PER_SECOND / this.updatePerSecond;
    this._drawDelay = MILLISECOND_PER_SECOND / this.drawPerSecond;


    this.inputManager = new Input();

    // Gameplay
    this.player = new Player([50, 50]);
  }

  onResize = (width, height) => {
    console.log('Game resize', width, height);
    this.viewPortWidth = width;
    this.viewPortHeight = height;
  };

  update = () => {
    this.player.update(this.inputManager);
    this.inputManager.newFrame();
  };

  draw = () => {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, 200, 150);
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(10, 10, 180, 130);


    this.player.draw(this.ctx);
  };

  run = () => {
    this._updateInterval = window.setInterval(this.update, this._updateDelay);
    this._drawInterval = window.setInterval(this.draw, this._drawDelay);
  };

  stop = () => {
    if (this._updateInterval !== null) {
      window.clearInterval(this._updateInterval);
    }
    if (this._drawInterval !== null) {
      window.clearInterval(this._drawInterval);
    }
  };
}
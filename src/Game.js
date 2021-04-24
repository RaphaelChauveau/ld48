const MILLISECOND_PER_SECOND = 1000;

class Game {
  constructor(ctx) {
    console.log('Game constructed');

    this.width = 800;
    this.height = 600;
    this.ctx = ctx;

    this.updatePerSecond = 30;
    this.drawPerSecond = 15;
    this._updateDelay = MILLISECOND_PER_SECOND / this.updatePerSecond;
    this._drawDelay = MILLISECOND_PER_SECOND / this.drawPerSecond;
  }

  onResize = (width, height) => {
    console.log('Game resize', width, height);
    this.viewPortWidth = width;
    this.viewPortHeight = height;
  };

  update = () => {
    // console.log('update');
  };

  draw = () => {
    // console.log('draw');
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, 800, 600);
    this.ctx.strokeStyle = 'red';
    this.ctx.strokeRect(10, 10, 780, 580);
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
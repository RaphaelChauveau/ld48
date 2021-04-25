const MILLISECOND_PER_SECOND = 1000;

class Game {
  constructor(ctx) {
    console.log('Game constructed');

    this.heartSpriteSheet = new Image();
    this.heartSpriteSheet.src = "res/heart.png";

    this.width = 200;
    this.height = 150;
    this.ctx = ctx;

    this.updatePerSecond = 60;
    this.drawPerSecond = 60;
    this._updateDelay = MILLISECOND_PER_SECOND / this.updatePerSecond;
    this._drawDelay = MILLISECOND_PER_SECOND / this.drawPerSecond;


    this.inputManager = new Input();

    // Gameplay

    this.player = new Player([50, 50]);
    this.mobs = [
      new Mob([150, 50]),
      new Mob([120, 90]),
    ];
    this.projectiles = [];
    this.entities = [
      ...this.mobs,
      ...this.projectiles,
      this.player,
    ];
    this.map = new Map();
  }

  onResize = (width, height) => {
    console.log('Game resize', width, height);
    this.viewPortWidth = width;
    this.viewPortHeight = height;
  };

  update = () => {
    this.player.update(this);
    for (const mob of this.mobs) {
      mob.update(this, this.map, this.player);
    }
    for (const projectile of this.projectiles) {
      projectile.update(this);
    }
    this.inputManager.newFrame();
  };

  draw = () => {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, 200, 150);

    this.map.draw(this.ctx);

    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(5.5, 5.5, 190, 140); // XXX why tf do I need .5 ? U.u

    this.entities.sort((a, b) => (a.position[1] - b.position[1]));

    for (const entity of this.entities) {
      entity.draw(this.ctx);
    }

    for (let i = 0; i < this.player.maxHp; i += 1) {
      if (this.player.hp > i) {
        this.ctx.drawImage(this.heartSpriteSheet, 0, 0, 14, 12, 3 + i * 15, 3, 14, 12);
      } else {
        this.ctx.drawImage(this.heartSpriteSheet, 14, 0, 14, 12, 3 + i * 15, 3, 14, 12);
      }
    }
    //this.mob.draw(this.ctx);
    //this.player.draw(this.ctx);
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

  addProjectile = (projectile) => {
    this.entities.push(projectile);
    this.projectiles.push(projectile);
  };

  removeProjectile = (projectile) => {
    this.entities = this.entities.filter((p) => p !== projectile);
    this.projectiles = this.projectiles.filter((p) => p !== projectile);
  };

  removeMob = (mob) => {
    this.entities = this.entities.filter((m) => m !== mob);
    this.mobs = this.mobs.filter((m) => m !== mob);
    // TODO no more mobs ?
  };
}
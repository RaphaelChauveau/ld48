class Fireball {
  constructor(position, direction, stasis=0, damage=1) {
    this.spriteSheet = new Image();
    this.spriteSheet.src = 'res/fireball.png';

    this.animationCounter = 0;

    this.position = position;
    this.direction = direction;
    this.stasis = stasis;
    this.damage = damage;

    this.hitBox = new Rect(0, 0, 4, 4);

    if (Math.abs(this.direction[0]) < Math.abs(this.direction[1])) {
      if (this.direction[1] > 0) {
        this.orientation = DIRECTION.DOWN;
      } else {
        this.orientation = DIRECTION.UP;
      }
    } else {
      if (this.direction[0] > 0) {
        this.orientation = DIRECTION.RIGHT;
      } else {
        this.orientation = DIRECTION.LEFT;
      }
    }

    this.updateHitBox();
  }

  updateHitBox = () => {
    this.hitBox.x = this.position[0] - 2;
    this.hitBox.y = this.position[1] - 2;
  };

  update = (game) => {
    if (this.animationCounter > this.stasis) {
      this.position[0] += this.direction[0];
      this.position[1] += this.direction[1];
    }
    this.updateHitBox();

    const player = game.player;
    if (this.hitBox.intersectsRect(player.hitBox)) {
      console.log('HIT');
      player.hurt(game, this.damage);
      game.removeProjectile(this);
    }

    if (this.animationCounter > 600) {
      game.removeProjectile(this);
    }

    this.animationCounter += 1;
  };

  draw = (ctx) => {
    const spriteSize = 16;
    let line;
    switch (this.orientation) {
      case DIRECTION.DOWN: {
        line = 0;
        break
      }
      case DIRECTION.UP: {
        line = 1;
        break
      }
      case DIRECTION.RIGHT: {
        line = 2;
        break
      }
      case DIRECTION.LEFT: {
        line = 3;
        break
      }
    }
    const nbFrames = 2;
    const column = Math.floor(this.animationCounter / 8) % (nbFrames);
    ctx.drawImage(this.spriteSheet,
      column * spriteSize, line * spriteSize, spriteSize, spriteSize,
      this.position[0] - spriteSize / 2 + 1, this.position[1] - spriteSize / 2, spriteSize, spriteSize);
    // ctx.strokeRect(this.hitBox.x + 0.5, this.hitBox.y + 0.5, this.hitBox.w, this.hitBox.h);
  };
}
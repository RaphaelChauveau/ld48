class Mob {
  constructor(position) {
    this.spriteSheet = new Image();
    this.spriteSheet.src = "res/eye_idle.png";


    this.animationCounter = 0;
    this.collisionBox = new Rect(0, 0, 11, 11);

    this.state = PLAYER_STATE.IDLE;
    this.direction = DIRECTION.DOWN;
    this.speed = 1;
    this.position = position;
    this.updateCollisionBox();
  }

  updateCollisionBox = () => {
    this.collisionBox.x = this.position[0] - 5;
    this.collisionBox.y = this.position[1] + 1;
  };

  update = (game, map, player) => {

    const toPlayer = [
      player.position[0] - this.position[0],
      player.position[1] - this.position[1],
    ];

    if (Math.abs(toPlayer[0]) < Math.abs(toPlayer[1])) {
      if (toPlayer[1] > 0) {
        this.direction = DIRECTION.DOWN;
      } else {
        this.direction = DIRECTION.UP;
      }
    } else {
      if (toPlayer[0] > 0) {
        this.direction = DIRECTION.RIGHT;
      } else {
        this.direction = DIRECTION.LEFT;
      }
    }

    let velocity = [0, 0];


    const distToPlayer = vectorLength(toPlayer);

    if (this.state === PLAYER_STATE.IDLE ||
        this.state === PLAYER_STATE.WALK) {
      // TODO if in reach => attack

      // TODO IA STUFF
      if (distToPlayer > 80) {
        velocity = DIRECTION_VECTOR[this.direction];
      } else {
        console.log('FIRE');
        this.attackedAt = this.animationCounter;
        this.state = PLAYER_STATE.ATTACKING;
        const unit = getUnitVector(toPlayer);
        game.addProjectile(new Fireball(
          [this.position[0], this.position[1]],
          unit, 30))
      }
    } else if (this.state === PLAYER_STATE.ATTACKING) {
      if (this.animationCounter - this.attackedAt > 60 * 3) {
        this.state = PLAYER_STATE.IDLE;
      }
    }


    if (!map.collideWithRect(new Rect(
      this.collisionBox.x + velocity[0] * this.speed,
      this.collisionBox.y + velocity[1] * this.speed,
      this.collisionBox.w, this.collisionBox.h
    ))) {
      this.position[0] += velocity[0] * this.speed;
      this.position[1] += velocity[1] * this.speed;
      this.updateCollisionBox();
    }

    this.animationCounter += 1;
  };

  draw = (ctx) => {
    let line;

    switch (this.direction) {
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

    let spriteSize = 32;
    let column = 0;
    let spriteSheet;
    switch (this.state) {
      case PLAYER_STATE.ATTACKING:
      case PLAYER_STATE.IDLE: {
        spriteSheet = this.spriteSheet;
        spriteSize = 32;
        const nbFrames = 4;
        column = Math.floor(this.animationCounter / 20) % (nbFrames);
        break;
      }
    }

    ctx.drawImage(spriteSheet,
      column * spriteSize, line * spriteSize, spriteSize, spriteSize,
      this.position[0] - spriteSize / 2 + 1, this.position[1] - spriteSize / 2, spriteSize, spriteSize);

    this.collisionBox.draw(ctx, 'blue');
    ctx.strokeRect(this.position[0] + 0.5, this.position[1] + 0.5, 0.25, 0.25)
  };
}
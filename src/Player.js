const PLAYER_STATE = {
  IDLE: 'IDLE',
  WALK: 'WALK',
};

class Player {
  constructor(position) {
    this.idleSpriteSheet = new Image();
    this.idleSpriteSheet.src = "res/mickael_idle.png";
    this.walkSpriteSheet = new Image();
    this.walkSpriteSheet.src = "res/mickael_walk.png";

    this.inputPriority = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp',
      'ArrowDown', 'ArrowLeft', 'ArrowRight'];

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

  update = (inputManager, map) => {

    let velocity = [0, 0];
    if (this.state === PLAYER_STATE.IDLE ||
        this.state === PLAYER_STATE.WALK) {

      // TODO check for attack first

      for (const inputKey of this.inputPriority) {
         if (inputManager.getKeyDown(inputKey)) {
           const index = this.inputPriority.indexOf(inputKey);
           this.inputPriority.splice(index, 1);
           this.inputPriority.unshift(inputKey);
         }
      }

      this.state = PLAYER_STATE.IDLE;
      for (const inputKey of this.inputPriority) {
        if (inputManager.getKey(inputKey)) {
          switch (inputKey) {
            case 'KeyW':
            case 'ArrowUp': {
              this.state = PLAYER_STATE.WALK;
              this.direction = DIRECTION.UP;
              velocity = [0, -1];
              break;
            }
            case 'KeyS':
            case 'ArrowDown': {
              this.state = PLAYER_STATE.WALK;
              this.direction = DIRECTION.DOWN;
              velocity = [0, 1];
              break;
            }
            case 'KeyA':
            case 'ArrowLeft': {
              this.state = PLAYER_STATE.WALK;
              this.direction = DIRECTION.LEFT;
              velocity = [-1, 0];
              break;
            }
            case 'KeyD':
            case 'ArrowRight': {
              this.state = PLAYER_STATE.WALK;
              this.direction = DIRECTION.RIGHT;
              velocity = [1, 0];
              break;
            }
          }
          break;
        }
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
    // ctx.drawImage(this.idleSpriteSheet, 50, 50);
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
      case PLAYER_STATE.IDLE: {
        spriteSheet = this.idleSpriteSheet;
        spriteSize = 32;
        const nbFrames = 4;
        column = Math.floor(this.animationCounter / 20) % (nbFrames);
        break;
      } case PLAYER_STATE.WALK: {
        spriteSheet = this.walkSpriteSheet;
        spriteSize = 32;
        const nbFrames = 4;
        column = Math.floor(this.animationCounter / 8) % (nbFrames);
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
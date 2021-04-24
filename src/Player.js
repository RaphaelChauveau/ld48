const PLAYER_STATE = {
  IDLE: 'IDLE',
  WALK: 'WALK',
};

class Player {
  constructor(position) {
    this.idleSpriteSheet = new Image();
    this.idleSpriteSheet.src = "res/mickael_idle.png";

    this.inputPriority = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp',
      'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    this.animationCounter = 0;

    this.state = PLAYER_STATE.IDLE;
    this.direction = DIRECTION.DOWN;
    this.speed = 1;
    this.velocity = [0, 0];
    this.position = position;
  }

  update = (inputManager) => {

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

      this.velocity = [0, 0];
      this.state = PLAYER_STATE.IDLE;
      for (const inputKey of this.inputPriority) {
        if (inputManager.getKey(inputKey)) {
          switch (inputKey) {
            case 'KeyW':
            case 'ArrowUp': {
              this.state = PLAYER_STATE.WALK;
              this.direction = DIRECTION.UP;
              this.velocity = [0, -1];
              break;
            }
            case 'KeyS':
            case 'ArrowDown': {
              this.state = PLAYER_STATE.WALK;
              this.direction = DIRECTION.DOWN;
              this.velocity = [0, 1];
              break;
            }
            case 'KeyA':
            case 'ArrowLeft': {
              this.state = PLAYER_STATE.WALK;
              this.direction = DIRECTION.LEFT;
              this.velocity = [-1, 0];
              break;
            }
            case 'KeyD':
            case 'ArrowRight': {
              this.state = PLAYER_STATE.WALK;
              this.direction = DIRECTION.RIGHT;
              this.velocity = [1, 0];
              break;
            }
          }
          break;
        }
      }
    }

    this.position[0] += this.velocity[0] * this.speed;
    this.position[1] += this.velocity[1] * this.speed;

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
    switch (this.state) {
      case PLAYER_STATE.IDLE: {
        spriteSize = 32;
        const nbFrames = 4;
        column = Math.floor(this.animationCounter / 20) % (nbFrames);
        break;
      } case PLAYER_STATE.WALK: {
        spriteSize = 32;
        column = 0;
        break;
      }

    }

    ctx.drawImage(this.idleSpriteSheet,
      column * spriteSize, line * spriteSize, spriteSize, spriteSize,
      this.position[0], this.position[1], spriteSize, spriteSize);
  };
}
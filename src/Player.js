class Player {
  constructor(props) {
    this.idleSpriteSheet = new Image();
    this.idleSpriteSheet.src = "res/mickael_idle.png";

    this.state = "IDLE";
    this.direction = DIRECTION.DOWN;
    this.animationCounter = 0;
  }

  update = (inputManager) => {
    if (inputManager.getKey('KeyW')) {
      this.direction = DIRECTION.UP;
    }
    if (inputManager.getKey('KeyS')) {
       this.direction = DIRECTION.DOWN;
    }
    if (inputManager.getKey('KeyA')) {
       this.direction = DIRECTION.LEFT;
    }
    if (inputManager.getKey('KeyD')) {
       this.direction = DIRECTION.RIGHT;
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

    // IDLE
    const spriteSize = 32;
    const nbFrames = 4;
    const column = Math.floor(this.animationCounter / 10) % (nbFrames);

    ctx.drawImage(this.idleSpriteSheet,
      column * spriteSize, line * spriteSize, spriteSize, spriteSize,
      50, 50, spriteSize, spriteSize);
  };
}
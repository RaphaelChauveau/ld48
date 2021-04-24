class Player {
  constructor(props) {
    this.idleSpriteSheet = new Image();
    this.idleSpriteSheet.src = "res/mickael_idle.png";

    this.state = "IDLE";
    this.direction = DIRECTION.DOWN;
    this.animationCounter = 0;
  }

  update = () => {
    this.animationCounter += 1;
  };

  draw = (ctx) => {
    // ctx.drawImage(this.idleSpriteSheet, 50, 50);
    let line;
    let column = 0;
    let flip = 1;

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
        line = 2;
        flip = -1;
        break
      }
    }
    const nbFrames = 4;

    column = Math.floor(this.animationCounter / 10) % (nbFrames);

    const spriteSize = 32;
    ctx.drawImage(this.idleSpriteSheet,
      column * spriteSize, line * spriteSize, spriteSize, spriteSize,
      50, 50, spriteSize, spriteSize);
  };
}
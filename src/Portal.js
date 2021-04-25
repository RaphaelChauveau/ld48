class Portal {
  constructor(position, activated=false) {
    this.image = new Image();
    this.image.src = "res/portal.png";
    this.position = position;
    this.activated = activated;
    this.hitBox = new Rect(this.position[0] - 15, this.position[1] - 10, 30, 21)
  }

  update = (game) => {
    if (this.activated) {
      if (this.hitBox.intersectsRect(game.player.hitBox)) {
        game.nextLevel();
      }
    }
  };

  draw = (ctx) => {
    if (this.activated) {
      ctx.drawImage(this.image, this.hitBox.x, this.hitBox.y);
    }
  };
}

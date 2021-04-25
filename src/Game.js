const MILLISECOND_PER_SECOND = 1000;

const GAME_STATE = {
  INTRO: "INTRO",
  PLAYING: "PLAYING",
  DEAD: "DEAD",
  VICTORY: "VICTORY",
};

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

    this.state = GAME_STATE.INTRO
  }
  
  levels = {
    1: () => {
      this.level = 1;
      this.player = new Player([6*16, 2*16]);
      this.mobs = [];
      this.portal = new Portal([5 * 16, 6 * 16], true);
      this.entities = [
        ...this.mobs,
        ...this.projectiles,
        this.player,
      ];
      this.map = new Map([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    },
    2: () => {
      this.level = 2;
      this.player = this.player || new Player([2*16, 4*16]);
      this.player.position = [2*16, 4*16];
      this.mobs = [
        new Mob([11 * 16, 4 * 16]),
      ];
      this.portal = new Portal([11 * 16, 4 * 16]);
      this.entities = [
        ...this.mobs,
        ...this.projectiles,
        this.player,
      ];
      this.map = new Map([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    },
    3: () => {
      this.level = 3;
      this.player = this.player || new Player([2*16, 5*16]);
      this.player.position = [2*16, 5*16];
      this.mobs = [
        new Mob([13 * 16, 3 * 16]),
        new Mob([13 * 16, 8 * 16]),
      ];
      this.portal = new Portal([17 * 16, 5 * 16]);
      this.entities = [
        ...this.mobs,
        ...this.projectiles,
        this.player,
      ];
      this.map = new Map([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    },
    4: () => {
      this.level = 4;
      this.player = this.player || new Player([2*16, 5*16]);
      this.player.position = [2*16, 5*16];
      this.mobs = [
        new Mob([13 * 16, 4 * 16]),
        new Mob([5 * 16, 10 * 16]),
      ];
      this.portal = new Portal([17 * 16, 5 * 16]);
      this.entities = [
        ...this.mobs,
        ...this.projectiles,
        this.player,
      ];
      this.map = new Map([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    },
    5: () => {
      this.level = 5;
      this.player = this.player || new Player([2*16, 5*16]);
      this.player.position = [2*16, 5*16];
      this.mobs = [
        new Mob([5 * 16, 2 * 16]),
        new Mob([5 * 16, 10 * 16]),
        new Mob([10 * 16, 2 * 16]),
        new Mob([10 * 16, 10 * 16]),
      ];
      this.portal = new Portal([17 * 16, 5 * 16]);
      this.entities = [
        ...this.mobs,
        ...this.projectiles,
        this.player,
      ];
      this.map = new Map([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    },
    6: () => {
      this.level = 6;
      this.player = this.player || new Player([2*16, 5*16]);
      this.player.position = [2*16, 5*16];
      this.mobs = [
        new Mob([5 * 16, 2 * 16]),
        new Mob([5 * 16, 11 * 16]),
        new Mob([10 * 16, 2 * 16]),
        new Mob([10 * 16, 11 * 16]),
        new Mob([16 * 16, 11 * 16]),
      ];
      this.portal = new Portal([16 * 16, 4 * 16]);
      this.entities = [
        ...this.mobs,
        ...this.projectiles,
        this.player,
      ];
      this.map = new Map([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    }
  };

  initLevel = (number) => {
    const initiator = this.levels[number];

    if (initiator) {
      this.state = GAME_STATE.PLAYING;
      this.projectiles = [];
      initiator();
    } else {
      this.state = GAME_STATE.VICTORY;
    }
  };

  update = () => {
    if (this.state === GAME_STATE.INTRO) {
      if (this.inputManager.getKeyDown('Enter')) {
        this.state = GAME_STATE.PLAYING;
        this.initLevel(1);
      }
    }

    if (this.state === GAME_STATE.PLAYING || this.state === GAME_STATE.DEAD ||
        this.state === GAME_STATE.VICTORY) {
      this.player.update(this);
      for (const mob of this.mobs) {
        mob.update(this, this.map, this.player);
      }
      for (const projectile of this.projectiles) {
        projectile.update(this);
      }
      this.portal.update(this);
    }

    if (this.state === GAME_STATE.DEAD || this.state === GAME_STATE.VICTORY) {
      if (this.inputManager.getKeyDown("Enter")) {
        this.initLevel(1);
      }
    }

    this.inputManager.newFrame();
  };

  draw = () => {
    if (this.state === GAME_STATE.INTRO) {
      this.ctx.fillStyle = '#000'; // LAVA COLOR
      this.ctx.fillRect(0, 0, 200, 150);

      this.ctx.font = "10px Arial Black";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Michael, my beloved son...", 100, 20);
      this.ctx.fillText("You shall venture deep into the ", 100, 45);
      this.ctx.fillText("center of the world...", 100, 70);
      this.ctx.fillText("And slain my enemy, Lucifer", 100, 95);

      this.ctx.font = "15px Arial Black";

      this.ctx.fillText("Press Enter", 100, 125);
    }

    if (this.state === GAME_STATE.PLAYING || this.state === GAME_STATE.DEAD ||
        this.state === GAME_STATE.VICTORY) {
      this.ctx.fillStyle = '#E8C170'; // LAVA COLOR
      this.ctx.fillRect(0, 0, 200, 150);

      this.ctx.setTransform(1, 0, 0, 1, -this.player.position[0] + this.width / 2, -this.player.position[1] + this.height / 2);

      this.map.draw(this.ctx);

      this.portal.draw(this.ctx);

      this.entities.sort((a, b) => (a.position[1] - b.position[1]));

      for (const entity of this.entities) {
        entity.draw(this.ctx);
      }

      this.ctx.setTransform(1, 0, 0, 1, 0, 0);

      this.ctx.lineWidth = 1;

      for (let i = 0; i < this.player.maxHp; i += 1) {
        if (this.player.hp > i) {
          this.ctx.drawImage(this.heartSpriteSheet, 0, 0, 14, 12, 3 + i * 15, 3, 14, 12);
        } else {
          this.ctx.drawImage(this.heartSpriteSheet, 14, 0, 14, 12, 3 + i * 15, 3, 14, 12);
        }
      }

      this.ctx.font = "10px Arial Black";
      this.ctx.fillStyle = "white";

      this.ctx.textAlign = "right";

      this.ctx.fillText(`Level -${this.level}`, 200, 12);
    }

    if (this.state === GAME_STATE.DEAD) {
      this.ctx.fillStyle = "red";
      this.ctx.textAlign = "center";
      this.ctx.fillText("You died", 100, 50);
      this.ctx.font = "13px Arial Black";
      this.ctx.fillText("Press Enter...", 100, 115);
    }

    if (this.state === GAME_STATE.VICTORY) {
      this.ctx.fillStyle = "lightblue";
      this.ctx.textAlign = "center";
      this.ctx.font = "20px Arial Black";
      this.ctx.fillText("VICTORY !", 100, 50);
      this.ctx.font = "13px Arial Black";
      this.ctx.fillText("Press Enter...", 100, 115);
    }
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

    if (this.mobs.length === 0) {
      // TODO loot ?
      this.portal.activated = true;
    }
  };

  playerDead = () => {
    this.state = GAME_STATE.DEAD;
  };

  nextLevel = () => {
    this.initLevel(this.level + 1);
  };
}
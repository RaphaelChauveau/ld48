const TILE_SIZE = 16;

const TILE_BY_PATTERN = {
 //CTRBL
  "00000": [0, 0],

  "11111": [1, 2],
  "11110": [0, 2],
  "11101": [1, 3],
  "11100": [0, 3],
  "11011": [2, 2],
  "11010": [3, 2],
  "11001": [2, 3],
  "11000": [3, 3],
  "10111": [1, 1],
  "10110": [0, 1],
  "10101": [1, 4],
  "10100": [0, 4],
  "10011": [2, 1],
  "10010": [3, 1],
  "10001": [2, 4],
  "10000": [3, 4],
};

/*[1, 2]
[0, 4]
[1, 3]
[0, 3]
[2, 2]
[3, 2]
[2, 3]
[3, 3]
[1, 1]
[0, 1]
[1, 4]
[0, 4]
[2, 1]
[3, 1]
[2, 4]
[3, 4]*/

class Map {
  constructor() {
    this.tiles = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];


    const tiles2 = [];
    for (const y in this.tiles) {
      const row = this.tiles[y];
      const copy_row = [];
      tiles2.push(copy_row);
      for (const x in row) {
        //copy_row.push(row[x]);
        copy_row.push(row[x].toString());
      }
    }

    const offsets = [
      [0, -1],  // t
      // [1, -1],  // tr
      [1, 0],   // r
      // [1, 1],   // br
      [0, 1],   // b
      // [-1, 1],  // bl
      [-1, 0],  // l
      // [-1, -1], // tl
    ];
    console.log(tiles2);

    for (const offset of offsets) {
      const offset_x = offset[0];
      const offset_y = offset[1];

      const x_start_diff = offset_x < 0;
      const y_start_diff = offset_y < 0;
      const x_end_diff = offset_x > 0;
      const y_end_diff = offset_y > 0;

      const map_height = this.tiles.length;
      const map_width = this.tiles[0].length;
      for (let y = 0; y < map_height; y += 1) {
        for (let x = 0; x < map_width; x += 1) {
          if (y === 0 && y_start_diff) {
            tiles2[y][x] += '1';
          } else if (y === map_height - 1 && y_end_diff) {
            tiles2[y][x] += '1';
          } else if (x === 0 && x_start_diff) {
            tiles2[y][x] += '1';
          } else if (x === map_width - 1 && x_end_diff) {
            tiles2[y][x] += '1';
          } else {
            tiles2[y][x] += this.tiles[y + offset_y][x + offset_x].toString();
          }
        }
      }
    }

    this.compiled_tiles = tiles2;

    console.log(tiles2);


    this.tileset = new Image();
    this.tileset.src = 'res/lava_tileset.png';
  }

  draw = (ctx) => {
    for (const y in this.tiles) {
      const row = this.tiles[y];
      for (const x in row) {
        const tile = row[x];

        if (tile === 0) {
          const column = (x * y * 11) % 4; // try to be random
          ctx.drawImage(this.tileset, column * 16, 0, 16, 16, x * 16, y * 16, 16, 16);
        } else {
          const tileCoords = TILE_BY_PATTERN[this.compiled_tiles[y][x]];
          ctx.drawImage(this.tileset, tileCoords[0] * 16, tileCoords[1] * 16, 16, 16, x * 16, y * 16, 16, 16);
        }
      }
    }
  };
}
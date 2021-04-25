class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  intersectsRect = (other) => {
    return !(this.x > other.x + other.w
      || this.y > other.y + other.h
      || this.x + this.w < other.x
      || this.y + this.h < other.y);
  };

  intersects = (x, y, w, h) => {
    return !(this.x > x + w
      || this.y > y + h
      || this.x + this.w < x
      || this.y + this.h < y);
  };

  draw = (ctx, color='red') => {
    ctx.strokeStyle = color;
    ctx.strokeRect(this.x + 0.5, this.y + 0.5, this.w-1, this.h-1);
  }
}
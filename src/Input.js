class Input {
  constructor() {
    this._keyStates = {};
    this._justUpdated = {};
    window.addEventListener('keydown', this._handleKeyDown);
    window.addEventListener('keyup', this._handleKeyUp);
  }

  _handleKeyDown = (e) => {
    const keyCode = e.code;
    const wasKeyPressed = this._keyStates[keyCode] || false;
    if (!wasKeyPressed) {
      this._keyStates[keyCode] = true;
      this._justUpdated[keyCode] = true;
      console.log(this._keyStates);
    }
  };

  _handleKeyUp = (e) => {
    const keyCode = e.code;
    const wasKeyPressed = this._keyStates[keyCode] || false;
    if (wasKeyPressed) {
      this._keyStates[keyCode] = false;
      this._justUpdated[keyCode] = false;
      console.log(this._keyStates);
    }
  };

  newFrame = () => {
    this._justUpdated = {};
  };

  clean() {
    // window.removeEventListener('toot', this._handleKeyDown);
  }

  getKey = (keyCode) => {
    return this._keyStates[keyCode] || false;
  };

  getKeyDown = (keyCode) => {
    return this._justUpdated[keyCode] === true;
  };

  getKeyUp = (keyCode) => {
    return this._justUpdated[keyCode] === false;
  };
}

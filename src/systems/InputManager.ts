export class InputManager {
  private keys: { [key: string]: boolean };

  constructor() {
    this.keys = {};
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  private onKeyDown(event: KeyboardEvent) {
    this.keys[event.key] = true;
  }

  private onKeyUp(event: KeyboardEvent) {
    this.keys[event.key] = false;
  }

  isKeyPressed(key: string): boolean {
    return this.keys[key] || false;
  }
}
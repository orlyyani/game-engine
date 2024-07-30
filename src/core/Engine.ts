export class Engine {
  private lastTime: number;
  private deltaTime: number;
  private isRunning: boolean;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private updateFn: (deltaTime: number) => void;
  private renderFn: (ctx: CanvasRenderingContext2D) => void;

  constructor() {
    this.lastTime = 0;
    this.deltaTime = 0;
    this.isRunning = false;
    this.updateFn = () => {};
    this.renderFn = () => {};

    this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
  }

  start(
    updateFn: (deltaTime: number) => void,
    renderFn: (ctx: CanvasRenderingContext2D) => void
  ) {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.updateFn = updateFn;
    this.renderFn = renderFn;
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
  }

  private gameLoop() {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.updateFn(this.deltaTime);
    this.renderFn(this.ctx);

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  update(deltaTime: number) {
    // Update game state (e.g., move entities, check collisions)
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
  
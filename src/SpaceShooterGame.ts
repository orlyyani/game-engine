import { Game } from './core/Game';
import { Scene } from './core/Scene';
import { Entity } from './core/Entity';
import { InputManager } from './systems/InputManager';

class Spaceship extends Entity {
  private input: InputManager;

  constructor(x: number, y: number, inputManager: InputManager) {
    super(x, y, 50, 30);
    this.input = inputManager;
  }

  update(deltaTime: number) {
    if (this.input.isKeyPressed('ArrowLeft')) {
      this.x -= 300 * deltaTime;
    }
    if (this.input.isKeyPressed('ArrowRight')) {
      this.x += 300 * deltaTime;
    }
    this.x = Math.max(0, Math.min(800 - this.width, this.x));

    if (this.input.isKeyPressed(' ')) {
      this.shoot();
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  shoot() {
    const laser = new Laser(this.x + this.width / 2, this.y);
    this.scene?.addEntity(laser);
  }
}

class Laser extends Entity {
  constructor(x: number, y: number) {
    super(x, y, 5, 15);
  }

  update(deltaTime: number) {
    this.y -= 500 * deltaTime;
    if (this.y < 0) {
      this.scene?.removeEntity(this);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Asteroid extends Entity {
  private speed: number;

  constructor(x: number) {
    super(x, 0, 40, 40);
    this.speed = 100 + Math.random() * 100;
  }

  update(deltaTime: number) {
    this.y += this.speed * deltaTime;
    if (this.y > 600) {
      this.scene?.removeEntity(this);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'gray';
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class SpaceShooterGame extends Game {
  private spaceship: Spaceship;
  private asteroids: Asteroid[] = [];
  private score: number = 0;
  private lastAsteroidSpawn: number = 0;

  constructor() {
    super();
    this.spaceship = new Spaceship(375, 550, this.inputManager);
  }

  async init() {
    const gameScene = new Scene();
    gameScene.addEntity(this.spaceship);
    this.changeScene(gameScene);
    return Promise.resolve();
  }

  update(deltaTime: number) {
    super.update(deltaTime);
    this.spawnAsteroids();
    this.checkCollisions();
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 800, 600);
    super.render(ctx);
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${this.score}`, 10, 30);
  }

  private spawnAsteroids() {
    if (Date.now() - this.lastAsteroidSpawn > 1000) {
      const asteroid = new Asteroid(Math.random() * 760);
      this.asteroids.push(asteroid);
      this.currentScene.addEntity(asteroid);
      this.lastAsteroidSpawn = Date.now();
    }
  }

  private checkCollisions() {
    const lasers = this.currentScene.getEntities().filter(e => e instanceof Laser);
    
    for (const asteroid of this.asteroids) {
      for (const laser of lasers) {
        if (this.checkCollision(asteroid, laser)) {
          this.currentScene.removeEntity(asteroid);
          this.currentScene.removeEntity(laser);
          this.asteroids = this.asteroids.filter(a => a !== asteroid);
          this.score += 10;
        }
      }

      if (this.checkCollision(asteroid, this.spaceship)) {
        console.log('Game Over!');
        this.stop();
      }
    }
  }

  private checkCollision(entity1: Entity, entity2: Entity): boolean {
    return (
      entity1.x < entity2.x + entity2.width &&
      entity1.x + entity1.width > entity2.x &&
      entity1.y < entity2.y + entity2.height &&
      entity1.y + entity1.height > entity2.y
    );
  }
}
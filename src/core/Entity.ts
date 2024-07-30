import { Component } from './Component';
import { Scene } from './Scene';

export abstract class Entity {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scene: Scene | null;

  components: Map<string, Component>;

  constructor(x: number, y: number, width: number, height: number) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.scene = null;

    this.components = new Map();
  }

  onCollision(other: Entity): void {
    // Default implementation (can be overridden in subclasses)
  }

  addComponent(component: Component): void {
    this.components.set(component.constructor.name, component);
  }

  getComponent<T extends Component>(componentType: new (...args: any[]) => T): T | undefined {
    return this.components.get(componentType.name) as T;
  }

  update(deltaTime: number): void {
    this.components.forEach(component => component.update(deltaTime));
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.components.forEach(component => component.render(ctx));
  }
}
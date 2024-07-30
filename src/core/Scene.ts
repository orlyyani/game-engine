import { Entity } from './Entity';
import { CollisionSystem } from '../systems/CollisionSystem';

export class Scene {
  private entities: Entity[];

  constructor() {
    this.entities = [];
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  getEntities(): Entity[] {
    return this.entities;
  }


  removeEntity(entity: Entity) {
    this.entities = this.entities.filter(e => e !== entity);
  }

  update(deltaTime: number) {
    this.entities.forEach(entity => entity.update(deltaTime));
    CollisionSystem.handleCollisions(this.entities);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.entities.forEach(entity => entity.render(ctx));
  }
}
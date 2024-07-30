import { Entity } from '../core/Entity';

export class CollisionSystem {
  static checkCollision(entity1: Entity, entity2: Entity): boolean {
    return (
      entity1.x < entity2.x + entity2.width &&
      entity1.x + entity1.width > entity2.x &&
      entity1.y < entity2.y + entity2.height &&
      entity1.y + entity1.height > entity2.y
    );
  }

  static handleCollisions(entities: Entity[]): void {
    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        if (this.checkCollision(entities[i], entities[j])) {
          // Handle collision (e.g., notify entities)
          entities[i].onCollision(entities[j]);
          entities[j].onCollision(entities[i]);
        }
      }
    }
  }
}
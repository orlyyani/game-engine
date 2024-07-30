import { Entity } from "./Entity";

export abstract class Component {
  entity: Entity;

  constructor(entity: Entity) {
      this.entity = entity;
  }

  abstract update(deltaTime: number): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}
import { Engine } from './Engine';
import { Scene } from './Scene';
import { InputManager } from '../systems/InputManager';
import { AssetManager } from '../systems/AssetManager';

/**
 * The base class for creating games.
 * Manages the game loop, scene changes, and provides hooks for initialization and updates.
 */
export abstract class Game {
  /** The game engine instance responsible for running the game loop */
  protected engine: Engine;
  /** The current active scene containing game entities */
  protected currentScene: Scene;
  /** The input manager for handling user input */
  protected inputManager: InputManager;
  /** The asset manager for loading and managing game assets */
  protected assetManager: AssetManager;

  /**
   * Creates a new Game instance.
   * Initializes the engine, scene, input manager, and asset manager.
   */
  constructor() {
    this.engine = new Engine();
    this.currentScene = new Scene();
    this.inputManager = new InputManager();
    this.assetManager = new AssetManager();
  }

  /**
   * Initialize the game. This method should be implemented by subclasses.
   * Use this method to set up initial game state, load assets, and create the first scene.
   * @returns A promise that resolves when initialization is complete
   */
  abstract init(): Promise<void>;

  /**
   * Start the game loop.
   * This method calls the init() method and then starts the game engine.
   */
  start() {
    this.init().then(() => {
      this.engine.start(
        (deltaTime: number) => this.update(deltaTime),
        (ctx: CanvasRenderingContext2D) => this.render(ctx)
      );
    });
  }

  /**
   * Update game logic.
   * This method is called every frame by the game engine.
   * @param deltaTime The time elapsed since the last frame in seconds
   */
  update(deltaTime: number) {
    this.currentScene.update(deltaTime);
  }

  /**
   * Render the game.
   * This method is called every frame by the game engine after the update.
   * @param ctx The canvas rendering context to draw on
   */
  render(ctx: CanvasRenderingContext2D) {
    this.currentScene.render(ctx);
  }

  /**
   * Change the current game scene.
   * @param newScene The new scene to set as the current scene
   */
  changeScene(newScene: Scene) {
    this.currentScene = newScene;
  }

  /**
   * Stop the game loop.
   */
  stop() {
    this.engine.stop();
  }
}
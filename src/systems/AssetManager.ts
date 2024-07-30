export class AssetManager {
  private images: Map<string, HTMLImageElement>;
  private audio: Map<string, HTMLAudioElement>;

  constructor() {
    this.images = new Map();
    this.audio = new Map();
  }

  loadImage(key: string, src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.images.set(key, img);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  getImage(key: string): HTMLImageElement | undefined {
    return this.images.get(key);
  }

  loadAudio(key: string, src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.oncanplaythrough = () => {
        this.audio.set(key, audio);
        resolve();
      };
      audio.onerror = reject;
      audio.src = src;
    });
  }

  getAudio(key: string): HTMLAudioElement | undefined {
    return this.audio.get(key);
  }
}
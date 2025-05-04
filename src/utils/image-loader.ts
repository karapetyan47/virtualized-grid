class ImageLoader {
  private queue: Array<{
    src: string;
    resolve: (value: HTMLImageElement) => void;
    reject: (reason: unknown) => void;
  }> = [];
  private inProgress = 0;
  private maxConcurrent = 4;
  private cache = new Map<string, HTMLImageElement>();

  loadImage(src: string): Promise<HTMLImageElement> {
    if (this.cache.has(src)) {
      return Promise.resolve(this.cache.get(src)!);
    }

    return new Promise((resolve, reject) => {
      this.queue.push({ src, resolve, reject });
      this.processQueue();
    });
  }

  private processQueue() {
    if (this.inProgress >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    const { src, resolve, reject } = this.queue.shift()!;
    this.inProgress++;

    const img = new Image();

    img.onload = () => {
      this.cache.set(src, img);
      this.inProgress--;
      resolve(img);
      this.processQueue();
    };

    img.onerror = (error) => {
      this.inProgress--;
      reject(error);
      this.processQueue();
    };

    img.src = src;
  }

  clearCache() {
    this.cache.clear();
  }
}

export const imageLoader = new ImageLoader();

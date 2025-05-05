import { imageLoader } from '../image-loader';

describe('ImageLoader', () => {
  let originalImage: typeof Image;
  let loadController: {
    [src: string]: {
      triggerLoad: () => void;
      triggerError: () => void;
    };
  };

  beforeEach(() => {
    originalImage = global.Image;

    loadController = {};

    global.Image = class {
      onload: () => void = () => {};
      onerror: (err: unknown) => void = () => {};
      _src = '';

      set src(val: string) {
        this._src = val;
        loadController[val] = {
          triggerLoad: () => this.onload(),
          triggerError: () => this.onerror(new Error(`Failed to load ${val}`)),
        };
      }

      get src() {
        return this._src;
      }
    } as never;
  });

  afterEach(() => {
    global.Image = originalImage;
    imageLoader.clearCache();
  });

  it('should not exceed max concurrent loads', async () => {
    const inProgressSpy: number[] = [];
    const pending: Promise<HTMLImageElement>[] = [];

    const processQueueOriginal = imageLoader['processQueue'].bind(imageLoader);
    imageLoader['processQueue'] = function () {
      inProgressSpy.push(this['inProgress']);
      processQueueOriginal();
    };

    const sources = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg'];
    for (const src of sources) {
      pending.push(imageLoader.loadImage(src));
    }

    expect(inProgressSpy.filter((v) => v === 4).length).toBeGreaterThan(0);

    loadController['a.jpg'].triggerLoad();
    await new Promise((r) => setTimeout(r, 0));

    loadController['b.jpg'].triggerLoad();
    loadController['c.jpg'].triggerLoad();
    loadController['d.jpg'].triggerLoad();
    loadController['e.jpg'].triggerLoad();

    await Promise.all(pending);
  });

  it('should process queued images after errors', async () => {
    const sources = ['x.jpg', 'y.jpg', 'fail.jpg', 'z.jpg', 'w.jpg'];
    const results: Array<PromiseSettledResult<HTMLImageElement>> = [];

    const promises = sources.map((src) =>
      imageLoader.loadImage(src).then(
        (res) => ({ status: 'fulfilled', value: res }) as const,
        (err) => ({ status: 'rejected', reason: err }) as const
      )
    );

    loadController['x.jpg'].triggerLoad();
    loadController['y.jpg'].triggerLoad();
    loadController['fail.jpg'].triggerError();
    loadController['z.jpg'].triggerLoad();
    loadController['w.jpg'].triggerLoad();

    results.push(...(await Promise.all(promises)));

    expect(results.filter((r) => r.status === 'fulfilled')).toHaveLength(4);
    expect(results.filter((r) => r.status === 'rejected')).toHaveLength(1);
  });
});

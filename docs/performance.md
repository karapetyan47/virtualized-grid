# 🧠 Performance Optimization Strategy

## ⚙️ Techniques Used

### 🔍 Intersection Observer for DOM Pruning

To prevent DOM overload, the app uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to detect when image elements leave the viewport.

- **Removes offscreen images** from the DOM to reduce memory usage.
- **Reinserts images** when they re-enter the viewport.
- Greatly improves **scroll performance** and reduces layout thrashing.

---

### 🚦 Controlled Image Loading with Caching

A custom image loader service was developed with concurrency control and caching:

- **Limits concurrent image downloads** (e.g., max 4 at a time) to avoid network congestion.
- **Queues requests** to maintain predictable resource usage.
- **Caches loaded images** to prevent redundant network calls.

✅ Result: Faster loading, fewer errors, and more efficient bandwidth usage.

---

### 🖼️ Progressive Image Rendering

The `ProgressiveImage` component is used to improve perceived loading speed:

- **Displays a low-quality placeholder** immediately.
- **Loads the high-resolution image** in the background.
- **Replaces placeholder** seamlessly once the image is ready.
- **Uses `performance.mark()`** to track when each image completes loading.

✅ Result: Faster visual feedback and smoother user experience, even on slow networks.

---

### 🧱 Virtualized Masonry Layout

To handle a large number of images efficiently:

- Only the **visible set of images is rendered** at any moment.
- Images that **scroll out of view are unmounted**, reducing render load.
- The grid remains **lightweight and snappy**, even with thousands of photos.

---

## ✅ Summary

| Technique                     | Benefit                                                                 |
|------------------------------|-------------------------------------------------------------------------|
| Intersection Observer        | Keeps the DOM lean and efficient                                        |
| Concurrent Image Loader      | Prevents request flooding, enables caching                              |
| Progressive Image Component  | Improves perceived performance and user experience                      |
| Virtualization               | Scales grid performance without overwhelming the browser                 |

These combined techniques ensure the application remains **high-performance**, **scalable**, and **user-friendly**, even with image-heavy, dynamic content.
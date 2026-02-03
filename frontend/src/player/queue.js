export class Queue {
  constructor(items) {
    if (!items) items = [];
    this._items = items;
    this.index = 0;
  }

  current() {
    return this._items[this.index];
  }

  hasNext() {
    return this.index < this._items.length - 1;
  }

  next() {
    if (this.hasNext()) {
      this.index++;
      return this.current();
    }
    return null;
  }

  /** Get all songs */
  getAll() {
    return this._items;
  }

  /** Get upcoming songs */
  getUpcoming() {
    return this._items.slice(this.index + 1);
  }

  /** Jump to a specific song */
  jumpTo(videoId) {
    const idx = this._items.findIndex(function (item) {
      return item.videoId === videoId;
    });

    if (idx !== -1) {
      this.index = idx;
      return this.current();
    }
    return null;
  }

  /** Add song to queue */
  enqueue(song) {
    this._items.push(song);
  }

  /** Remove song from queue */
  remove(videoId) {
    const idx = this._items.findIndex(function (item) {
      return item.videoId === videoId;
    });

    if (idx !== -1) {
      this._items.splice(idx, 1);
      if (idx <= this.index && this.index > 0) {
        this.index--;
      }
    }
  }

  /** Clear entire queue */
  clear() {
    const current = this.current();
    if (current) {
      this._items = [current];
    } else {
      this._items = [];
    }
    this.index = 0;
  }

  /** Shuffle upcoming songs */
  shuffle() {
    const upcoming = this._items.slice(this.index + 1);
    for (let i = upcoming.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = upcoming[i];
      upcoming[i] = upcoming[j];
      upcoming[j] = temp;
    }
    this._items = this._items.slice(0, this.index + 1).concat(upcoming);
  }

  /** Move song up in queue */
  moveUp(videoId) {
    const idx = this._items.findIndex(function (item) {
      return item.videoId === videoId;
    });

    if (idx > this.index + 1) {
      const temp = this._items[idx];
      this._items[idx] = this._items[idx - 1];
      this._items[idx - 1] = temp;
    }
  }

  /** Move song down in queue */
  moveDown(videoId) {
    const idx = this._items.findIndex(function (item) {
      return item.videoId === videoId;
    });

    if (idx < this._items.length - 1) {
      const temp = this._items[idx];
      this._items[idx] = this._items[idx + 1];
      this._items[idx + 1] = temp;
    }
  }
}

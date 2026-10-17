import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, viewChild} from '@angular/core';

/** A short-lived star born on an invisible orbit, then drifting independently of it. */
interface Sparkle {
  /** @type {number} */
  x: number;
  /** @type {number} */
  y: number;
  /** @type {number} */
  dx: number;
  /** @type {number} */
  dy: number;
  /** @type {number} */
  age: number;
  /** @type {number} */
  lifetime: number;
  /** @type {number} */
  size: number;
  /** @type {number} */
  points: number;
  /** @type {number} */
  rotation: number;
  /** @type {number} */
  shimmer: number;
}

/** A bounded decorative emitter: no orbit stroke, moving head, or Angular work per frame. */
@Component({selector: 'bhw-sparkle-trail', templateUrl: './sparkle-trail.html', styleUrl: './sparkle-trail.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class SparkleTrail implements AfterViewInit, OnDestroy {
  /** @type {Signal<ElementRef<HTMLCanvasElement>>} */
  private readonly surface = viewChild.required<ElementRef<HTMLCanvasElement>>('surface');
  /** @type {Sparkle[]} */
  private readonly stars: Sparkle[] = [];
  /** @type {CanvasRenderingContext2D | null} */
  private context: CanvasRenderingContext2D | null = null;
  /** @type {MediaQueryList | undefined} */
  private motion: MediaQueryList | undefined;
  /** @type {number | undefined} */
  private frame: number | undefined;
  /** @type {number | undefined} */
  private previous: number | undefined;
  /** @type {number} */
  private angle = 0;
  /** @type {number} */
  private elapsed = 0;
  /** @type {() => void} */
  private readonly refresh = (): void => {
    this.stop();
    if (!this.motion?.matches && !document.hidden && this.context) {
      this.frame = requestAnimationFrame(this.paint);
    }
  };
  /** @type {(time: number) => void} */
  private readonly paint = (time: number): void => {
    const context = this.context;
    if (!context) { return; }
    // Do not catch up after a suspended frame: that would create an abrupt particle burst.
    const delta = Math.min(time - (this.previous ?? time), 50);
    this.previous = time;
    this.elapsed += delta;
    this.angle += delta * Math.PI * 2 / 3000;
    while (this.elapsed >= 22) {
      this.elapsed -= 22;
      this.emit(this.angle - this.elapsed * Math.PI * 2 / 3000);
    }
    context.clearRect(0, 0, 64, 64);
    for (let index = this.stars.length - 1; index >= 0; index--) {
      const star = this.stars[index]!;
      star.age += delta;
      if (star.age >= star.lifetime) { this.stars.splice(index, 1); continue; }
      star.x += star.dx * delta / 1000;
      star.y += star.dy * delta / 1000;
      this.draw(context, star);
    }
    this.frame = requestAnimationFrame(this.paint);
  };

  /**
   * @param {NgZone} zone Keeps the decorative loop outside Angular change detection.
   */
  public constructor(private readonly zone: NgZone) {}

  /** Starts only when motion is allowed and the document is visible. */
  public ngAfterViewInit(): void {
    const canvas = this.surface().nativeElement;
    this.context = canvas.getContext('2d');
    if (!this.context) { return; }
    const scale = Math.min(devicePixelRatio || 1, 2);
    canvas.width = canvas.height = Math.round(64 * scale);
    this.context.scale(canvas.width / 64, canvas.height / 64);
    this.motion = matchMedia('(prefers-reduced-motion: reduce)');
    this.zone.runOutsideAngular(() => {
      this.motion!.addEventListener('change', this.refresh);
      document.addEventListener('visibilitychange', this.refresh);
      this.refresh();
    });
  }

  /** Releases the frame, particles and listeners when the invitation is dismissed. */
  public ngOnDestroy(): void {
    this.stop();
    this.motion?.removeEventListener('change', this.refresh);
    document.removeEventListener('visibilitychange', this.refresh);
  }

  /** Clears the decoration immediately on reduced motion, backgrounding or teardown. */
  private stop(): void {
    if (this.frame !== undefined) { cancelAnimationFrame(this.frame); }
    this.frame = undefined;
    this.previous = undefined;
    this.elapsed = 0;
    this.stars.length = 0;
    this.context?.clearRect(0, 0, 64, 64);
  }

  /**
   * Emits different four-, five- and six-point stars near the current orbital position.
   * @param {number} angle Current invisible emitter angle in radians.
   */
  private emit(angle: number): void {
    if (this.stars.length >= 64) { return; }
    const radius = 21 + Math.random() * 2;
    const drift = 0.6 + Math.random() * 1.2;
    this.stars.push({
      x: 32 + Math.sin(angle) * radius,
      y: 32 - Math.cos(angle) * radius,
      dx: Math.sin(angle) * drift + (Math.random() - 0.5) * 3,
      dy: -Math.cos(angle) * drift + (Math.random() - 0.5) * 3,
      age: 0,
      lifetime: 550 + Math.random() * 400,
      size: 2 + Math.random() * 1.5 + (Math.random() < 0.18 ? 1.5 : 0),
      points: 4 + Math.floor(Math.random() * 3),
      rotation: Math.random() * Math.PI,
      shimmer: Math.random() * Math.PI * 2
    });
  }

  /**
   * Flashes into a sharp star, shimmers, then shrinks and dissolves without following the orbit.
   * @param {CanvasRenderingContext2D} context Local decorative drawing surface.
   * @param {Sparkle} star Independent particle state.
   */
  private draw(context: CanvasRenderingContext2D, star: Sparkle): void {
    const progress = star.age / star.lifetime;
    const brightness = Math.min(progress / 0.06, 1) * Math.min((1 - progress) / 0.65, 1);
    const shimmer = 0.88 + Math.sin(star.age / 55 + star.shimmer) * 0.12;
    const size = star.size * (1 - progress * 0.35) * shimmer;
    context.globalAlpha = brightness * shimmer;
    context.fillStyle = '#fffaf2';
    // A fine violet edge keeps the bright cores legible against both pastel card faces.
    context.strokeStyle = '#7651a5';
    context.lineWidth = 0.65;
    context.beginPath();
    for (let point = 0; point < star.points * 2; point++) {
      const angle = star.rotation + star.age / 1800 + point * Math.PI / star.points;
      const radius = point % 2 === 0 ? size : size * 0.28;
      const x = star.x + Math.sin(angle) * radius;
      const y = star.y - Math.cos(angle) * radius;
      if (point === 0) { context.moveTo(x, y); } else { context.lineTo(x, y); }
    }
    context.closePath();
    context.stroke();
    context.fill();
    context.globalAlpha = 1;
  }
}

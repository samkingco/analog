export interface MetaValue {
  value: number;
  label: string;
}

const shutterSpeedsFullStops = [
  30,
  15,
  8,
  4,
  2,
  1,
  1 / 2,
  1 / 4,
  1 / 8,
  1 / 15,
  1 / 30,
  1 / 60,
  1 / 125,
  1 / 250,
  1 / 500,
  1 / 1000,
  1 / 2000,
  1 / 4000,
  1 / 8000,
];

const shutterSpeedsThirdStops = [
  30,
  25,
  20,
  15,
  13,
  10,
  8,
  6,
  5,
  4,
  3.2,
  2.5,
  2,
  1.6,
  1.3,
  1,
  1 / 1.25,
  1 / 1.6,
  1 / 2,
  1 / 2.5,
  1 / 3.3,
  1 / 4,
  1 / 5,
  1 / 6,
  1 / 8,
  1 / 10,
  1 / 13,
  1 / 15,
  1 / 25,
  1 / 30,
  1 / 40,
  1 / 50,
  1 / 60,
  1 / 80,
  1 / 100,
  1 / 125,
  1 / 160,
  1 / 200,
  1 / 250,
  1 / 320,
  1 / 400,
  1 / 500,
  1 / 640,
  1 / 800,
  1 / 1000,
  1 / 1250,
  1 / 1600,
  1 / 2000,
  1 / 2500,
  1 / 3200,
  1 / 4000,
  1 / 5000,
  1 / 6400,
  1 / 8000,
];

const aperturesFullStops = [1, 1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];

const aperturesThirdStops = [
  1,
  1.1,
  1.2,
  1.3,
  1.4,
  1.6,
  1.7,
  1.8,
  2,
  2.2,
  2.4,
  2.5,
  2.8,
  3.2,
  3.3,
  3.5,
  4,
  4.5,
  4.8,
  5,
  5.6,
  6.3,
  6.7,
  7.1,
  8,
  9,
  9.5,
  10,
  11,
  12,
  13,
  14,
  16,
  18,
  19,
  20,
  22,
];

function round(value: number, precision: number) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function formatShutterSpeed(shutterSpeed: number) {
  return shutterSpeed <= 1 / 4
    ? `1/${1 / shutterSpeed}`
    : `${round(shutterSpeed, 1)}s`;
}

export function makeShutterSpeeds(asFullStops = false): MetaValue[] {
  const stopValues = asFullStops
    ? shutterSpeedsFullStops
    : shutterSpeedsThirdStops;
  return stopValues.map((value) => ({
    value,
    label: formatShutterSpeed(value),
  }));
}

export function formatAperture(aperture: number) {
  return `f/${aperture}`;
}

export function makeApertures(asFullStops = false): MetaValue[] {
  const stopValues = asFullStops ? aperturesFullStops : aperturesThirdStops;
  return stopValues.map((value) => ({
    value,
    label: formatAperture(value),
  }));
}

export function formatFocalLength(focalLength: number) {
  return `${focalLength}mm`;
}

export function makeFocalLengths(min: number, max: number) {
  const diff = max + 1 - min;
  return Array.from(new Array(diff)).map((_, index) => {
    const value = min + index;
    return {
      value,
      label: formatFocalLength(value),
    };
  });
}

export function makePushPull(steps = 8) {
  const pull = Array.from(new Array(steps)).map(
    (_, index) => (steps - index) * -1,
  );
  const push = Array.from(new Array(steps)).map((_, index) => index + 1);
  return [...pull, 0, ...push];
}

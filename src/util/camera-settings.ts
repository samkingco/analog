const shutterSpeedStrs = [
  "30s",
  "25s",
  "20s",
  "15s",
  "13s",
  "10s",
  "8s",
  "6s",
  "5s",
  "4s",
  "3.2s",
  "2.5s",
  "2s",
  "1.6s",
  "1.3s",
  "1s",
  "0.8s",
  "0.6s",
  "0.5s",
  "0.4s",
  "0.3s",
  "1/4",
  "1/5",
  "1/6",
  "1/8",
  "1/10",
  "1/13",
  "1/15",
  "1/25",
  "1/30",
  "1/40",
  "1/50",
  "1/60",
  "1/80",
  "1/100",
  "1/125",
  "1/160",
  "1/200",
  "1/250",
  "1/320",
  "1/400",
  "1/500",
  "1/640",
  "1/800",
  "1/1000",
  "1/1250",
  "1/1600",
  "1/2000",
  "1/2500",
  "1/3200",
  "1/4000",
  "1/5000",
  "1/6400",
  "1/8000",
];

export const shutterSpeeds = shutterSpeedStrs.map((str) => {
  const [whole, fraction] = str.split("/");
  const shutterWhole = Number(whole.replace(/s/g, ""));
  const shutterFraction = fraction ? Number(fraction) : 0;
  return {
    shutterWhole,
    shutterFraction,
    label: str,
  };
});

const apertureValues = [
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

export const apertures = apertureValues.map((aperture) => {
  return {
    aperture,
    label: `f/${aperture}`,
  };
});

export const makeFocalLengths = (min: number, max: number) => {
  const diff = max + 1 - min;
  return Array.from(new Array(diff)).map((_, index) => {
    const focalLength = min + index;
    return {
      focalLength,
      label: `${focalLength}mm`,
    };
  });
};

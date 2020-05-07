export const theme = {
  spacing: {
    s4: 4,
    s8: 8,
    s12: 12,
    s16: 16,
    s24: 24,
    s32: 32,
  },
  fonts: {
    normal: "GTAmerica-ExtendedRegular",
    bold: "GTAmerica-ExtendedMedium",
    display: "GTAmerica-ExpandedMedium",
  },
  fontSizes: {
    s: 14,
    m: 16,
    l: 24,
  },
  colors: {
    background: {
      default: "#151719",
      inverted: "#FFFFFF",
      interactive: "#1E2124",
    },
    button: {
      primary: {
        background: "#FFFFFF",
        text: "#151719",
      },
      secondary: {
        background: "#2C3035",
        text: "#FFFFFF",
      },
    },
    text: {
      default: "#FFFFFF",
      inverted: "#151719",
      subtle: "#9099A2",
    },
    icon: {
      default: "#FFFFFF",
      subtle: "#9099A2",
      accent: "#FF4747",
    },
    divider: {
      default: "#9099A2",
      dark: "#151719",
      light: "#E9EBEC",
    },
  },
  misc: {
    borderRadius: 8,
  },
};

export type Theme = typeof theme;

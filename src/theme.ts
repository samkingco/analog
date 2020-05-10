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
    text: {
      default: "#FFFFFF",
      inverted: "#151719",
      subtle: "#9099A2",
      invertedSubtle: "#5D666F",
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
  variants: {
    button: {
      primary: {
        backgroundColor: "#FFFFFF",
        color: "#151719",
      },
      secondary: {
        backgroundColor: "#2C3035",
        color: "#FFFFFF",
      },
      danger: {
        backgroundColor: "#1A1C1E",
        color: "#FF4747",
      },
      disabled: {
        backgroundColor: "#1E2124",
        color: "#464D53",
      },
    },
  },
  misc: {
    borderRadius: 8,
  },
};

export type Theme = typeof theme;

import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    lineHeights: {
      extraLarge: "8rem",
      large: "5.6rem",
      medium: "4rem",
      small: "3.2rem",
      extraSmall: "2.4rem",
      minimum: "1rem",
    },
    letterSpacings: {
      base: "-0.02em",
    },
    fontSizes: {
      extraLarge: "6.4rem",
      regular: "1.6rem",
      regularSmall: "1.4rem",
      extraSmall: "1.2rem",
    },
    colors: {
      gray50: "#EBEEF5",
      gray100: "#C3C8D4",
      gray200: "#A8AEBF",
      gray300: "#8E95A9",
      gray400: "#767E94",
      gray500: "#61697F",
      gray600: "#475069",
      gray700: "#323B54",
      gray800: "#20283E",
      gray900: "#121829",
      primary50: "#EBE9FE",
      primary100: "#DEDBFD",
      primary200: "#BEB7FB",
      primary300: "#9C92F8",
      primary400: "#7B6EF6",
      primary500: "#5A4AF4",
      primary600: "#483BC3",
      primary700: "#362C92",
      primary800: "#251E62",
      primary900: "#120F31",
    },
  },
  media: {
    mobile: "(max-width: 768px)",
  },
});

export const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    scrollBehavior: "smooth",
  },
  html: {
    height: "100%",
    width: "100%",
    fontSize: "calc(100vw / 1440 * 10)",
    "@mobile": {
      fontSize: "calc(100vw / 768 * 10)",
    },
  },
  body: {
    height: "100%",
    width: "100%",
    fontFamily: "Poppins, sans-serif",
    color: "$gray100",
    maxWidth: "120rem",
    margin: "0 auto",
    backgroundImage: "url('./src/assets/background.svg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "$primary900",
  },
  li: {
    listStyle: "none",
  },
  a: {
    textDecoration: "none",
    color: "inherit",
    outline: 0,
    cursor: "pointer",
  },
});

export const Heading = styled("h1", {
  fontSize: "6.4rem",
  fontWeight: 600,
  lineHeight: "8rem",
  letterSpacing: "-0.02em",

  variants: {
    type: {
      headingTwo: {
        fontSize: "4.8rem",
        lineHeight: "5.6rem",
        color: "$gray50",
      },
      headingThree: {
        fontSize: "3.2rem",
        lineHeight: "4rem",
        color: "$gray400",
      },
    },
  },
});

export const Paragraph = styled("p", {
  fontSize: "1.6rem",
  fontWeight: 400,
  lineHeight: "2.4rem",
  letterSpacing: "-0.02em",
  color: "$gray300",
  display: "inline-block",

  variants: {
    type: {
      body: {
        fontSize: "1.6rem",
      },
    },
    color: {
      highlight: {
        color: "$primary300",
      },
    },
  },
});

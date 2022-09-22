// import { css } from 'styled-components';
import { lighten } from "polished";

export const setSiteTheme = (color) => {
  Theme.PrimaryColor = color;
};

const PrimaryTheme = "#0066F5";
const PrimaryGrey = "#62707B";

export const Theme = {
  PrimaryColor: PrimaryTheme,
  PrimaryGrey: "#9D9DB7",

  PrimaryBackground: "#FAF8F9",
  PrimaryGreen: "#2CDA9D",
  PrimaryMint: "#95fd35",
  PrimaryRed: "#D81E5B",
  PrimaryYellow: "#F2C02E",
  PrimaryOrange: "#EF7E23",
  PrimaryBlue: "#5BB1F2",
  SecondaryColor: "#be7efc",
  TetiaryColor: "#ecdbfe",

  PrimaryFontSize: "12px",
  PrimaryFontColor: "#383A3F",

  PrimaryRadius: "3px",
  SecondaryRadius: "5px",

  PrimaryGreyLight: lighten(0.4, PrimaryGrey),

  PrimaryBorderColor: "#D8D8E3",
  PrimaryFade: "#F5F5F7",
  PrimaryInputOutline: "#9D9DB7",
  PrimaryFadedBlue: "#dfe8f7",
};

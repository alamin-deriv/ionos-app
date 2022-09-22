import { transparentize } from "polished";
import styled, { css } from "styled-components";

import { Theme } from "../../config/theme";

export const TableWrapper = styled("div")`
  display: block;
  margin: 20px 0;
  font-size: ${Theme.PrimaryFontSize};
  background-color: #fff;
  border: 1px solid ${Theme.PrimaryGreyLight};
  border-radius: ${Theme.SecondaryRadius};
  overflow-x: auto;
  ${(props) =>
    props.noBackground &&
    css`
      background-color: transparent;
      border: none;
    `}

  & table {
    background-color: #fff;
    border-collapse: collapse;
    border-radius: ${Theme.SecondaryRadius};
    width: 100% !important;

    & thead {
      border-bottom: 1px solid ${Theme.PrimaryGreyLight};
      background-color: ${(props) => props.headBgColor};
      color: ${Theme.PrimaryFontColor};
      ${(props) =>
        props.noBackground &&
        css`
          border-top: none;
        `}
      ${(props) =>
        props.stripped &&
        css`
          border-bottom: none;
        `}
        & th {
        text-align: left;
        font-weight: bold;
        padding: ${(props) =>
          props.cellPad ? props.cellPad : Theme.PrimaryCellPad};
        font-size: ${Theme.PrimaryFontSize};
        ${(props) =>
          props.firstColBorder &&
          css`
            &:first-child {
              border-right: 1px solid ${Theme.PrimaryGreyLight};
            }
          `}
      }
    }
    & tbody {
      & tr {
        /* min-height: 60px; */
        border-bottom: 1px solid ${Theme.PrimaryGreyLight};
        position: relative;
        z-index: 1;
        transition: all 0.3s ease-out;

        &:last-of-type {
          border-bottom: none;
        }
        &:hover {
          z-index: 2;
          background-color: ${transparentize(0.83, Theme.PrimaryColor)};
        }
        ${(props) =>
          props.noBackground &&
          css`
            border-bottom: none;
          `}
        ${(props) =>
          props.stripped &&
          css`
            border-bottom: none;
            &:nth-child(odd) {
              background-color: ${transparentize(0.8, Theme.PrimaryGreyLight)};

              &:hover {
                z-index: 2;
                background-color: ${transparentize(0.83, Theme.PrimaryColor)};
              }
            }
          `}
            
            & td {
          padding: ${(props) =>
            props.cellPad ? props.cellPad : Theme.PrimaryCellPad};
          text-align: left;
          ${(props) =>
            props.firstColBorder &&
            css`
              &:first-child {
                border-right: 1px solid ${Theme.PrimaryGreyLight};
              }
            `}
          & a {
            font-weight: bold;
            color: ${Theme.SecondaryColor};
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
`;

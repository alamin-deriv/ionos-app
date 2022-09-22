import styled, { css } from "styled-components";

export const Text = styled.span`
  font-weight: ${(props) => props.weight};
  ${(props) =>
    props.size &&
    css`
      font-size: ${(props) => (props.size ? props.size : "0.75rem")};
    `}
  ${(props) =>
    props.block &&
    css`
      display: block;
    `}
    ${(props) =>
    props.capitalize &&
    css`
      text-transform: capitalize;
    `}
    ${(props) =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `}
    ${(props) =>
    props.lowercase &&
    css`
      text-transform: lowercase;
    `}
      ${(props) =>
    props.color &&
    css`
      color: ${(props) => props.color};
    `}
`;

export const Avatar = styled.div`
  width: 43px;
  height: 43px;
  background: #f6ca65;
  border-radius: 5px;
  text-align: center;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AvatarSec = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  margin-right: 80px;

  & p {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #005b96;
    margin-top: 11px;
  }
`;

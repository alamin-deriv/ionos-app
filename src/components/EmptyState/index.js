import React from "react";
import styled from "styled-components";
import Empty from "../../assets/emptyState.png";

const StyledDiv = styled.div`
  text-align: center;
  width: 36%;
  margin: 100px auto;
  & h3 {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #011f4b;
  }
  & h4 {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #7e8299;
    margin-top: 16px;
  }

  & img {
    margin-top: 30px;
  }
`;

export const EmptyState = ({ header, message }) => {
  return (
    <StyledDiv>
      <h3>{header}</h3>
      <h4>{message}</h4>
      <img src={Empty} alt="empty state" height="170px" />
    </StyledDiv>
  );
};

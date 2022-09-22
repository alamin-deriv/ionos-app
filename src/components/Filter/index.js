import React from "react";
import styled from "styled-components";
import { Box, Grid, Select } from "flexibull-meme";

const StyledDiv = styled.div`
  width: "95%";
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
    margin-top: 10px;
  }

  & .filterButtons {
    display: flex;
    justify-content: right;
    width: 68%;
    padding: 50px 0 0 30px;
    margin-left: 50px;
  }
`;

export const Filter = ({
  data,
  handleFilter,
  getPath,
  serverNameValue,
  setServerNameValue,
  statusValue,
  setStatusValue,
  CPUValue,
  setCPUValue,
}) => {
  const listOfServerNames = data?.map((server) => server.serverName);
  const listOfCPUPercetage = data
    ?.map((server) => server.stats.cpu)
    .sort((a, b) => a - b)
    .filter((percent) => percent !== null);

  const listOfStatus = [
    { label: "online", value: "online" },
    { label: "offline", value: "offline" },
    { label: "idle", value: "idle" },
  ];

  return (
    <StyledDiv>
      <div>
        <h3>Servers Overview</h3>
      </div>
      <div>
        <Grid default="20% 15% 15% 50%">
          <Select
            block
            placeholder="Select Server Name"
            value={serverNameValue}
            options={[...new Set(listOfServerNames)].map((serverName) => {
              return {
                label: serverName,
                value: serverName,
              };
            })}
            onChange={(e) => {
              handleFilter(e, "serverName");
              setServerNameValue(e);
            }}
          />
          <Select
            block
            placeholder="Select status"
            onChange={(e) => {
              handleFilter(e, "status");
              setStatusValue(e);
            }}
            value={statusValue}
            options={listOfStatus}
          />
          <Select
            block
            placeholder="Select CPU Utilization"
            options={[...new Set(listOfCPUPercetage)].map((percent) => {
              return {
                label: `${percent}%`,
                value: percent,
              };
            })}
            value={CPUValue}
            onChange={(e) => {
              handleFilter(e, "cpu");
              setCPUValue(e);
            }}
          />

          <Box />
        </Grid>
      </div>
    </StyledDiv>
  );
};

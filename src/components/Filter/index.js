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
  serverNameValue,
  setServerNameValue,
  statusValue,
  setStatusValue,
  CPUValue,
  setCPUValue,
}) => {
  const listOfServerNames = data?.map((server) => server.serverName);

  const listOfCPUPercetage = [
    { label: "0% - 10%", value: "0-10" },
    { label: "10% - 20%", value: "10-20" },
    { label: "20% - 30%", value: "20-30" },
    { label: "30% - 40%", value: "30-40" },
    { label: "40% - 50%", value: "40-50" },
    { label: "50% - 60%", value: "50-60" },
    { label: "60% - 70%", value: "60-70" },
    { label: "70% - 80%", value: "70-80" },
    { label: "80% - 90%", value: "80-90" },
    { label: "90% - 100%", value: "90-100" },
  ];

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
            options={listOfCPUPercetage}
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

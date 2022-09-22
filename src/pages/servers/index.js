import React, { useState, useEffect } from "react";
import { Layout, Loader, Box, Tag, Text } from "flexibull-meme";
import { Theme } from "../../config/theme";
import { getPath } from "../../utils/utils";
import { useQuery } from "react-query";
import moment from "moment";
import qs from "query-string";

import { Filter, EmptyState, TableWrapper } from "../../components";

const columns = [
  {
    title: "Server Name",
    dataIndex: "server_name",
    key: "server_name",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "IPv4",
    dataIndex: "ipv4",
    key: "ipv4",
  },
  {
    title: "Uptime (Days)",
    dataIndex: "uptime",
    key: "uptime",
    sort: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sort: true,
  },
  {
    title: "Stats",
    dataIndex: "stats",
    key: "stats",
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
    sort: true,
  },
];

const Servers = () => {
  const { isLoading, error, data } = useQuery("servers", () =>
    fetch("https://servers101.netlify.app/.netlify/functions/servers").then(
      (res) => res.json()
    )
  );

  const [filter, setFilter] = useState({});
  const [servers, setServers] = useState([]);

  const [rerender, setReRender] = useState(false);

  const [serverNameValue, setServerNameValue] = useState({
    label: "Select Server Name",
    value: "",
  });
  const [statusValue, setStatusValue] = useState({
    label: "Select status",
    value: "",
  });
  const [CPUValue, setCPUValue] = useState({
    label: "Select CPU Utilization",
    value: "",
  });

  const [uptimeSorted, setUptimeSorted] = useState(false);
  const [statusSorted, setStatusSorted] = useState(false);
  const [createdSorted, setCreatedSorted] = useState(false);

  const updateServers = (filter, servers) => {
    let tempServers = servers;

    if (filter.serverName) {
      const filteredData = tempServers.filter(
        (server) => server.serverName === filter.serverName
      );

      tempServers = filteredData;
      setServerNameValue({
        label: filter.serverName,
        value: filter.serverName,
      });
    }
    if (filter.status) {
      const filteredData = tempServers.filter(
        (server) => server.status === filter.status
      );

      tempServers = filteredData;
      setStatusValue({
        label: filter.status,
        value: filter.status,
      });
    }

    if (filter.cpu >= 0) {
      const filteredData = tempServers.filter(
        (server) => server.stats.cpu === filter.cpu
      );

      tempServers = filteredData;
      setCPUValue({
        label: filter.cpu,
        value: filter.cpu,
      });
    }

    setServers(tempServers);
  };

  useEffect(() => {
    if (Object.keys(filter).length !== 0) {
      getPath(filter);
      updateServers(filter, data?.data);
    }
  }, [filter]);

  // eslint-disable-next-line no-restricted-globals
  const params = qs.parse(location.hash.substring(1));

  useEffect(() => {
    if (data?.data) {
      setFilter(params);
      updateServers(params, data?.data);
    }
  }, [data]);

  const handleFilter = (filters, param) => {
    setFilter({
      ...filter,
      [param]: filters.value,
    });
  };

  const removeTag = (tag) => {
    delete filter[tag.key];
    setFilter(filter);
    getPath(filter);
    updateServers(filter, data?.data);
    setReRender(!rerender);
  };

  const handleSortings = (key) => {
    switch (key) {
      case "uptime":
        handleUptimeSorting(!uptimeSorted, key);
        setUptimeSorted(!uptimeSorted);
        break;
      case "status":
        handleStatusSorting(!statusSorted);
        setStatusSorted(!statusSorted);
        break;
      case "created":
        handleCreatedSorting(!createdSorted);
        setCreatedSorted(!createdSorted);
        break;

      default:
        break;
    }
  };

  const handleUptimeSorting = (status, key) => {
    const sortedServers = status
      ? servers.sort((a, b) => a[key] - b[key])
      : servers.sort((a, b) => b[key] - a[key]);

    setServers(sortedServers);
  };

  const handleStatusSorting = (status) => {
    if (status) {
      const sortedServers = servers.sort((a, b) => {
        if (a.status < b.status) {
          return -1;
        }
        if (a.status > b.status) {
          return 1;
        }
        return 0;
      });
      setServers(sortedServers);
    } else {
      const sortedServers = servers.sort((a, b) => {
        if (b.status < a.status) {
          return -1;
        }
        if (b.status > a.status) {
          return 1;
        }
        return 0;
      });
      setServers(sortedServers);
    }
  };

  const handleCreatedSorting = (status) => {
    const sortedServers = status
      ? servers.sort(
          (a, b) =>
            a.created.split("-").join("") - b.created.split("-").join("")
        )
      : servers.sort(
          (a, b) =>
            b.created.split("-").join("") - a.created.split("-").join("")
        );

    setServers(sortedServers);
  };

  const filterProps = {
    data: data?.data,
    handleFilter,
    getPath,
    serverNameValue,
    setServerNameValue,
    statusValue,
    setStatusValue,
    CPUValue,
    setCPUValue,
  };

  const fitersKeys = [];
  const tags = [];
  for (const key in filter) {
    fitersKeys.push(key);
    tags.push({ key, value: filter[key] });
  }

  const serverNameTag = (arr) => {
    const serverNameItem = arr.filter((item) => item.key === "serverName")[0];

    return (
      <Tag
        onClose={(e) => {
          removeTag(serverNameItem);
          setServerNameValue({
            label: "Select Server Name",
            value: "",
          });
        }}
        round
        spaceRight
      >
        Server Name:&nbsp;<b>{serverNameItem.value}</b>
      </Tag>
    );
  };

  const statusTag = (arr) => {
    const statusItem = arr.filter((item) => item.key === "status")[0];
    return (
      <Tag
        onClose={(e) => {
          removeTag(statusItem);
          setStatusValue({
            label: "Select status",
            value: "",
          });
        }}
        round
        spaceRight
      >
        Status:&nbsp;<b>{statusItem.value}</b>
      </Tag>
    );
  };

  const cpuTag = (arr) => {
    const cpuItem = arr.filter((item) => item.key === "cpu")[0];
    return (
      <Tag
        onClose={(e) => {
          removeTag(cpuItem);
          setCPUValue({
            label: "Select CPU Utilization",
            value: "",
          });
        }}
        round
        spaceRight
      >
        CPU Percent:&nbsp;<b>{cpuItem.value}%</b>
      </Tag>
    );
  };

  if (isLoading)
    return (
      <Box pad="150px 0">
        <Loader color={Theme.PrimaryColor} section />
      </Box>
    );

  if (error || data.statusCode)
    return (
      <EmptyState header="Error Acquired" message="Please try again later" />
    );

  return (
    <div style={{ width: "90vw", margin: "0 auto" }}>
      <Layout theme={Theme}>
        <Filter {...filterProps} />

        {tags.length ? (
          <Box pad="30px 0px 10px 0px">
            {fitersKeys.includes("serverName") ? serverNameTag(tags) : null}
            {fitersKeys.includes("status") ? statusTag(tags) : null}
            {fitersKeys.includes("cpu") ? cpuTag(tags) : null}
          </Box>
        ) : null}

        {servers.length ? (
          <TableWrapper stripped cellPad="13px 20px">
            <table>
              <thead>
                <tr>
                  {columns &&
                    columns.map((elem, index) => {
                      return (
                        <th key={elem.key ? elem.key : index}>
                          {elem.title}
                          {elem.sort ? (
                            <Text
                              style={{ cursor: "pointer" }}
                              onClick={() => handleSortings(elem.key)}
                              size="15px"
                            >
                              <i className="icon-sort" />
                            </Text>
                          ) : null}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {servers.map((elem) => {
                  let seconds = elem.uptime;
                  let duration = moment.duration(seconds, "seconds");
                  return (
                    <tr key={elem.id}>
                      <td key="serverName" data-label="serverName">
                        <b>{elem.serverName}</b>
                      </td>
                      <td key="location" data-label="location">
                        {elem.location}
                      </td>
                      <td key="ipv4" data-label="ipv4">
                        {elem.ipv4}
                      </td>
                      <td key="uptime" data-label="uptime">
                        {Math.floor(duration.asDays())}
                      </td>
                      <td key="status" data-label="status">
                        {elem.status ? elem.status : "--/--"}
                      </td>
                      <td key="stats" data-label="stats">
                        <b>CPU:</b>&nbsp;
                        {elem.stats.cpu !== null
                          ? `${elem.stats.cpu}%`
                          : "--/--"}{" "}
                        <br />
                        <b>RAM:</b>&nbsp;
                        {elem.stats.ram !== null
                          ? `${elem.stats.ram}%`
                          : "--/--"}
                        <br />
                        <b>DISK:</b>&nbsp;
                        {elem.stats.disk !== null
                          ? `${elem.stats.disk}%`
                          : "--/--"}
                      </td>
                      <td key="created" data-label="created">
                        {elem.created}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableWrapper>
        ) : (
          <EmptyState header="No Servers" message="No records found" />
        )}
      </Layout>
    </div>
  );
};

export default Servers;

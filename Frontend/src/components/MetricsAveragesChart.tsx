import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import TimespanSelector from "./TimespanSelector";
import { fetchMetrics } from "../api/fetch_metrics";
import TimeRangeSlider from "./TimeRangeSlider";
import { Box, Card, CardBody, Stack, StackDivider } from "@chakra-ui/react";

export default function MetricsAveragesChart() {
  const [dataKeys, setDataKeys] = useState([]);
  const [timespan, setTimespan] = useState("minute");
  const [events, setEvents] = useState([]);

  const now = new Date();
  const max = now.getTime();
  const min = new Date().setFullYear(now.getFullYear() - 1);
  const defaultMin = new Date().setMonth(now.getMonth() - 1);
  const [timeRange, setTimeRange] = useState([defaultMin, max]);

  useEffect(() => {
    let ignore = false;
    fetchMetrics(
      timespan,
      new Date(timeRange[0]).toISOString(),
      new Date(timeRange[1]).toISOString()
    ).then(({ chartData, eventNames }) => {
      if (!ignore) {
        setDataKeys(chartData);
        setEvents(eventNames);
      }
    });
    return () => {
      ignore = true;
    };
  }, [timespan, timeRange]);

  return (
    <Box>
      <Card m="8px">
        <CardBody>
          <ResponsiveContainer width="95%" height={300}>
            <LineChart
              data={dataKeys}
              margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
            >
              <Tooltip />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend />
              {events.map((name) => (
                <Line
                  key={name}
                  type="monotone"
                  name={name}
                  dataKey={`${name}_average`}
                  stroke="#FB8833"
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
      <Card m="8px">
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <TimespanSelector onChange={setTimespan} />
            <TimeRangeSlider
              updateTimeRange={setTimeRange}
              min={min}
              max={max}
              defaultFrom={defaultMin}
              defaultTo={max}
            />
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}

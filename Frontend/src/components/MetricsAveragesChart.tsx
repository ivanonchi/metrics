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

function transformData(data) {
  return data.reduce((accumulator, current) => {
    const timestamp = current.timestamp;
    const rechartData = accumulator.find((o) => o.timestamp === timestamp);
    if (!rechartData) {
      accumulator.push({
        timestamp: current.timestamp,
        [`${current.name}_average`]: current.average,
      });
    } else {
      rechartData[`${current.name}_average`] = current.average;
    }
    return accumulator;
  }, []);
}

function eventsFromData(data) {
  return data.reduce((accumulator: string[], current) => {
    if (!accumulator.includes(current.name)) {
      accumulator.push(current.name);
    }
    return accumulator;
  }, []);
}

export default function MetricsAveragesChart() {
  const [dataKeys, setDataKeys] = useState([]);
  const [timespan, setTimespan] = useState("minute");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch(
          "http://localhost:3000/metric_averages?" +
            new URLSearchParams({
              timespan: timespan,
              from: "2024-04-28T08:10:00.000Z",
              to: "2024-05-28T10:03:00.000Z",
            }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            const chartData = transformData(data);
            setDataKeys(chartData);
            setEvents(eventsFromData(data));
          });
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [dataKeys, events, timespan]);

  return (
    <div className="row">
      <div className="col-md-12">
        <h2>Charts with recharts library</h2>
      </div>

      <div className="section col-md-6">
        <h3 className="section-title">Line Chart</h3>
        <div className="section-content">
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

          <TimespanSelector onChange={setTimespan} />
        </div>
      </div>
    </div>
  );
}

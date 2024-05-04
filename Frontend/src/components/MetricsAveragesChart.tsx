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

export default function MetricsAveragesChart() {
  const [dataKeys, setDataKeys] = useState([]);
  const [timespan, setTimespan] = useState("minute");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let ignore = false;
    fetchMetrics(
      timespan,
      "2024-04-28T08:10:00.000Z",
      "2024-05-28T08:10:00.000Z"
    ).then(({ chartData, eventNames }) => {
      if (!ignore) {
        setDataKeys(chartData);
        setEvents(eventNames);
      }
    });
    return () => {
      ignore = true;
    }
  }, [timespan]);

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

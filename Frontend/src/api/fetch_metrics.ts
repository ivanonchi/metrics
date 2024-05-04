async function fetchMetrics(timespan, from, to) {
  return fetch(
    "http://localhost:3000/metric_averages?" +
      new URLSearchParams({ timespan, from, to }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const chartData = transformData(data);
      const eventNames = eventsFromData(data);
      return { chartData, eventNames };
    });
}

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

export { fetchMetrics };

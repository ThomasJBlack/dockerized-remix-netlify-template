import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';

  //todo: format this data and make the chart meaningful
  
  const data = [
    { name: 'Page A', high: 4000, critical: 2400, amt: 2400 },
    { name: 'Page B', high: 3000, critical: 1398, amt: 2210 },
    { name: 'Page C', high: 2000, critical: 9800, amt: 2290 },
    { name: 'Page D', high: 2780, critical: 3908, amt: 2000 },
    { name: 'Page E', high: 1890, critical: 4800, amt: 2181 },
    { name: 'Page F', high: 2390, critical: 3800, amt: 2500 },
    { name: 'Page G', high: 3490, critical: 4300, amt: 2100 },
  ];
  
  const CustomLineChart = (testData: any) => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--tw-color-grid)"/>
          <XAxis dataKey="name" stroke="var(--tw-color-text)"/>
          <YAxis stroke="var(--tw-color-text)"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="critical" stroke="#1EA896" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="high" stroke="#FF3864" />
        </LineChart>
      </ResponsiveContainer>
    );
  };
  
  export default CustomLineChart;
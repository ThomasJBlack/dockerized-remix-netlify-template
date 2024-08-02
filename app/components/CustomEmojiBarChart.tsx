import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { useState, useEffect } from 'react';
import { ChartData } from "~/routes/teams.$team";

// sample data
// const data = [
//   { name: 'Page A', count: 4000 },
//   { name: 'Page B', count: 3000 },
//   { name: 'Page C', count: 2000 },
//   { name: 'Page D', count: 2780 },
//   { name: 'Page E', count: 1890 },
//   { name: 'Page F', count: 2390 },
//   { name: 'Page G', count: 3490 },
// ];

const CustomEmojiBar = (props: any) => {
  const { x, y, width, height } = props;
  const emoji = '💩';
  const emojiSize = 70;
  const emojiCount = Math.floor(height / emojiSize);

  return (
    <g>
      {Array.from({ length: emojiCount }).map((_, index) => (
        <text
          key={index}
          x={x + width / 2}
          y={y + height - (index * emojiSize) - emojiSize / 2}
          textAnchor="middle"
          dy="0.35em"
          fontSize={`${emojiSize}px`}
        >
          {emoji}
        </text>
      ))}
    </g>
  );
};

const CustomEmojiBarChart: React.FC<ChartData> = (props: ChartData) => {
  const [isClient, setIsClient] = useState(false);
  const chartData = props.data;

  // we only want to render this chart on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <BarChart
      width={900}
      height={300}
      data={chartData}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="var(--tw-color-grid)"/>
      <XAxis dataKey="name" stroke="var(--tw-color-text)"/>
      <YAxis stroke="var(--tw-color-text)"/>
      <Tooltip />
      <Bar dataKey="Criticals" fill="#82502E" shape={CustomEmojiBar}>
      </Bar>
    </BarChart>
  )
};

export default CustomEmojiBarChart;
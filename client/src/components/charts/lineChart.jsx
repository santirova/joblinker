import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [20,15,6,22,45,14],
        },
      ]}
      width={500}
      height={300}
    />
  );
}
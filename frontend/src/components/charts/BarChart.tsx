import { Bar } from "react-chartjs-2";

interface Props{
  chartData: any
}
const currentDate = new Date()
const monthName = currentDate.toLocaleString('default', { month: 'long' });

const BarChart = ({ chartData }: Props) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{monthName}</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Tasks Completed This Month"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};
export default BarChart
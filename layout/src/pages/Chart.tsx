import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

const Chart: React.FC = () => {
  const data: DataPoint[] = [
    { name: 'A', value: 400 },
    { name: 'B', value: 300 },
    { name: 'C', value: 200 },
    { name: 'D', value: 278 },
    { name: 'E', value: 189 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Data Visualization</h1>
      <div className="bg-gray-800 p-4 rounded-lg">
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </div>
      <div className="mt-8 space-x-4">
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Back
        </Link>
        <Link
          to="/temp"
          className="inline-block px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Chart;
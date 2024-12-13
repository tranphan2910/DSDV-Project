import { Link } from 'react-router-dom';

const Chart: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Data Visualization</h1>
      <div className="bg-black p-4 rounded-lg">
      </div>
      <div className="mt-8 space-x-4">
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-custom-gray-0.9 rounded-lg hover:bg-custom-gray"
        >
          Back
        </Link>
        <Link
          to="/temp"
          className="inline-block px-6 py-3 bg-custom-orange-0.9 rounded-lg hover:bg-custom-orange"
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Chart;
import { Link } from 'react-router-dom';

const Temp: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Temporary Page</h1>
      <p className="mb-8">This is a temporary page for demonstration purposes.</p>
      <Link
        to="/chart"
        className="inline-block px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Back
      </Link>
    </div>
  );
};

export default Temp;
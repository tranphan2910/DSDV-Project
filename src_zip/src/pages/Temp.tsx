import { Link } from 'react-router-dom';

const Temp: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Team Members and Contribution</h1>
      <p className="mb-8">This is a temporary page for demonstration purposes.</p>
      <Link
        to="/chart"
        className="inline-block px-6 py-3 bg-custom-gray-0.9 rounded-lg hover:bg-custom-gray"
      >
        Back
      </Link>
    </div>
  );
};

export default Temp;
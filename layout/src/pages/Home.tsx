import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Aevion</h1>
      <div className="prose text-white">
        <p>Lorem ipsum dolor sit amet... (Add your wall of text here)</p>
      </div>
      <Link
        to="/chart"
        className="inline-block mt-8 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Next
      </Link>
    </div>
  );
};

export default Home;
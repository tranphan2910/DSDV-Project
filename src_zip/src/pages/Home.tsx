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
        className="inline-block px-6 py-3 bg-custom-orange-0.9 rounded-lg hover:bg-custom-orange"
      >
        Next
      </Link>
    </div>
  );
};

export default Home;
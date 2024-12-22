import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-6xl font-bold mb-2">Welcome to <span className="font-telma text-custom-fiery-glow">Aevion</span></h1>
      <h2 className="text-2xl font-bold mb-8">Your Passport to a World of Wonders</h2>
      <div className="prose text-justify mb-10">

        <p className="text-lg mb-6">
          At Aevion, we understand that your time and budget are precious.
          That is why we are here to make your travel planning as simple, smooth, and affordable as possible.
          Our goal is to equip you with the best tools and insights so you can make smarter choices every time you travel.
          Whether you are flying for business or leisure, Aevion is your go-to partner for all things travel.
        </p>

        <h3 className="text-xl font-bold text-custom-fiery-glow mb-2">
          About Aevion
        </h3>
        <p className="text-lg mb-2">
          Aevion is not just another travel agent—it is your personal travel assistant, helping you navigate the skies with ease.
          By combining advanced data with a friendly, intuitive platform, we deliver real-time information to make your trip planning easier and more cost-effective.
          The name Aevion blends aviation with aeon, representing timeless journeys and the limitless possibilities of air travel.
        </p>
        <p className="text-lg mb-6">
          Our logo—featuring a simple yet elegant design of a plane and a bird—embodies our core philosophy: just like a bird soaring effortlessly through the air, Aevion aims to make your travel experience effortless, too.
        </p>

        <h3 className="text-xl font-bold text-custom-fiery-glow mb-2">
          The Aevion Dashboard: Your Smart Travel Assistant
        </h3>
        <p className="text-lg mb-2">
          At the heart of Aevion is our powerful, user-friendly dashboard.
          It is designed with you in mind, offering a seamless experience that helps you compare flight prices, check schedules, and analyze trends, all in one place.
          Here is what you can do with our dashboard:
        </p>
        <p className="text-lg pl-4 mb-2">
          <ul className="list-disc list-inside">
            <li>
              <span className="font-bold">Compare Flight Prices:</span> Easily compare ticket prices from different airlines to find the best deal for your travel dates.
            </li>
            <li>
              <span className="font-bold">Track Flight Schedules:</span> View up-to-the-minute flight schedules, ensuring you pick the flight that works best for you.
            </li>
            <li>
              <span className="font-bold">Understand Pricing Trends:</span> Spot trends in ticket prices to help you book at the right time and save money.
            </li>
            <li>
              <span className="font-bold">Explore Route Coverage:</span> See all the routes available from various airlines, so you can pick the most convenient option.
            </li>
            <li>
              <span className="font-bold">Identify Peak Travel Times:</span> Avoid crowds and high prices by understanding the busiest travel hours.
            </li>
          </ul>
        </p>
        <p className="text-lg mb-6">
          With our interactive charts and customizable filters, you can quickly compare options and select the flight that fits your schedule, budget, and travel preferences.
          It is all about helping you make confident, informed decisions—whether you are booking a weekend getaway or planning your next big adventure.
        </p>

        <h3 className="text-xl font-bold text-custom-fiery-glow mb-2">
          Why Aevion Stands Out
        </h3>
        <p className="text-lg mb-6">
          At Aevion, we pride ourselves on providing trusted, real-time flight information, ensuring you always have the latest data to make the most informed decisions.
          Our platform allows you to easily customize your search, with filters for price, travel times, airlines, and more, so you can find exactly what you are looking for.
          Additionally, we offer valuable insights into pricing trends and peak travel times, giving you the advantage to book smarter, save money, and plan your trips with confidence.
        </p>

        <h3 className="text-xl font-bold text-custom-fiery-glow mb-2">
          Start Your Journey with Aevion Today
        </h3>
        <p className="text-lg mb-6">
          We know that your time is valuable, and booking a flight should not be a hassle.
          With Aevion, you get all the tools you need to book with confidence and ease.
          Ready to find the best flight at the best price?
          Let Aevion help you plan your next trip!
        </p>
        
      </div>
      <Link
        to="/dashboard"
        className="inline-block px-6 py-3 bg-custom-orange-0.9 rounded-lg hover:bg-custom-orange"
      >
        Next
      </Link>
    </div>
  );
};

export default Home;
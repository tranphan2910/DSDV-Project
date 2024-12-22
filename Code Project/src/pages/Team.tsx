import { Link } from 'react-router-dom';

const Team: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-6xl font-bold mb-8">Team Members</h1>
      <div className="prose text-justify mb-10">
        <p className="text-lg mb-2">
          We are a team three members from International University - Vietnam National University HCMC:
        </p>
        <p className="text-lg pl-4 mb-2">
          <ul className="list-disc list-inside">
            <li>
              <span className='font-bold text-custom-fiery-glow'>Le Huynh Nha Nguyen</span> - ITDSIU21058
            </li>
            <li>
              <span className='font-bold text-custom-fiery-glow'>Phan Bao Tran</span> - ITDSIU21125
            </li>
            <li>
              <span className='font-bold text-custom-fiery-glow'>Nguyen Minh Viet</span> - ITDSIU21130
            </li>
          </ul>
        </p>
        <p className="text-lg mb-2">
          This website is the result of a collaborative effort by the three of us, developed as part of our <span className='text-custom-fiery-glow'>Data Science and Data Visualization</span> course project under the guidance of <span className='text-custom-fiery-glow'>Dr. Tran Thanh Tung</span>.
          For our project, we focused on analyzing the aviation industry in Vietnam, and the core feature of our website is a dashboard showcasing these analytics.
          In line with the aviation theme, we also decided to create Aevion, a fictional travel agency designed to help users compare flights and make informed travel decisions.
        </p>
        <p className="text-lg mb-6">
          To build this project, we leveraged modern web development technologies including <span className='text-custom-fiery-glow'>Vite</span> for fast and efficient development, <span className='text-custom-fiery-glow'>React</span> for the user interface, <span className='text-custom-fiery-glow'>TypeScript</span> for enhanced code quality and maintainability, and <span className='text-custom-fiery-glow'>Tailwind CSS</span> for responsive and customizable styling.
          Additionally, we used the <span className='text-custom-fiery-glow'>D3 library</span> to create interactive and dynamic visualizations, bringing the flight data to life.
        </p>
      </div>
      <Link
        to="/dashboard"
        className="inline-block px-6 py-3 bg-custom-gray-0.9 rounded-lg hover:bg-custom-gray"
      >
        Back
      </Link>
    </div>
  );
};

export default Team;
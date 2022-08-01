import { Link } from 'react-router-dom';
import React from 'react';

const Home = () => {
  return (
    <div>
      <Link to={'/films'}>go to Films</Link>
    </div>
  );
};

export default Home;

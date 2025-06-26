import React from 'react';
import Header from '../Components/Header.jsx';
import FeatureShowcase from './FeatureShowCase.jsx';
import Footer from '../Components/Footer.jsx';

const Homepage = ({ signOut, toSignIn, toSignUp }) => {
  return (
    <>
      <Header signOut={signOut} toSignIn={toSignIn} toSignUp={toSignUp} />
      <FeatureShowcase />
      <Footer />
    </>
  );
};

export default Homepage;

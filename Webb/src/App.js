import React from 'react';
import BastardBurgersFetcher from './fetchers/BastardBurgersFetcher';
import GuteFetcher from './fetchers/GuteFetcher';
import JohnScottsFetcher from './fetchers/JohnScottsFetcher';
import KnutFetcher from './fetchers/KnutFetcher';
import KungCarlFetcher from './fetchers/KungCarlFetcher';
import logo from './images/Crusader.png';

const appStyle = {
  backgroundColor: '#282c34',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  size: '100%'
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
};

const headingStyle = {
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '20px',
  color: 'white',
};

const footerStyle = {
  marginTop: 'auto',
  textAlign: 'center',
  padding: '10px',
  backgroundColor: '#000000',
  width: '100%',
  color: 'white',
};

function App() {
  return (
    <div style={appStyle}>
      <h1 style={headingStyle}>
        <img src={logo} size={"100%"} alt="Crusader Company" />
      </h1>
      <div style={containerStyle}>
        <JohnScottsFetcher />
        <GuteFetcher />
        <BastardBurgersFetcher />
        <KnutFetcher />
        <KungCarlFetcher />
      </div>
      <footer style={footerStyle}>
        Lunch Crusader Company
      </footer>
    </div>
  );
}

export default App;

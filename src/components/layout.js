import React from 'react';

import Header from '../components/header.js';
import Footer from '../components/footer.js';

import '../styles/index.scss';

const Layout = (props) => {
  return (
    <div>
      <Header/>
      {props.children}
      <Footer/>
    </div>
  )
}

export default Layout;
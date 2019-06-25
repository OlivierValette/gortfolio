import React from 'react';

import Header from '../components/header.js';
import Footer from '../components/footer.js';

import '../styles/index.scss';
import layoutStyles from './layout.module.scss';

const Layout = (props) => {
  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.contents}>
        <Header/>
        {props.children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout;
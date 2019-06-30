import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout.js';
import Head from '../components/head.js'

const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home"/>
      <h1>Hello.</h1>
      <h2>I am Olivier Valette, a web developper</h2>
      <p>Need a developper? <Link to='/contact'>Contact me</Link>.</p>
    </Layout>
  )
}

export default IndexPage;
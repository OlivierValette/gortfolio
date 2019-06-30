import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout.js';
import Head from '../components/head.js'

const NotFound = () => {
  return (
    <Layout>
      <Head title="404"/>
      <h1>Page not found</h1>
      <p><Link to="/">Home</Link></p>
    </Layout>
  )
}
export default NotFound;
import React from 'react';
import { Link } from "gatsby";
import Layout from "../components/layout"
import Head from '../components/head.js'

const AboutPage = () => {
  return (
    <Layout>
      <Head title="About"/>
      <h1>About me</h1>
      <h2>Bio</h2>
      <p>I am a web developper living in Rennes, France</p>
      <p>Need a developper? <Link to='/contact'>Contact me.</Link></p>
    </Layout>
  )
}
export default AboutPage;
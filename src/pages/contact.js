import React from 'react';
import Layout from "../components/layout"

const ContactPage = () => {
  return (
    <Layout>
      <h1>Contact me</h1>
      <p>Olivier Valette</p>
      <p>10 rue Henri Sée, 35700 Rennes</p>
      <p>+33 6 73 27 30 60</p>
      <p>olivier.valette@spi10.com</p>
      <p>Twitter <a href='https://twitter.com/OlivierValette'
                    target="_blank"
                    rel="noopener noreferrer">@OlivierValette</a>
      </p>
    </Layout>
  )
}

export default ContactPage;
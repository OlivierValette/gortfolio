import React from 'react';
import { Link } from 'gatsby'

const IndexPage = () => {
  return (
    <div>
      <h1>Hello,</h1>
      <h2>Olivier Valette, web developper</h2>
      <p>Need a developper? <Link to='/contact'>Contact me.</Link></p>
    </div>
  )
}

export default IndexPage;
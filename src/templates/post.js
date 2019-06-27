import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout.js';
import postStyles from '../templates/post.module.scss';

const Post = (props) => {
  return (
    <Layout>
      <h1>Blog</h1>
      <div className={postStyles.postHeader}>
        <h1 className={postStyles.postHeaderTitle}>
          {props.data.markdownRemark.frontmatter.title}
        </h1>
        <p className={postStyles.postHeaderTimestamp}>
          {props.data.markdownRemark.frontmatter.date}
        </p>
      </div>
      <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
    </Layout>
  )
}
export default Post

export const query = graphql`
  query ($slug: String!) {
    markdownRemark (fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
      }
      html
    }
  }
`

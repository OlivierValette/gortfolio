import React from 'react';
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"

const BlogPage = () => {

  const posts = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const postList = posts.allMarkdownRemark.edges.map( (edge, index) => {
    return (
      <li key={index}>
        <Link to={'/blog/' + edge.node.fields.slug}>
          <h2>{edge.node.frontmatter.title}</h2>
          <p>{edge.node.frontmatter.date}</p>
        </Link>
      </li>
    )
  });

  return (
    <Layout>
      <h1>Blog</h1>
      <ol>{postList}</ol>
    </Layout>
  )
}

export default BlogPage;
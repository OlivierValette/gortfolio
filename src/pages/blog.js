import React from 'react';
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"

const BlogPage = () => {

  const posts = useStaticQuery(graphql`
    query {
      allMarkdownRemark (sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `);

  const postList = posts.allMarkdownRemark.edges.map( (edge, index) => {
    return (
      <li key={index}>
        <Link to={'/blog/' + edge.node.fields.slug}>
          <h2>{edge.node.frontmatter.title}{' '}{edge.node.frontmatter.date}</h2>
          <p>{edge.node.excerpt}</p>
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
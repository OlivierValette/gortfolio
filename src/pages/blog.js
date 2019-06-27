import React from 'react';
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import blogStyles from "./blog.module.scss"

const BlogPage = () => {

  const posts = useStaticQuery(graphql`
    query {
      allMarkdownRemark (sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        edges {
          node {
            frontmatter {
              title
              date(formatString: "DD/MM/YYYY")
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
        <Link to={'/blog/' + edge.node.fields.slug} className={blogStyles.shortPost}>
          <h2 className={blogStyles.shortPostHeader}>
            {edge.node.frontmatter.title}{' '}
          </h2>
          <p className={blogStyles.shortPostTimestamp}>
            {edge.node.frontmatter.date}
          </p>
          <p className={blogStyles.shortPostParagraph}>
            {edge.node.excerpt}
          </p>
        </Link>
      </li>
    )
  });

  return (
    <Layout>
      <h1>Blog</h1>
      <ol className={blogStyles.shortPostList}>{postList}</ol>
    </Layout>
  )
}

export default BlogPage;
import React from 'react';
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import blogStyles from "./blog.module.scss"
import Head from '../components/head.js'

const BlogPage = () => {
/*  MARKDOWN VERSION
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
*/
/*  CONTENTFUL CMS VERSION  */
const posts = useStaticQuery(graphql`
  query {
    allContentfulBlogPost (
      sort: {
        fields:publishedDate,
        order: DESC
      }
    ) {
      edges {
        node {
          title
          slug
          publishedDate(formatString:"DD/MM/YYYY")
        }
      }
    }
  }
`);
/*  MARKDOWN VERSION
  const postList = posts.allMarkdownRemark.edges.map( (edge, index) => {
    return (
      <li key={index}>
        <Link to={'/blog/' + edge.node.fields.slug} className={blogStyles.post}>
          <h2 className={blogStyles.postHeader}>
            {edge.node.frontmatter.title}{' '}
          </h2>
          <p className={blogStyles.postTimestamp}>
            {edge.node.frontmatter.date}
          </p>
          <p className={blogStyles.postParagraph}>
            {edge.node.excerpt}
          </p>
        </Link>
      </li>
    )
  });
*/
/*  CONTENTFUL CMS VERSION  */
  const postList = posts.allContentfulBlogPost.edges.map( (edge, index) => {
    return (
      <li key={index}>
        <Link to={'/blog/' + edge.node.slug} className={blogStyles.post}>
          <h2 className={blogStyles.postHeader}>
            {edge.node.title}{' '}
          </h2>
          <p className={blogStyles.postTimestamp}>
            {edge.node.publishedDate}
          </p>
        </Link>
      </li>
    )
  });
  return (
    <Layout>
      <Head title="Blog"/>
      <h1>Blog</h1>
      <ol className={blogStyles.postList}>{postList}</ol>
    </Layout>
  )
}
export default BlogPage;
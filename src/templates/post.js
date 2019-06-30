import React from 'react';
import { graphql } from 'gatsby';
import { documentToReactComponents} from "@contentful/rich-text-react-renderer"
import Layout from '../components/layout.js';
import Head from '../components/head.js'
import postStyles from '../templates/post.module.scss';

// MARKDOWN VERSION
// const Post = (props) => {
//   return (
//     <Layout>
//       <h1>Blog</h1>
//       <div className={postStyles.postHeader}>
//         <h1 className={postStyles.postHeaderTitle}>
//           {props.data.markdownRemark.frontmatter.title}
//         </h1>
//         <p className={postStyles.postHeaderTimestamp}>
//           {props.data.markdownRemark.frontmatter.date}
//         </p>
//       </div>
//       <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
//     </Layout>
//   )
// }

// CONTENTFUL CMS VERSION
const Post = (props) => {
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title['en-US'];
        const url = node.data.target.fields.file['en-US'].url;
        return <img alt={alt} src={url} />
      }
    }
  }
  return (
    <Layout>
      <Head title={props.data.contentfulBlogPost.title}/>
      <h1>Blog</h1>
      <div className={postStyles.postHeader}>
        <h2 className={postStyles.postHeaderTitle}>
          {props.data.contentfulBlogPost.title}
        </h2>
        <p className={postStyles.postHeaderTimestamp}>
          {props.data.contentfulBlogPost.publishedDate}
        </p>
      </div>
      {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
    </Layout>
  )
}
export default Post

// MARKDOWN VERSION
// export const query = graphql`
//   query ($slug: String!) {
//     markdownRemark (fields: { slug: { eq: $slug } }) {
//       frontmatter {
//         title
//         date(formatString: "DD/MM/YYYY")
//       }
//       html
//     }
//   }
// `

// CONTENTFUL CMS VERSION
export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: {eq: $slug}) {
      title
      publishedDate(formatString: "DD/MM/YYYY")
      body {
        json
      }
    }
  }
`
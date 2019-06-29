const path = require('path')

/* SLUG creation for Markdown posts version
  module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  // target MarkdownRemark type nodes
  if (node.internal.type === 'MarkdownRemark') {
    // get filename, without extension
    const slug = path.basename(node.fileAbsolutePath, '.md');
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
}
*/

/* Page creation for Markdown posts version
module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // get path to template
  const postTemplate = path.resolve('./src/templates/post.js');
  // get markdown data
  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  // create new pages
  res.data.allMarkdownRemark.edges.forEach( (edge) => {
    createPage({
      component: postTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug
      }
    })
  })
}
*/

/* Page creation for Contentful Blog posts version */
module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // get path to template
  const postTemplate = path.resolve('./src/templates/post.js');
  // get markdown data
  const res = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  // create new pages
  res.data.allContentfulBlogPost.edges.forEach( (edge) => {
    createPage({
      component: postTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })
}
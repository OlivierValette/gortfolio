#  A Portfolio with Gatsby

Gatsby is a React framework for fast websites and web applications (and not only static websites).
Powered by React and GraphQL.

Following [The Great Gatsby Bootcamp](https://www.youtube.com/watch?v=kzWIUX3CpuI)

## 🚀 Quick start

0.  **Install Gatsby**

    ```sh
    npm install -g gatsby-cli
    ```

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the hello-world starter.

    ```sh
    # create a new Gatsby site using the hello-world starter
    gatsby new portfolio https://github.com/gatsbyjs/gatsby-starter-hello-world
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd portfolio
    npm run develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `portfolio` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

1. **Replace GraphiQL IDE by playground**

     Create a `.env.development` file with:
     ```dotenv
     GATSBY_GRAPHQL_IDE=playground
     ```
     In terminal, run:
     ```sh
     npm install --save-dev env-cmd
     ```
     and change `develop` script in `package.json` with:
     ```json
      .env
      ```

## 👨🏻‍🏫 Tutorial

### Pages 

A `page` folder (in `src`) contains as many files as pages on the website. Each filename is associated with an URL (`blog.js` with `/blog`).
Each file contains a React component.

### Links

For internal links, Gatsby provides a JSX `<Link to='/xxx'>` component with optimized rendering.

External links use the standard HTML `<a>` tag

### Shared page components

Shared components are stored in files under another folder, `src/components` folder for instance.

### Styling

Creating a `styles` subfolder for css files

#### scss plugin: gatsby-plugin-sass

Provides drop-in support for SASS/SCSS stylesheets

Install with:
```sh
npm install --save node-sass gatsby-plugin-sass
```

Include the plugin in the `gatsby-config.js` file.
```sh
module.exports = {
    ...
    plugins: ['gatsby-plugin-sass']
    ...
}
```

#### reset css

A reset css file, which can be inserted in the `index.scss` file, can be found at links.mead.io/gatsbystyles 


#### CSS Modules

CSS modules allow to define locally scoped styles.

A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.

CSS Modules automatically generates unique class and animation names, avoiding selector name collisions.

For a component Layout of a `layout.js` file for instance, scss is defined in a `layout.module.scss` associated file.
Style is imported with:
```js
import layoutStyles from './layout.module.scss';
```
When importing the CSS Module from a JS Module, it exports an object with all mappings from local names to global names.
So it can be used with:
```jsx harmony
<div className={layoutStyles.container}>
```
where `container` is a class defined in `layout.module.scss`

#### Typography.js
`Typography.js` is a JavaScript library which generates global base styles for your site’s typography.
The library has a corresponding Gatsby plugin to streamline using it in a Gatsby site.
```sh
npm install --save gatsby-plugin-typography react-typography typography
npm install --save typography typography-theme-ocean-beach
```
and configure it in the `gatsby-config.js` file:
```js
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
```
`pathToConfigModule` option gives the path to the configuration file needed by Typography.js:
```js
import Typography from "typography"
import oceanBeachTheme from 'typography-theme-ocean-beach'

const typography = new Typography(oceanBeachTheme)
export const { scale, rhythm, options } = typography
export default typography
```

### GraphQL API

Use of GraphQL API to get data dynamically from various sources: CMS, Markdown files, API, databases, YAML, JSON or csv...

GraphQL is a query language for APIs. GraphQL APIs have been widely adopted by developers because of some of the benefits
they offer over RESTful APIs. One of the biggest benefits is that GraphQL allows for smarter and more precise querying 
which is especially useful when working with large APIs that return a lot of data. 
GraphQL enables users to specify exactly what data they get back in their response – nothing more, and nothing less; 
and it allows querying for multiple fields in a single request.

#### Query site configuration data in `gatsby-config.js`

In `gatsby-config-js`, add:
```js
  siteMetadata: {
    title: 'Portfolio',
    author: 'Olivier Valette',
  },
```
Retrieve data with a query;
first add:
```js
import { graphql, useStaticQuery } from 'gatsby';
```
execute query:
```js
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
```
Page queries live outside of the component definition — by convention at the end of a page component file —
and are only available on page components.
`StaticQuery` is a new API introduced in Gatsby v2 that allows non-page components (like `layout.js` component),
to retrieve data via GraphQL queries, its newly introduced hook version is `useStaticQuery`.

Finally access to retrieved data using the same structure 
`{data.site.siteMetadata.title}`

#### Query data in other files

Install the `gatsby-source-filesystem` plugin which creates File nodes from files.
```sh
npm install --save gatsby-source-filesystem
```
some configuration is needed adding in file `gatsby-config.js`:
```js
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
```
A “transformer” plugin is needed which can transform File nodes into various other types of data:
- `gatsby-transformer-json` transforms JSON files into JSON data nodes
- `gatsby-transformer-remark` transforms markdown files into MarkdownRemark nodes from which you can query an
 HTML representation of the markdown

Install `gatsby-transformer-remark` with:
```sh
npm install --save gatsby-transformer-remark
```
just adding the plugin in the configuration file `gatsby-config.js`

query with:
```js
const posts = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            html
            excerpt
          }
        }
      }
    }
  `);
```
To get an array of nodes in `{posts.allMarkdownRemark.edges}`

#### Adding data in nodes with the Gatsby Node API

To add a slug for instance, first create a `gatsby-node.js` file 
with the `onCreateNode` function which will be called by Gatsby 
whenever a new node is created (or updated) and the `createNodeField` 
function which create additional fields on nodes created by other plugins:
```js
const path = require('path')

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  // target MarkdownRemark type nodes
  if (node.internal.type === 'MarkdownRemark') {
    // get filename, without extension
    const slug = path.basename(node.fileAbsolutePath, '.md')
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
}
```

#### Creating pages dynamically

This is done with the Gatsby Node API `creatPages`, thus in `gatsby-node.js` file, with an `async` in order to wait for
the graphql query response used to retrieve the slug:
```js
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
}
```
Like everything in Gatsby, programmatic pages are powered by React components.
When creating a page, you need to specify which component to use.
Add a directory at `src/templates`
Add a file named `src/templates/post.js`
`postTemplate` is the path to this file.

Then create new pages for each node:
```js
  // create new pages
  res.data.allMarkdownRemark.edges.forEach( (edge) => {
    createPage({
      path: `/blog/${edge.node.fields.slug}`,
      component: postTemplate,
      context: {
        slug: edge.node.fields.slug
      }
    })
  })
```

### images

Using images in markdown posts:
```md
![Grass](./grass.jpg)
```

Another 3 plugins are necessary to tell Gatsby how to connect images.
```sh
npm install gatsby-plugin-sharp gatsby-remark-images gatsby-remark-relative-images
```
with configuration:
```js
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            }
          }
        ]
      }
    },
```

### Sourcing CMS (Contentful)
In this example, Contenful has been choosen. 
Same can be done with WordPress or Drupal.

Install the `gatsby-source-contentful` plugin:
```sh
npm install --save gatsby-source-contentful
```
some configuration is needed adding in file `gatsby-config.js`:
```js
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
```
`spaceId` and `accessToken` parameters are accessed with the `.env.development` file.
Their values are copied from Contentful settings page in this file:
```dotenv
CONTENTFUL_SPACE_ID=xa3wfrfrefvd4
CONTENTFUL_ACCESS_TOKEN=id2TMkljhupr6pi99swJTbgbQHDsPImEH-74Svsx9w
```

Once the plugin added, Contentful blog posts can be fetched with graphQL `allContentfulBlogPost`.
```js
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
```
And posts retrieved with **one more plugin**.
The body of the post is in rich-text format and may contains assets (image for instance).
This complex body is retrieved in json format, the plugin allow to render the json directly in React components.

Install the plugin:
```sh
npm i @contentful/rich-text-rect-renderer
```
And use the `documentToReactComponents` function this way:
```js
const Post = (props) => {
  // options for image rendering
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
```

### React Helmet
Adding metadata to pages (such as a title or description) is key in helping search engines like Google understand your
content and decide when to surface it in search results.

React Helmet is a package that provides a React component interface for you to manage your document head.

Install the plugin:
```sh
npm install --save gatsby-plugin-react-helmet react-helmet
```
And just add `gatsby-plugin-react-helmet` in th plugin list in `gatsby-config.js`

Adding a `Head` component for title rendering:
```js
import React from 'react';
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from 'gatsby';

const Head = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
  `);
  return (
    <Helmet>
      <meta charSet="utf-8"/>
      <title>{`${title} | ${data.site.siteMetadata.title}`} </title>
    </Helmet>
  );
}
export default Head;
```

## Deploying a Gatsby site (Netlify)

Netlify is an excellent option for deploying Gatsby sites.
Netlify is a unified platform that automates your code to create high-performant, easily maintainable sites, 
and web apps. They provide continuous deployment (Git-triggered builds), an intelligent, global CDN, 
full DNS (including custom domains), automated HTTPS, asset acceleration, and a lot more.

Their free tier includes unlimited personal and commercial projects, HTTPS, continuous deployment 
from public or private repos and more.

#### Deploy from a Git Repository
- Login to Netlify
- Select `New site from git` button
- Connect with the same git provider that you used to host your website
- Authorize Netlify to use your account
- Choose your website repository
- Define the **environment variables** as they are defined in the `.env` file (which is not committed).
   -  CONTENTFUL_SPACE_ID
   -  CONTENTFUL_ACCESS_TOKEN
- Deploy site

#### Continuous Deployment

1. When **changing content** on Contentful:
  Deploy manually with `Trigger deploy` button.
  
2. When **changing code**:
  git commit and push to automatically trigger a deploy.

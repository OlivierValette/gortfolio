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
      "env-cmd -f .env.development gatsby develop"
      ```

##  Tutorial

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


### CSS Modules

CSS modules allow to define locally scoped styles.
For a component Layout of a `layout.js` file for instance, scss is defined in a `layout.module.scss` associated file.
Style is imported with:
```js
import layoutStyles from './layout.module.scss';
```
and used with:
```jsx harmony
<div className={layoutStyles.container}>
```
where `container` is a class defined in `layout.module.scss`

### GraphQL API

Use of GraphQL API to get data dynamically from various sources: CMS, Markdown files, API, databases, YAML, JSON or csv... 

#### Query site configuration data in `gatsby-config-js`

In `gatsby-config-js`, add:
```json
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
and use data retrieved using the same structure 
`{data.site.siteMetadata.title}`

#### Query data in other files

Install the `gatsby-source-filesystem` plugin which creates File nodes from files.
```sh
npm install --save gatsby-source-filesystem
```
some configuration is needed adding in file `gatsby-config-js`:
```json
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

To add a slug for instance, first creat a In `gatsby-node-js` file with:
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
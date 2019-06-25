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
    
    or
    
    ```sh
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `portfolio` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!


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


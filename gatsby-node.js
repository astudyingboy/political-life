/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const postTemplate = path.resolve('src/templates/post.js')
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            html
            id
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }
    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { id, fileAbsolutePath } = node
      let defaultPath = fileAbsolutePath.replace(`${__dirname}/src/pages`, '')
      defaultPath = defaultPath.substring(0, defaultPath.lastIndexOf('.'))
      createPage({
        // path: node.frontmatter.path,
        path: defaultPath,
        component: postTemplate,
        context: { id },
      })
    })
  })
}

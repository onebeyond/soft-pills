import * as React from "react"
import {useMemo} from 'react';
import {Link, graphql} from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PillCard from "../components/PillCard"

const BlogIndex = ({data, location}) => {
  console.log('data', data);
  const siteTitle = data.site.siteMetadata ?. title || `Title`
  // const posts = data.allMarkdownRemark.nodes
  const pills = data.allMarkdownRemark.edges;
  console.log('pills', pills)

  const renderedPills = useMemo(() => {
    if (pills.length === 0) {
      return (<p>
        No pills found.
      </p>)
    } else {
      return pills.map((pill, i) => {
        console.log('pill', pill);
        return (<li>
          <PillCard title={
            pill.node.frontmatter.title
          }/>
        </li>)
      })
    }
  }, [pills])


  return (<Layout location={location}
    title={siteTitle}>
    <ul> {renderedPills} </ul>
  </Layout>);

  // return (<Layout location={location}
  // title={siteTitle}> {/* <Bio/> */}
  // <ol style={
  //     {listStyle: `none`}
  // }> {
  //     posts.map(post => {
  //       const title = post.frontmatter.title || post.fields.slug

  //       return (<li key={
  //         post.fields.slug
  //       }>
  //         <article className="post-list-item" itemScope itemType="http://schema.org/Article">
  //           <header>
  //             <h2>
  //               <Link to={
  //                   post.fields.slug
  //                 }
  //                 itemProp="url">
  //                 <span itemProp="headline"> {title}</span>
  //               </Link>
  //             </h2>
  //             <small> {
  //               post.frontmatter.date
  //             }</small>
  //           </header>
  //           <section>
  //             <p dangerouslySetInnerHTML={
  //                 {
  //                   __html: post.frontmatter.description || post.excerpt
  //                 }
  //               }
  //               itemProp="description"/>
  //           </section>
  //         </article>
  //       </li>)
  //     })
  // } </ol>
  // </Layout>)
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts"/>


export const pageQuery2 = graphql `
query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            description
          }
          id
        }
      }
    }
}
`;

// export const pageQuery = graphql `
// {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allMarkdownRemark(
//       sort: { frontmatter: { date: DESC } }) {
//       nodes {
//         excerpt
//         fields {
//           slug
//         }
//         frontmatter {
//           date(formatString: "MMMM DD, YYYY")
//           title
//           description
//         }
//       }
//     }
// }
// `

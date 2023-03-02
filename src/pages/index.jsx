import React, { useMemo } from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import PillCard from '../components/PillCard';

function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const pills = data.allMarkdownRemark.edges;

  const renderedPills = useMemo(() => {
    if (pills.length === 0) {
      return (
        <Typography variant="h5">
          No pills found.
        </Typography>
      );
    }
    return pills.map((pill) => {
      const { node: { frontmatter: { title, description } } } = pill;
      return (
        <ListItem key={`li-${title}`}>
          <PillCard
            title={title}
            description={description}
            key={`card-${title}`}
          />
        </ListItem>
      );
    });
  }, [pills]);

  return (
    <Layout
      location={location}
      title={siteTitle}
    >
      <List>{renderedPills}</List>
    </Layout>
  );

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

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export function Head() {
  return <Seo title="All posts" />;
}

export const pageQuery2 = graphql`
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

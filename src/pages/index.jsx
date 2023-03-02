import React, { useMemo } from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
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
      <SEO>
        <List>{renderedPills}</List>
      </SEO>
    </Layout>
  );
}

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
// export function Head() {
//   return <Seo title="All posts" />;
// }

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

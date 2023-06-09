const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const fetch = require(`node-fetch`);

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`);
  const resultData = await result.json();

  resultData.results.forEach(async (pokemon, index) => {
    createNode({
      pokemon: pokemon,
      id: `entry${index}`,
      parent: null,
      children: [`entry${index}-data`],
      internal: {
        type: `PokedexEntry`,
        contentDigest: createContentDigest(pokemon),
      },
    });
  });
};

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  createContentDigest,
}) => {
  const { createNodeField, createNode } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `src/` });
    const pokemonId = node.frontmatter.id;

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });

    createNodeField({
      node,
      name: `pokemonId`,
      value: pokemonId,
    });
  }

  if (node.internal.type === `PokedexEntry`) {
    const entry = await fetch(node.pokemon.url);
    const pokemonData = await entry.json();

    const pokemonMeta = await fetch(pokemonData.species.url);
    const pokemonMetaData = await pokemonMeta.json();

    createNode({
      pokemonData: pokemonData,
      id: `${node.id}-data`,
      parent: `${node.id}`,
      children: [`${node.id}-metaData`],
      internal: {
        type: `PokemonData`,
        contentDigest: createContentDigest(pokemonData),
      },
    });

    createNode({
      pokemonMetaData: pokemonMetaData,
      id: `${node.id}-metaData`,
      parent: `${node.id}-data`,
      children: [],
      internal: {
        type: `pokemonMetaData`,
        contentDigest: createContentDigest(pokemonMetaData),
      },
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { frontmatter: { number: ASC } }) {
        edges {
          node {
            fields {
              slug
              pokemonId
            }
          }
        }
      }
    }
  `);

  const results = result.data.allMarkdownRemark.edges;
  results.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/pokedexEntry.jsx`),
      context: {
        slug: node.fields.slug,
        prev: index === 0 ? null : results[index - 1].node,
        next: index === results.length - 1 ? null : results[index + 1].node,
        pokemonId: node.fields.pokemonId,
      },
    });
  });
};

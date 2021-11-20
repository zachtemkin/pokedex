import React from "react";
import { Link, graphql } from "gatsby";
import MainPage from "../templates/mainPage";
import PropTypes from "prop-types";
// import { node } from "webpack";

const Index = ({ data }) => {
  const entries = data.allMarkdownRemark.edges;
  const allPokemon = data.allPokedexEntry.nodes;

  return (
    <MainPage className='pokemon-list' pageTitle='National Pokedex'>
      <div className='pokemon-list__wrapper'>
        <h1 className='pokemon-list__title'>Kanto Pokedex</h1>
        <ol className='pokemon-list__list'>
          {allPokemon.map((entry) => {
            const pokemonId =
              entry.childPokemonData.childPokemonMetaData.pokemonMetaData.id;
            const pokemonNames =
              entry.childPokemonData.childPokemonMetaData.pokemonMetaData.names;
            const enNameEntry = pokemonNames.filter(
              (entry) => entry.language.name === "en"
            );
            const jaNameEntry = pokemonNames.filter(
              (entry) => entry.language.name === "ja"
            );
            const getEntryPage = entries.filter(
              ({ node }) => node.frontmatter.id === pokemonId
            );

            const entryPageNode =
              getEntryPage[0] !== undefined ? getEntryPage[0].node : undefined;

            return entryPageNode !== undefined ? (
              <li
                key={pokemonId}
                id={pokemonId}
                className='pokemon pokemon--is-captured'>
                <Link className='pokemon__link' to={entryPageNode.fields.slug}>
                  {`${entryPageNode.frontmatter.number}: ${enNameEntry[0].name} / ${jaNameEntry[0].name}`}
                </Link>
              </li>
            ) : (
              <li
                key={pokemonId}
                className='pokemon'>{`${enNameEntry[0].name} / ${jaNameEntry[0].name}`}</li>
            );
          })}
        </ol>
      </div>
    </MainPage>
  );
};

Index.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___number, order: ASC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            colors {
              backgroundColor
              textColor
            }
            illustrationLayers {
              id
            }
            number
            id
          }
        }
      }
    }
    allPokedexEntry {
      nodes {
        childPokemonData {
          childPokemonMetaData {
            pokemonMetaData {
              id
              names {
                name
                language {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
export default Index;

import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import MainPage from "../templates/mainPage";
import PropTypes from "prop-types";
import incompleteEntryImage from "../assets/images/incomplete-entry-image.png";

const Index = ({ data }) => {
  const entries = data.allMarkdownRemark.edges;
  const allPokemon = data.allPokedexEntry.nodes;

  const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  };

  return (
    <MainPage className='pokemon-list' pageTitle='National Pokedex'>
      <div className='pokemon-list__wrapper'>
        <ol className='pokemon-list__list'>
          {allPokemon.map((entry) => {
            const pokemonId =
              entry.childPokemonData.childPokemonMetaData.pokemonMetaData.id;

            const pokedexNumbers =
              entry.childPokemonData.childPokemonMetaData.pokemonMetaData
                .pokedex_numbers;

            const kantoPokedexNumberObj = pokedexNumbers.filter(
              (item) => item.pokedex.name === "kanto"
            );

            const kantoPokedexNumber = pad(
              kantoPokedexNumberObj[0].entry_number,
              3
            );

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

            const compositeImage =
              entryPageNode !== undefined
                ? entryPageNode.frontmatter.compositeImage[0]
                : undefined;

            return entryPageNode !== undefined ? (
              <li
                key={pokemonId}
                id={pokemonId}
                className='pokemon pokemon--is-captured'>
                <Link
                  style={{
                    backgroundColor:
                      entryPageNode.frontmatter.colors.backgroundColor,
                    color: entryPageNode.frontmatter.colors.textColor,
                  }}
                  className='pokemon__entry-container'
                  to={entryPageNode.fields.slug}>
                  <p className='pokemon__link__item pokemon__number'>
                    {`${kantoPokedexNumber}`}
                  </p>

                  <div className='pokemon__entry-image-container'>
                    <GatsbyImage
                      className='pokemon__entry-image'
                      image={getImage(compositeImage)}
                      alt='pokemon'
                    />
                  </div>

                  <div className='pokemon__names-container'>
                    <p className='pokemon__link__item pokemon__en-name'>
                      {`${enNameEntry[0].name}`}
                    </p>
                    <p className='pokemon__link__item pokemon__jp-name'>{`${jaNameEntry[0].name}`}</p>
                  </div>
                </Link>
              </li>
            ) : (
              <li key={pokemonId} className='pokemon'>
                <div className='pokemon__entry-container'>
                  <span className='pokemon__number'>
                    {`${kantoPokedexNumber}`}
                  </span>

                  <div className='pokemon__entry-image-container'>
                    <StaticImage
                      className='pokemon__entry-image'
                      src='../assets/images/incomplete-entry-image.png'
                      alt='question mark'
                      placeholder='blurred'
                      width={300}
                    />
                  </div>

                  <div className='pokemon__names-container'>
                    <p className='pokemon__en-name'>
                      {`${enNameEntry[0].name}`}
                    </p>
                    <p className='pokemon__jp-name'>{`${jaNameEntry[0].name}`}</p>
                  </div>
                </div>
              </li>
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
    allMarkdownRemark(sort: { frontmatter: { number: ASC } }) {
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
            compositeImage {
              childImageSharp {
                gatsbyImageData(
                  formats: [AUTO, WEBP]
                  placeholder: BLURRED
                  width: 300
                )
              }
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
              pokedex_numbers {
                entry_number
                pokedex {
                  name
                }
              }
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

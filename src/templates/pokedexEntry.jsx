import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import MainPage from "../templates/mainPage";
import Illustration from "../components/illustration";
import PokemonDetails from "../components/pokemonDetails";
import ToggleDetailsButton from "../components/toggleDetailsButton";
import Arrow from "../components/arrows";
import PropTypes from "prop-types";

const PokemonDetail = ({ data, pageContext }) => {
  const { next, prev } = pageContext;
  const nextPost = next ? next.fields.slug : null;
  const prevPost = prev ? prev.fields.slug : null;

  const frontmatter = data.markdownRemark.frontmatter;

  // Pokemon Data /////////////////////////////////////////////////////////////

  const pokemonDesctiptions =
    data.pokedexEntry.childPokemonData.childPokemonMetaData.pokemonMetaData
      .flavor_text_entries;

  const englishDescription = pokemonDesctiptions.filter(
    (entry) => entry.language.name === "en" && entry.version.name === "red"
  );

  const flavorText = englishDescription[0].flavor_text;
  const height = data.pokedexEntry.childPokemonData.pokemonData.height;
  const weight = data.pokedexEntry.childPokemonData.pokemonData.weight;
  const types = data.pokedexEntry.childPokemonData.pokemonData.types;
  const abilities = data.pokedexEntry.childPokemonData.pokemonData.abilities;
  const evolvesFrom =
    data.pokedexEntry.childPokemonData.childPokemonMetaData.pokemonMetaData
      .evolves_from_species;
  const habitat =
    data.pokedexEntry.childPokemonData.childPokemonMetaData.pokemonMetaData
      .habitat.name;

  const names =
    data.pokedexEntry.childPokemonData.childPokemonMetaData.pokemonMetaData
      .names;

  const enNameEntry = names.filter((entry) => entry.language.name === "en");
  const enName = enNameEntry[0].name;

  const jpNameEntry = names.filter((entry) => entry.language.name === "ja");
  const jpName = jpNameEntry[0].name;

  ////////////////////////////////////////////////////////////////////////////////

  const [detailIsVisible, setDetailIsVisible] = useState(false);
  const [illustrationOffset, setIllustrationOffset] = useState({ x: 0, y: 0 });

  const toggleClick = () =>
    detailIsVisible ? setDetailIsVisible(false) : setDetailIsVisible(true);

  const w = typeof window !== "undefined" ? window.innerWidth : 1;
  const h = typeof window !== "undefined" ? window.innerHeight : 1;

  const transformIllustration = (e) => {
    const illustrationOffsetX = 0.5 - e.clientX / (0.5 * w);
    const illustrationOffsetY = 0.5 - e.clientY / (0.5 * h);
    setIllustrationOffset({ x: illustrationOffsetX, y: illustrationOffsetY });
  };

  const PrevNextControls = () => (
    <div
      className={
        "pokedex-entry__prev-next-links " +
        (detailIsVisible ? "pokedex-entry__prev-next-links--hidden" : "")
      }
      style={{ color: frontmatter.colors.textColor }}>
      {prevPost ? (
        <Link
          to={prevPost}
          className='pokedex-entry__arrow-button pokedex-entry__arrow-button--prev'>
          <Arrow direction='left' color={frontmatter.colors.textColor} />
        </Link>
      ) : (
        <p className='pokedex-entry__arrow-button pokedex-entry__arrow-button--prev pokedex-entry__arrow-button--disabled'></p>
      )}

      {nextPost ? (
        <Link
          to={nextPost}
          className='pokedex-entry__arrow-button pokedex-entry__arrow-button--next'>
          <Arrow direction='right' color={frontmatter.colors.textColor} />
        </Link>
      ) : (
        <p className='pokedex-entry__arrow-button pokedex-entry__arrow-button--next pokedex-entry__arrow-button--disabled'></p>
      )}
    </div>
  );

  const Frame = ({ position }) => (
    <div
      className={`pokedex-entry__frame pokedex-entry__frame--${position} ${
        detailIsVisible && " pokedex-entry__frame--inactive"
      }`}
      style={{ color: frontmatter.colors.textColor }}>
      <Link to='/' className='frame-text'>
        Kanto Pokedex
      </Link>
      <Link to='/' className='frame-text'>
        Kanto Pokedex
      </Link>
    </div>
  );

  Frame.propTypes = {
    position: PropTypes.string,
  };

  return (
    <MainPage
      className='pokedex-entry'
      backgroundColor={frontmatter.colors.backgroundColor}
      pageTitle='test'>
      <div
        className='pokedex-entry__container'
        style={{ color: frontmatter.colors.textColor }}
        onMouseMove={
          typeof window !== "undefined" && window.innerWidth >= 720
            ? (e) => transformIllustration(e)
            : null
        }>
        {frontmatter.illustrationLayers && (
          <Illustration
            illustration={frontmatter.illustrationLayers}
            illustrationOffset={illustrationOffset}
            isInactive={detailIsVisible}
          />
        )}

        <PokemonDetails
          abilities={abilities}
          backgroundColor={frontmatter.colors.backgroundColor}
          color={frontmatter.colors.textColor}
          description={flavorText}
          detailIsVisible={detailIsVisible}
          evolvesFrom={evolvesFrom}
          habitat={habitat}
          height={height}
          names={{ en: enName, jp: jpName }}
          number={frontmatter.number}
          onToggleClick={toggleClick}
          types={types}
          typeColors={frontmatter.types ? frontmatter.types : null}
          weight={weight}
        />
        <div
          className={
            "pokedex-entry__meta-data " +
            (detailIsVisible ? "pokedex-entry__meta-data--hidden" : "")
          }>
          <h1 className='pokedex-entry__meta-data__number'>
            {"No. " + frontmatter.number}
          </h1>
          <h1
            className='pokedex-entry__meta-data__name-en'
            style={{
              color: frontmatter.colors.textColor,
              WebkitTextFillColor: "transparent",
              WebkitTextStrokeColor: frontmatter.colors.textColor,
            }}>
            {enName}
          </h1>
          <h1 className='pokedex-entry__meta-data__name-jp'>{jpName}</h1>
          <ToggleDetailsButton
            detailIsVisible={detailIsVisible}
            onClick={toggleClick}
          />
        </div>
      </div>
      <div className='pokedex-entry__controls'>
        <PrevNextControls />
        <Frame position='top' />
        <Frame position='bottom' />
      </div>
    </MainPage>
  );
};

PokemonDetail.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
};

export const query = graphql`
  query ($slug: String!, $pokemonId: Int!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        colors {
          backgroundColor
          textColor
        }
        number
        types {
          color
        }
        illustrationLayers {
          publicURL
          childImageSharp {
            gatsbyImageData(formats: [AUTO, WEBP])
          }
        }
      }
    }
    pokedexEntry(
      childPokemonData: { pokemonData: { id: { eq: $pokemonId } } }
    ) {
      childPokemonData {
        pokemonData {
          height
          weight
          types {
            type {
              name
            }
          }
          abilities {
            ability {
              name
            }
          }
        }
        childPokemonMetaData {
          pokemonMetaData {
            evolves_from_species {
              name
            }
            flavor_text_entries {
              flavor_text
              version {
                name
              }
              language {
                name
              }
            }
            habitat {
              name
            }
            names {
              language {
                name
              }
              name
            }
          }
        }
      }
    }
  }
`;
export default PokemonDetail;

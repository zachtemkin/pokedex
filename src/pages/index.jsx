import React from "react"
import { Link, graphql } from "gatsby"
import MainPage from "../templates/mainPage"
import PropTypes from "prop-types"

const Index = ({ data }) => {
  const entries = data.allMarkdownRemark.edges

  return (
    <MainPage className="pokemon-list" pageTitle="National Pokedex">
      <div className="pokemon-list__wrapper">
        <h1 className="pokemon-list__title">National Pokedex</h1>
        <ol className="pokemon-list__list">
          {entries.map(({ node }, index) => {
            console.log(node.frontmatter.id)
            const pokemonNode =
              data.allPokedexEntry.nodes[node.frontmatter.id - 1]
            const pokemonNames =
              pokemonNode.childPokemonData.childPokemonMetaData.pokemonMetaData
                .names

            const enNameEntry = pokemonNames.filter(
              entry => entry.language.name === "en"
            )
            const enName = enNameEntry[0].name

            const jpNameEntry = pokemonNames.filter(
              entry => entry.language.name === "ja"
            )
            const jpName = jpNameEntry[0].name

            return (
              <li className="pokemon" key={node.id}>
                <Link to={node.fields.slug}>
                  {`${node.frontmatter.number}: ${enName} / ${jpName}`}
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </MainPage>
  )
}

Index.propTypes = {
  data: PropTypes.object,
}

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
`
export default Index

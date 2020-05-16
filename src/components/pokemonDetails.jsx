import React from "react"
import ToggleDetailsButton from "../components/toggleDetailsButton"
import PropTypes from "prop-types"

const PokemonDetails = props => {
  const {
    abilities,
    backgroundColor,
    color,
    description,
    detailIsVisible,
    evolvesFrom,
    habitat,
    height,
    names,
    number,
    onToggleClick,
    types,
    typeColors,
    weight,
  } = props

  return (
    <div
      className={
        "pokemon-details " + (detailIsVisible ? "pokemon-details--visible" : "")
      }
    >
      <div className="pokemon-details__row">
        <ToggleDetailsButton
          detailIsVisible={detailIsVisible}
          onClick={onToggleClick}
        />
      </div>
      <p className="pokemon-details__row name">{`${number}: ${names.en} / ${names.jp}`}</p>
      <div className="pokemon-details__row types">
        {types.map((type, index) => (
          <p
            className="type"
            style={{
              backgroundColor: typeColors ? typeColors[index].color : "#000",
              color: backgroundColor,
            }}
            key={index}
          >
            {type.type.name}
          </p>
        ))}
      </div>
      <p className="pokemon-details__row" style={{ color: color }}>
        {description}
      </p>
      <p className="pokemon-details__row">{`Height: ${height / 10} m`}</p>
      <p className="pokemon-details__row">{`Weight: ${weight / 10} kg`}</p>

      {abilities.map((node, index) => (
        <p
          className="pokemon-details__row"
          key={index}
        >{`Ability: ${node.ability.name}`}</p>
      ))}

      {evolvesFrom !== null && (
        <p className="pokemon-details__row">{`Evolves From: ${evolvesFrom.name}`}</p>
      )}

      <p className="pokemon-details__row">{`Habitat: ${habitat}`}</p>
    </div>
  )
}

PokemonDetails.propTypes = {
  abilities: PropTypes.array,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  description: PropTypes.string,
  detailIsVisible: PropTypes.bool,
  evolvesFrom: PropTypes.object,
  habitat: PropTypes.string,
  height: PropTypes.number,
  names: PropTypes.object,
  number: PropTypes.string,
  onToggleClick: PropTypes.func,
  types: PropTypes.array,
  typeColors: PropTypes.array,
  weight: PropTypes.number,
}

export default PokemonDetails

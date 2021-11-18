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
      <p className="pokemon-details__row name">
        <b>{`${number}:\xa0`}</b>
        {`${names.en} / ${names.jp}`}
      </p>
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
      <p className="pokemon-details__row">
        <b>Height:</b> {`\xa0${height / 10} m`}
      </p>
      <p className="pokemon-details__row">
        <b>Weight:</b> {`\xa0${weight / 10} kg`}
      </p>

      {abilities && (
        <div className="pokemon-details__row pokemon-details__row--list">
          <p className="pokemon-details__row-header">Abilities:</p>
          <ul>
            {abilities.map((node, index) => (
              <li
                className="pokemon-details__row pokemon-details__row--list-item"
                key={index}
              >
                &mdash; {node.ability.name} &mdash;
              </li>
            ))}
          </ul>
        </div>
      )}

      {evolvesFrom !== null && (
        <p className="pokemon-details__row">
          <b>{`Evolves From:\xa0`}</b>
          {`${evolvesFrom.name}`}
        </p>
      )}

      <p className="pokemon-details__row">
        <b>{`Habitat:\xa0`}</b>
        {`${habitat}`}
      </p>
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

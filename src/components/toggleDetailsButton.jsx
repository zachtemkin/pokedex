import React from "react"
import PropTypes from "prop-types"

const ToggleDetailsButton = ({ detailIsVisible, onClick }) => (
  <button className="toggle-details-button" onClick={onClick}>
    {detailIsVisible ? "Close" : "More Info"}
  </button>
)

ToggleDetailsButton.propTypes = {
  detailIsVisible: PropTypes.bool,
  onClick: PropTypes.func,
}

export default ToggleDetailsButton

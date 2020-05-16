import React from "react"
import PropTypes from "prop-types"

const Arrow = ({ direction, color }) => {
  color = color || "#000000"

  const LeftArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219.42 145.42">
      <path
        d="M2.42 73.21h217M74.42 144.71l-73-72 73-72"
        style={{
          fill: "none",
          stroke: `${color}`,
          strokeMiterLimit: "10",
          strokeWidth: "3px",
        }}
      />
    </svg>
  )

  const RightArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219.42 145.42">
      <path
        d="M217 72.21H0M145 .71l73 72-73 72"
        style={{
          fill: "none",
          stroke: `${color}`,
          strokeMiterLimit: "10",
          strokeWidth: "3px",
        }}
      />
    </svg>
  )

  if (direction === "left") {
    return <LeftArrow />
  } else if (direction === "right") return <RightArrow />
  else return ""
}

Arrow.propTypes = {
  direction: PropTypes.string,
  color: PropTypes.string,
}

export default Arrow

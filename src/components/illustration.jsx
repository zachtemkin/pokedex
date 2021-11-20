import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";

const Illustration = ({ illustration, illustrationOffset, isInactive }) => {
  return (
    <div
      className={
        "illustration " + (isInactive ? "illustration--inactive" : "")
      }>
      <div
        className='illustration-wrapper'
        style={{
          transform: `translateY(${-illustrationOffset.x * 4}px)
                      rotateX(${-illustrationOffset.y * 2}deg)
                      rotateY(${illustrationOffset.x * 4}deg)`,
        }}>
        {illustration.map((layer, index) => (
          <GatsbyImage
            className='illustration-wrapper__layer'
            style={{
              transform: `translateX(${illustrationOffset.x * (index + 1)}px)
                          translateY(${illustrationOffset.y * (index + 1)}px)
                          translateZ(${-200 * (index + 1)}px)
                          scale(${0.25 * index + 1})`,
            }}
            image={getImage(layer)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

Illustration.propTypes = {
  illustration: PropTypes.array,
  illustrationOffset: PropTypes.object,
  isInactive: PropTypes.bool,
};

export default Illustration;

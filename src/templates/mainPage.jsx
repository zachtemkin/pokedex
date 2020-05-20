import React from "react"
import SEO from "../components/seo"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import PropTypes from "prop-types"

const MainPage = ({ children, className, pageTitle, backgroundColor }) => {
  const { title } = useSiteMetadata()

  return (
    <React.Fragment>
      <SEO title={title} backgroundColor={backgroundColor}/>
      <div
        className={"page " + className}
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </div>
    </React.Fragment>
  )
}

MainPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  pageTitle: PropTypes.string,
  backgroundColor: PropTypes.string,
}

export default MainPage

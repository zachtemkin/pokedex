import React from "react"
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "../hooks/use-site-metadata"
import PropTypes from "prop-types"

const MainPage = ({ children, className, backgroundColor }) => {
  const { title } = useSiteMetadata()

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet='utf-8' />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: light)'
          content='#f6f4ee'
        />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: dark)'
          content='#127658'
        />
        <title>
          {title}
        </title>
      </Helmet>
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

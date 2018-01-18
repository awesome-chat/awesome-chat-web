import React from 'react'
import Cookies from 'js-cookie'

export default function checkAuthenticated(Component) {
  class AuthenticatedRoute extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    componentWillMount() {
      if (!Cookies.get('authorization_admin')) {
        this.props.history.push('/login')
      }
    }

    render() {
      return React.createElement(
        Component,
        { ...this.props }
      )
    }
  }

  return AuthenticatedRoute
}
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (this.props.auth.uid === null) {
        this.context.router.history.push("/signin");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth.uid) {
        this.context.router.history.push("/signin");
      }
    }

    render() {
      if (this.props.auth.uid) {
        return <ComposedComponent {...this.props} />;
      }
      return <Redirect to='/signin' />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.firebase.auth };
  }

  return connect(mapStateToProps)(Authentication);
}
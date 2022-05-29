import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserRoute = ({
  component: Component,
  auth: { isAuthenticated,loading,users },
  ...rest
}) => {
  // console.log(isLogin,"ini di route")
  return (
    <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ): isAuthenticated == null ? (
        <Redirect to={{
            pathname: '/'}}
          />
      ):isAuthenticated == false ?
      ( <Redirect to={{
        pathname: '/'}}
      />):null}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(UserRoute);
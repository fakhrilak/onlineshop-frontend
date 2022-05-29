import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const AdminRoutes = ({
    component: Component,
    auth: { isAuthenticated,loading,users },
    ...rest
  }) => {
    console.log(users,"ini user")
    return (
        <Route
			{...rest}
			render={(props) =>
				isAuthenticated === null || loading ? (
					<Redirect to="/" />
				) : isAuthenticated && users.role == "1" ? (
					<Component {...props} />
				) : isAuthenticated && users.role == "2" ? (
					<Redirect to="/" />
				) : (
					<Redirect to="/" />
				)}
		/>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, {})(AdminRoutes);
import React from "react";
import { NavLink } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
	const user = useSelector((state) => state.user.account);
	if (!user || !user.auth) {
		return (
			<div>
				<Alert variant="danger" className="mt-3">
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<h5>
						You don't have permision to access. Please{" "}
						<NavLink
							to="/login"
							style={({ isActive }) => ({
								color: "black",
								textDecoration: "none",
								cursor: "pointer",
							})}
							onMouseOver={({ target }) => {
								target.style.color = "blue";
								target.style.textDecoration = "underline";
							}}
							onMouseOut={({ target }) => {
								target.style.color = "black";
								target.style.textDecoration = "none";
							}}
						>
							login
						</NavLink>
					</h5>
				</Alert>
			</div>
		);
	}
	return props.children;
};

export default PrivateRoute;

import React, { useContext } from "react";
import "../assets/scss/Header.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
	const navigate = useNavigate();
	const { user, logout } = useContext(UserContext);
	console.log(">>> check user: ", user);

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/">
					<img
						src={logoApp}
						width="30"
						height="30"
						className="d-inline-block align-top me-2"
						alt="React bootstrap Logo"
					/>
					<span>App</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto" activeKey="/users">
						{((user && user.auth) || window.location.pathname === "/") && (
							<>
								<NavLink to="/" className="nav-link">
									Home
								</NavLink>
								<NavLink to="/users" className="nav-link">
									Manage Users
								</NavLink>
								<p className="nav-link info-email">Welcome {user.email}</p>
							</>
						)}
					</Nav>
					<Nav>
						<NavDropdown title="Actions" id="basic-nav-dropdown">
							<NavDropdown.Item href="/">somethings...</NavDropdown.Item>
							<NavDropdown.Divider />
							{user && user.auth === true ? (
								<NavDropdown.Item
									onClick={() => {
										logout();
										navigate("/login");
									}}
								>
									Logout
								</NavDropdown.Item>
							) : (
								<NavLink to="/login" className="dropdown-item">
									Login
								</NavLink>
							)}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;

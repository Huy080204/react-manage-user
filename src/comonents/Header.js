import React, { useEffect } from "react";
import "../assets/scss/Header.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userAction";
import { toast } from "react-toastify";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const account = useSelector((state) => state.user.account);
	console.log(">>> check account: ", account);

	useEffect(() => {
		if (
			account &&
			account.auth === false &&
			window.location.pathname !== "/login"
		) {
			navigate("/");
			toast.success("Logout success");
		}
	}, [account]);

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
						{((account && account.auth) ||
							window.location.pathname === "/") && (
							<>
								<NavLink to="/" className="nav-link">
									Home
								</NavLink>
								<NavLink to="/users" className="nav-link">
									Manage Users
								</NavLink>
							</>
						)}
					</Nav>
					<Nav>
						{account && account.email && (
							<p className="nav-link info-email">Welcome {account.email}</p>
						)}
						<NavDropdown title="Actions" id="basic-nav-dropdown">
							<NavDropdown.Item href="/">somethings...</NavDropdown.Item>
							<NavDropdown.Divider />
							{account && account.auth === true ? (
								<NavDropdown.Item
									onClick={() => {
										console.log("yes");
										dispatch(handleLogoutRedux());
										console.log("asc");
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

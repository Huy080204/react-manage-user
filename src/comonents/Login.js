import React, { useEffect, useState } from "react";
import "../assets/scss/Login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const isLoading = useSelector((state) => state.user.isLoading);
	const account = useSelector((state) => state.user.account);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (account && account.auth) {
			navigate("/");
		}
	}, [account]);

	const handleLogin = () => {
		if (!email || !password) {
			toast.error("Missing email or password");
			return;
		}
		dispatch(handleLoginRedux(email, password));
	};

	const handlePressEnter = (event) => {
		console.log();

		if (event && event.key === "Enter") {
			console.log("Enter key pressed");
			handleLogin();
		}
	};

	return (
		<div>
			<div className="login-container col-12 col-sm-3">
				<h2 className="title">Login</h2>
				<div className="description">Email or username</div>
				<input
					type="email"
					placeholder="Email or username"
					className="input"
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="Password"
					className="input"
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					onKeyDown={(event) => handlePressEnter(event)}
				/>
				<button
					className="button-login"
					disabled={isLoading || !(email && password)}
					onClick={handleLogin}
				>
					{isLoading ? (
						<i className="fa-solid fa-sync fa-spin"></i>
					) : (
						<span>Login</span>
					)}
				</button>
				<div
					className="button-back"
					onClick={() => {
						navigate("/");
					}}
				>
					<i className="fa-solid fa-arrow-left me-1"></i>
					<span className="button-back-text">Go back</span>
				</div>
			</div>
		</div>
	);
};

export default Login;

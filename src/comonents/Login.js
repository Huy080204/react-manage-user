import React, { useContext, useEffect, useState } from "react";
import "../assets/scss/Login.scss";
import { loginAPI } from "../service/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loadingAPI, setLoadingAPI] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);

	const { user, login } = useContext(UserContext);

	const handleLogin = async () => {
		setLoadingAPI(true);
		if (!email || !password) {
			toast.error("Missing email or password");
			return;
		}
		let res = await loginAPI(email, password);
		if (res && res.token) {
			login(email.trim(), res.token);
			console.log(">>> user login: ", user);

			toast.success("Login success");
			navigate("/");
		} else if (res && res.status === 400) {
			toast.error(res.data.error);
		}
		setLoadingAPI(false);
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
					disabled={loadingAPI || !(email && password)}
					onClick={handleLogin}
				>
					{loadingAPI ? (
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

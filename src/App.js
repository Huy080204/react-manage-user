import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./comonents/Header";
import TableUser from "./comonents/TableUser";
import Home from "./comonents/Home";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Routes, Route } from "react-router-dom";
import Login from "./comonents/Login";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";

function App() {
	const { user, login } = useContext(UserContext);
	console.log(user);
	useEffect(() => {
		if (localStorage.getItem("token")) {
			login(localStorage.getItem("email"), localStorage.getItem("token"));
		}
	}, []);

	return (
		<div className="app-container">
			<Header></Header>
			<Container>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/users" element={<TableUser />}></Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</Container>

			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</div>
	);
}

export default App;

import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./comonents/Header";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
	const { user, login } = useContext(UserContext);
	console.log(user);
	useEffect(() => {
		if (localStorage.getItem("token")) {
			login(localStorage.getItem("email"), localStorage.getItem("token"));
		}
	}, []);

	return (
		<div className="app-container me-4">
			<Header></Header>
			<Container>
				<AppRoutes />
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

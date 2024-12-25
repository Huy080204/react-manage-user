import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./comonents/Header";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { handleRefreshRedux } from "./redux/actions/userAction";

function App() {
	const a = null;
	console.log(a.ac);
	const dispatch = useDispatch();
	const account = useSelector((state) => state.user.account);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(handleRefreshRedux());
		}
	}, []);

	console.log(">>> check account APP: ", account);

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

import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./comonents/Header";
import TableUser from "./comonents/TableUser";
import ModalAddNew from "./comonents/ModalAddNew";
import { useState } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	

	

	return (
		<div className="app-container">
			<Header></Header>
			<Container>
				
				<TableUser></TableUser>
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

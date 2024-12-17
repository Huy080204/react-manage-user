import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./comonents/Header";
import TableUser from "./comonents/TableUser";

function App() {
	return (
		<div className="app-container">
			<Header></Header>
			<Container>
				<TableUser></TableUser>
			</Container>
		</div>
	);
}

export default App;

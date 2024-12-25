import React from "react";

const Home = () => {
	return (
		<div className="home-container">
			<h1>Home</h1>
			{localStorage.getItem("token") && (
				<span>{localStorage.getItem("token")}</span>
			)}
		</div>
	);
};

export default Home;

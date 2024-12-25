import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../comonents/Home";
import TableUser from "../comonents/TableUser";
import Login from "../comonents/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

const AppRoutes = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route
					path="/users"
					element={
						<PrivateRoute>
							<TableUser />
						</PrivateRoute>
					}
				></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</div>
	);
};

export default AppRoutes;

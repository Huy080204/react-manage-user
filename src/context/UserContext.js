import React, { useState } from "react";

const UserContext = React.createContext({ email: "", auth: false });

const UserProvider = ({ children }) => {
	const [user, setUSer] = useState({ email: "", auth: false });

	const login = (email, token) => {
		setUSer({ email: email, auth: true });
		localStorage.setItem("token", token);
		localStorage.setItem("email", email);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("email");
		setUSer({ email: "", auth: false });
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };

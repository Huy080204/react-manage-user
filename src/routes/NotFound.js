import React from "react";
import { Alert } from "react-bootstrap";

const NotFound = () => {
	return (
		<div>
			<Alert variant="danger" className="mt-3">
				<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
				<h5>Page Not Found</h5>
			</Alert>
		</div>
	);
};

export default NotFound;

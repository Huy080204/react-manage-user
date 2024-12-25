import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateUser } from "../service/UserService";
import { ToastContainer, toast } from "react-toastify";

const ModalEdit = ({ show, handleClose, handleUpdateTableEdit, user }) => {
	const [name, setName] = useState("");
	const [job, setJob] = useState("");
	useEffect(() => {
		if (show) {
			setName(user.first_name);
		}
	}, [user]);

	const handleEditUser = async () => {
		let res = await putUpdateUser(name, job);
		console.log(res);

		if (res && res.updatedAt) {
			user.first_name = res.name;
			handleUpdateTableEdit(user);
			handleClose();
			setName("");
			setJob("");
			toast.success("A user is edited success!!!");
		} else {
			toast.error("Error");
		}
	};
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit user</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formName">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter your name..."
							value={name}
							onChange={(event) => setName(event.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formJob">
						<Form.Label>Job</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter your job..."
							value={job}
							onChange={(event) => setJob(event.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={() => handleEditUser()}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalEdit;

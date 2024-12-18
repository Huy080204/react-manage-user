import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../service/UserService";
import { ToastContainer, toast } from "react-toastify";

const ModalAddNew = ({ show, handleClose, handleUpdateTable }) => {
	const [name, setName] = useState("");
	const [job, setJob] = useState("");
	const handleSaveUser = async () => {
		let res = await postCreateUser(name, job);
		if (res && res.id) {
			handleUpdateTable({ first_name: res.name, id: res.id });
			handleClose();
			setName("");
			setJob("");
			toast.success("A user is created success!!!");
		} else {
			toast.error("Error");
		}
	};
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add new user</Modal.Title>
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
				<Button variant="primary" onClick={() => handleSaveUser()}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalAddNew;

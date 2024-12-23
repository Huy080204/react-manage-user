import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { daleteUser } from "../service/UserService";

const ModalDelete = ({ show, handleClose, handleUpdateTableDelete, user }) => {
	const handlDeleteUser = async () => {
		let res = await daleteUser(user.id);
		if (res && +res.status === 204) {
			console.log("Delete: ", res);
			handleUpdateTableDelete(user);
			handleClose();
			toast.success("A user is deleted success!!!");
		} else {
			toast.error("Error");
		}
	};

	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard="false">
			<Modal.Header closeButton>
				<Modal.Title>Delete user</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h5>
					Are you sure want to delete this user with email = `
					<b>{user.email}</b>`?
				</h5>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handlDeleteUser}>
					Sure
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalDelete;

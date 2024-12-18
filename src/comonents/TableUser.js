import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/UserService";
import ModalAddNew from "./ModalAddNew";

const TableUser = () => {
	const [listUsers, setListUsers] = useState([]);
	const [totalUsers, setTotalUSers] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

	const handleShowModal = () => {
		setIsShowModalAddNew(true);
	};

	const handleCloseModal = () => {
		setIsShowModalAddNew(false);
	};

	const handleUpdateTable = (user) => {
		setListUsers([user, ...listUsers]);
	};

	useEffect(() => {
		getAllUsers(1);
	}, []);

	const getAllUsers = async (page) => {
		let res = await fetchAllUser(page);

		if (res && res.data) {
			setTotalUSers(res.total);
			setTotalPages(res.total_pages);
			setListUsers(res.data);
		}
	};

	const handlePageClick = (event) => {
		getAllUsers(+event.selected + 1);
	};

	return (
		<div>
			<div className="my-3 d-flex justify-content-between">
				<h3>List users:</h3>
				<button className="btn btn-primary" onClick={handleShowModal}>
					Add new
				</button>
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Email</th>
						<th>First Name</th>
						<th>Last Name</th>
					</tr>
				</thead>
				<tbody>
					{listUsers &&
						listUsers.length > 0 &&
						listUsers.map((item, index) => {
							return (
								<tr key={`user ${index}`}>
									<td>{item.id}</td>
									<td>{item.email}</td>
									<td>{item.first_name}</td>
									<td>{item.last_name}</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
			<ReactPaginate
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={totalPages}
				previousLabel="< previous"
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="page-item"
				previousLinkClassName="page-link"
				nextClassName="page-item"
				nextLinkClassName="page-link"
				breakLabel="..."
				breakClassName="page-item"
				breakLinkClassName="page-link"
				containerClassName="pagination"
				activeClassName="active"
				renderOnZeroPageCount={null}
			/>
			<ModalAddNew
				show={isShowModalAddNew}
				handleClose={handleCloseModal}
				handleUpdateTable={handleUpdateTable}
			></ModalAddNew>
		</div>
	);
};

export default TableUser;

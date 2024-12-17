import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/UserService";

const TableUser = () => {
	const [listUsers, setListUsers] = useState([]);
	const [totalUsers, setTotalUSers] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		getAllUsers(1);
	}, []);

	const getAllUsers = async (page) => {
		let res = await fetchAllUser(page);
		console.log(">>> check new:", res);

		if (res && res.data) {
			setTotalUSers(res.total);
			setTotalPages(res.total_pages);
			setListUsers(res.data);
		}
	};
	console.log(">>> list: ", listUsers);

	const handlePageClick = (event) => {
		console.log("Event: ", event);
		getAllUsers(+event.selected + 1);
	};

	return (
		<div>
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
		</div>
	);
};

export default TableUser;

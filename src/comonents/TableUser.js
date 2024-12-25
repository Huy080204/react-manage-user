import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/UserService";
import ModalAddNew from "./ModalAddNew";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import _ from "lodash";
import { Button, Form } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import Papa from "papaparse";
import "../assets/scss/Table.scss";

const TableUser = () => {
	const [listUsers, setListUsers] = useState([]);
	const [totalUsers, setTotalUSers] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
	const [isShowModalEdit, setIsShowModalEdit] = useState(false);
	const [isShowModalDelete, setIsShowModalDelete] = useState(false);
	const [dataUserEdit, setDataUserEdit] = useState({});
	const [dataUserDelete, setDataUserDelete] = useState({});
	const [sortedBy, setSortedBy] = useState("asc");
	const [sortedField, setSortedField] = useState("id");
	const [exportUsers, setExportUsers] = useState([]);

	const handleCloseModal = () => {
		setIsShowModalAddNew(false);
		setIsShowModalEdit(false);
		setIsShowModalDelete(false);
	};

	const handleUpdateTable = (user) => {
		setListUsers([user, ...listUsers]);
	};

	const handleEditUser = (user) => {
		setDataUserEdit(user);
		setIsShowModalEdit(true);
	};

	const handleUpdateTableEdit = (user) => {
		let cloneListUsers = _.cloneDeep(listUsers);
		let index = listUsers.findIndex((item) => item.id === user.id);
		cloneListUsers[index] = user;
		console.log(listUsers, cloneListUsers);
		setListUsers(cloneListUsers);
	};

	const handleDeleteUser = (user) => {
		setDataUserDelete(user);
		setIsShowModalDelete(true);
	};

	const handleUpdateTableDelete = (user) => {
		let index = listUsers.findIndex((item) => item.id === user.id);
		if (index !== -1) {
			listUsers.splice(index, 1);
		}
		setListUsers(listUsers);
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

	const handleSort = (sortedBy, sortedField) => {
		setSortedBy(sortedBy);
		setSortedField(sortedField);

		let cloneListUsers = _.cloneDeep(listUsers);
		cloneListUsers = _.orderBy(cloneListUsers, [sortedField], [sortedBy]);
		// cloneListUsers = cloneListUsers.sort((a, b) => {
		// 	const valA = a[sortedField];
		// 	const valB = b[sortedField];
		// 	if (typeof valA === "number" && typeof valA === "number") {
		// 		return sortedBy === "asc" ? valA - valB : valB - valA;
		// 	}
		// 	if (typeof valA === "string" && typeof valA === "string") {
		// 		return sortedBy === "asc"
		// 			? valA.localeCompare(valB)
		// 			: valB.localeCompare(valA);
		// 	}
		// 	return 0;
		// });
		setListUsers(cloneListUsers);
	};

	const handleSearch = _.debounce((term) => {
		term = term.toLowerCase();
		console.log(term);
		if (term) {
			let filteredUsers = _.cloneDeep(listUsers);
			filteredUsers = filteredUsers.filter((user) =>
				user.email.toLowerCase().includes(term)
			);
			setListUsers(filteredUsers);
		} else {
			getAllUsers(1);
		}
	}, 300);

	const handleExportCSV = (event, done) => {
		if (listUsers && listUsers.length > 0) {
			const result = [
				["Id", "Email", "First name", "Last name"],
				...listUsers.map((user) => [
					user.id,
					user.email,
					user.first_name,
					user.last_name,
				]),
			];
			setExportUsers(result);
			done();
		}
	};

	const handleImportCSV = (event) => {
		if (event && event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			if (file.type !== "text/csv") {
				toast.error("Only accept csv file");
				return;
			}
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				complete: (result) => {
					const headers = result.meta.fields;
					const data = result.data;

					if (headers.length !== 3) {
						toast.error("CSV file must have exactly 3 columns");
						return;
					}
					const formattedHeaders = headers.map((header) =>
						header.toLowerCase().replace(" ", "_")
					);
					const formattedData = data.map((row) => {
						const formattedRow = {};
						headers.forEach((header, index) => {
							formattedRow[formattedHeaders[index]] = row[header];
						});
						return formattedRow;
					});
					console.log(formattedData);
					setListUsers(formattedData);
				},
			});
		}
	};

	return (
		<div>
			<div className="my-3 d-sm-flex justify-content-between">
				<h3>List users:</h3>
				<div className="mt-2 mt-sm-0">
					<label htmlFor="import-file" className="btn btn-warning">
						<i className="fa-solid fa-file-import me-2"></i>
						Import
					</label>
					<input
						type="file"
						id="import-file"
						hidden
						onChange={(event) => {
							handleImportCSV(event);
						}}
					/>
					<CSVLink
						data={exportUsers}
						filename={"users.csv"}
						asyncOnClick={true}
						onClick={handleExportCSV}
						className="btn btn-primary mx-3"
					>
						<i className="fa-solid fa-download me-2"></i>
						Export
					</CSVLink>
					<button
						className="btn btn-success"
						onClick={() => {
							setIsShowModalAddNew(true);
						}}
					>
						<i className="fa-solid fa-circle-plus me-2"></i>
						Add new
					</button>
				</div>
			</div>
			<div className="row my-3">
				<div className="col-12 col-sm-4">
					<Form className="d-flex ">
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
							onChange={(event) => handleSearch(event.target.value)}
						/>
						<Button variant="outline-success">Search</Button>
					</Form>
				</div>
			</div>
			<div className="customize-table">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>
								<div className="d-flex justify-content-between mx-1">
									<span>ID</span>
									<div className="sort-icon">
										<i
											className="fa-solid fa-arrow-up mx-1"
											onClick={() => {
												handleSort("desc", "id");
											}}
										></i>
										<i
											className="fa-solid fa-arrow-down"
											onClick={() => {
												handleSort("asc", "id");
											}}
										></i>
									</div>
								</div>
							</th>
							<th>Email</th>
							<th>
								<div className="d-flex justify-content-between mx-1">
									<span>First Name</span>
									<div className="sort-icon">
										<i
											className="fa-solid fa-arrow-up mx-1"
											onClick={() => {
												handleSort("desc", "first_name");
											}}
										></i>
										<i
											className="fa-solid fa-arrow-down"
											onClick={() => {
												handleSort("asc", "first_name");
											}}
										></i>
									</div>
								</div>
							</th>
							<th>Last Name</th>
							<th>Actions</th>
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
										<td>
											<button
												className="btn btn-warning mx-3"
												onClick={() => handleEditUser(item)}
											>
												Edit
											</button>
											<button
												className="btn btn-danger"
												onClick={() => handleDeleteUser(item)}
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			</div>
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
				className="customize-pagination"
			/>
			<ModalAddNew
				show={isShowModalAddNew}
				handleClose={handleCloseModal}
				handleUpdateTable={handleUpdateTable}
			></ModalAddNew>
			<ModalEdit
				show={isShowModalEdit}
				handleClose={handleCloseModal}
				handleUpdateTableEdit={handleUpdateTableEdit}
				user={dataUserEdit}
			></ModalEdit>
			<ModalDelete
				show={isShowModalDelete}
				handleClose={handleCloseModal}
				handleUpdateTableDelete={handleUpdateTableDelete}
				user={dataUserDelete}
			></ModalDelete>
		</div>
	);
};

export default TableUser;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addUser, updateUser, getUser } from "@quind/mf-styleguide";
import "./styles.css";
const initialState = {
	name: "",
	email: "",
	contact: "",
};

export default function UserComponent({ create }) {
	const { id } = useParams();
	const [state, setState] = useState(initialState);
	const { name, email, contact } = state;

	const navigate = useNavigate();

	useEffect(() => {
		getSingleUser(id);
	}, [id]);

	const getSingleUser = async (id) => {
		const response = await getUser(id);
		setState({ ...response[0] });
		//console.log(response);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !email || !contact) {
			alert("Please provide value into each input field");
		} else {
			if (!id) {
				addContact(state);
			} else {
				updateContact(state, id);
			}

			setTimeout(() => navigate("/home"), 500);
		}
	};

	const handleInputChange = (e) => {
		let { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const addContact = async (data) => {
		const response = await addUser(data);
		alert(response);
	};
	const updateContact = async (data, id) => {
		const response = await updateUser(data, id);
		alert(response);
	};

	return (
		<div
			style={{
				marginTop: "100px",
				margin: "auto",
				padding: "15px",
				maxWidth: "400px",
				alingContent: "center",
			}}
		>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					name="name"
					placeholder="Enter name ..."
					onChange={handleInputChange}
					value={name}
				/>
				<label htmlFor="name">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Enter email ..."
					onChange={handleInputChange}
					value={email}
				/>
				<label htmlFor="contact">Contact</label>
				<input
					type="number"
					id="contact"
					name="contact"
					placeholder="Enter contact No. ..."
					onChange={handleInputChange}
					value={contact}
				/>
				<input type="submit" value={id ? "Update" : "Add"} />
			</form>
		</div>
	);
}

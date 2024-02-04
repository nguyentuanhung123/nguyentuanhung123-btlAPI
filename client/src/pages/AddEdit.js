import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css"
import axios from "axios";
import { toast } from "react-toastify"

const initialState = {
    name: "",
    email: "",
    phone: null,
    address: ""
}

const AddEdit = () => {

    const [state, setState] = useState(initialState);

    const { name, email, phone, address } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        // axios.get(`http://localhost:8801/users/${id}`)
        //     .then((response) => setState({ ...response.data[0] }))
        axios.get('http://localhost:8801/users/'+id)
            .then((response) => setState({ ...response.data[0] }))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("Name is required");
        }
        if (!email) {
            toast.error("Email is required");
        }
        if (!phone) {
            toast.error("Phone is required");
        }
        else {
            let isPhone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
            if (!isPhone.test(phone)) {
                toast.error("Phone is not validate");
                return;
            }
        }
        if (!address) {
            toast.error("Address is required");
        }
        else {
            let user = {
                name: name,
                email: email,
                phone: phone,
                address: address
            }
            if (!id) {
                axios.post("http://localhost:8801/users", user)
                    .then(() => {
                        setState({ name: "", email: "", phone: "", address: "" })
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("User Added Succeccfully");
                setTimeout(() => navigate("/"), 500)
            }
            else {
                axios.put(`http://localhost:8801/users`, {
                    id,
                    ...user
                })
                    .then(() => {
                        setState({ name: "", email: "", phone: "", address: "" })
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("User Updated Succeccfully");
                setTimeout(() => navigate("/"), 500)
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }
    return (
        <div style={{ marginTop: "100px" }}>
            <form onSubmit={handleSubmit}>
                <lable htmlFor="name">Name</lable>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name ..."
                    value={name || ""}
                    onChange={(e) => handleInputChange(e)}
                />
                <lable htmlFor="email">Email</lable>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email ..."
                    value={email || ""}
                    onChange={(e) => handleInputChange(e)}
                />
                <lable htmlFor="phone">Phone</lable>
                <input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Your Phone ..."
                    value={phone || ""}
                    onChange={(e) => handleInputChange(e)}
                />
                <lable htmlFor="address">Address</lable>
                <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Your Address ..."
                    value={address || ""}
                    onChange={(e) => handleInputChange(e)}
                />
                <input type="submit" value={id ? "Update" : "Save"}></input>
                <Link to="/">
                    <input type="button" value="Go Back" />
                </Link>
            </form>
        </div>
    )
}

export default AddEdit;
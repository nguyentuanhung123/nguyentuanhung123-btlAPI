import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";
import Loading from "./Loading";
const Users = (props) => {
    const { users, setUsers, isLoading, setIsLoading, records } = props;

    const loadData = async () => {
        const response = await axios.get("http://localhost:8801/users");
        setUsers(response.data);
    }

    const deleteUser = (id) => {
        if (
            window.confirm("Are you sure that you wanted to delete that user ?")
        ) {
            axios.delete(`http://localhost:8801/users/${id}`)
            toast.success("User has been deleted successfully");
            //setTimeout(() => loadData(), 500);
            window.location.reload()
        }
    }

    useEffect(() => {
        setTimeout(() => {
            loadData();
            setIsLoading(false);
        }, 3000)
    }, []);

    return (
        <table className="styled-table">
            <thead>
                <tr>
                    <th style={{ textAlign: "center" }}>No.</th>
                    <th style={{ textAlign: "center" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Email</th>
                    <th style={{ textAlign: "center" }}>Phone</th>
                    <th style={{ textAlign: "center" }}>Address</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    records && isLoading === false &&
                    records.map((user, index) => {
                        return (
                            <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>
                                    <Link to={`/update/${user.id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => deleteUser(user.id)}>Delete</button>
                                    <Link to={`/view/${user.id}`}>
                                        <button className="btn btn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                }
                {
                    isLoading === true && <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}><Loading /></td>
                    </tr>
                }
            </tbody>
        </table>
    )
}
export default Users;
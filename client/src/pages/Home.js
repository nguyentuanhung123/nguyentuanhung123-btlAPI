import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import Pagination from "./Pagination";
import Users from "./Users";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3; // 5 bản ghi trên mỗi trang
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users.slice(firstIndex, lastIndex);
    const npage = Math.ceil(users.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)


    // const loadData = async () => {
    //     const response = await axios.get("http://localhost:8801/users");
    //     setUsers(response.data);
    // }

    // useEffect(() => {
    //     loadData();
    // }, []);

    return (
        <div style={{ marginTop: "150px" }}>

            <h1>User Managerment</h1>

            <Link to="/addUser">
                <button className="btn btn-user">Add User</button></Link>
            <Users
                users={users}
                setUsers={setUsers}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                records={records}
            />

            <Pagination
                numbers={numbers}
                currentPage={currentPage}
                firstIndex={firstIndex}
                setCurrentPage={setCurrentPage}
                lastIndex={lastIndex}
            />

        </div>
    )
}

export default Home;
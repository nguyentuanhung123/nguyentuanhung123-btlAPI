import React from "react";
import './Pagination.css'

const Pagination = (props) => {
    const { numbers, currentPage, firstIndex, setCurrentPage, lastIndex } = props;

    const prePage = () => {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1);
        }
    }

    const changePage = (id) => {
        setCurrentPage(id)
    }

    const nextPage = () => {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <ul className="pagination justify-content-center mt-2">
            <li className="page-item">
                <a className="page-link" href="#" onClick={prePage}>
                    Prev
                </a>
            </li>
            {
                numbers.map((n, i) => {
                    return (
                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <a className="page-link" href="#" onClick={() => changePage(n)}>
                                {n}
                            </a>
                        </li>
                    )
                })
            }
            <li className="page-item">
                <a className="page-link" href="#" onClick={nextPage}>
                    Next
                </a>
            </li>
        </ul>
    )
}
export default Pagination;
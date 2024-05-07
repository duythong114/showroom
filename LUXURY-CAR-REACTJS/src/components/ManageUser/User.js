import React, { useEffect, useState } from 'react';
import './User.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../slices/userSlice';
import ReactPaginate from 'react-paginate';
import { useHistory } from "react-router-dom";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { deleteUser } from '../../slices/userSlice'
import { toast } from 'react-toastify';
import ModalDeleteUser from './ModalDeleteUser';
import ModalUpdateUser from './ModalUpdateUser';
import { Scrollbars } from 'react-custom-scrollbars';

const User = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [scrollHeight, setScrollHeight] = useState(0)
    const [scrollWidth, setScrollWidth] = useState(0)

    // pagination
    const totalPages = useSelector(state => state.user.totalPages)
    const listUsers = useSelector(state => state.user.listUsers)
    const isLoadingAllUsers = useSelector(state => state.user.isLoadingAllUsers)
    const [page, setPage] = useState(1)
    // eslint-disable-next-line
    const [limit, setLimit] = useState(4)

    // delete modal
    const isDeletingUser = useSelector(state => state.user.isDeletingUser)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [dataModalDelete, setDataModal] = useState({})

    // update modal
    const isUpdatingUser = useSelector(state => state.user.isUpdatingUser)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [dataModalUpdate, setDataModalUpdate] = useState({})

    useEffect(() => {
        let pagination = { page, limit }
        dispatch(fetchAllUsers(pagination))
        // eslint-disable-next-line
    }, [page])

    useEffect(() => {
        let windowWidth = window.innerWidth
        let windowHeight = window.innerHeight
        setScrollHeight(windowHeight)
        setScrollWidth(windowWidth)
    }, [scrollWidth, scrollHeight])

    // this function is from react-paginate
    const handlePageClick = (event) => {
        setPage(event.selected + 1)
    }

    const handleDetailBtn = (data) => {
        history.push(`/user/detail?id=${data.id}`)
    }

    const handleDeleteBtn = (user) => {
        setDataModal(user)
        setShowModalDelete(true)
    }

    const handleCloseDeleteModal = () => {
        setDataModal({})
        setShowModalDelete(false);
    }

    const handleDeleteUser = async () => {
        let userId = dataModalDelete.id
        let response = await dispatch(deleteUser(userId))
        if (response
            && response.payload
            && response.payload.response
            && response.payload.response.data
            && response.payload.response.data.errorCode !== 0
        ) {
            toast.error(response.payload.response.data.errorMessage)
        }

        if (response && response.payload && response.payload.errorCode === 0) {
            let pagination = { page, limit }
            await dispatch(fetchAllUsers(pagination))
            toast.success(response.payload.errorMessage)
            setShowModalDelete(false)
        }
    }

    const handleUpdateBtn = (user) => {
        setShowModalUpdate(true)
        setDataModalUpdate(user)
    }

    const handleCloseUpdateModal = () => {
        setShowModalUpdate(false)
        setDataModalUpdate({})
    }

    return (
        <Scrollbars style={{ width: scrollWidth, height: scrollHeight }}>
            <div className='users-container' >
                <div className="container">
                    <h1 className='user-title'>MANAGE USER</h1>

                    <table className="table table-hover customers mt-3">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">Group</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        {(isLoadingAllUsers || isDeletingUser || isUpdatingUser) ?
                            <tbody>
                                <tr>
                                    <td colSpan={6}><LoadingSpinner /></td>
                                </tr>
                            </tbody>
                            :
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    listUsers.map((item, index) => (
                                        <tr key={`user-${index}`}>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.Group.name}</td>
                                            <td>
                                                <div className='action-container'>
                                                    <button
                                                        onClick={() => handleUpdateBtn(item)}
                                                        className='btn btn-warning'
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBtn(item)}
                                                        className='btn btn-danger'>
                                                        Delete
                                                    </button>
                                                    <button
                                                        className='btn btn-success'
                                                        onClick={() => handleDetailBtn(item)}
                                                    >
                                                        Detail
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={6}>
                                            {/* <h3 className='table-notify'>You don't have permission with this page</h3> */}
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        }
                    </table>

                    {totalPages && totalPages > 0 &&
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
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
                    }
                </div>

                <ModalDeleteUser
                    show={showModalDelete}
                    handleClose={handleCloseDeleteModal}
                    dataModalDelete={dataModalDelete}
                    handleDeleteUser={handleDeleteUser}
                />

                <ModalUpdateUser
                    updateShow={showModalUpdate}
                    handleUpdateClose={handleCloseUpdateModal}
                    dataModalUpdate={dataModalUpdate}
                    page={page}
                    limit={limit}
                />
            </div>
        </Scrollbars>
    )
}

export default User;
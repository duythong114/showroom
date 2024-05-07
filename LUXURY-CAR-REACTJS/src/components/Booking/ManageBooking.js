import React, { useEffect, useState } from 'react';
import './ManageBooking.scss';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { getProcessBooking } from '../../slices/bookingSlice'
import ModalDeleteBooking from './ModalDeleteBooking'
import { deleteBooking } from '../../slices/bookingSlice'
import ModalUpdateBooking from './ModalUpdateBooking'
import { Scrollbars } from 'react-custom-scrollbars';

const ManageBooking = (props) => {
    const dispatch = useDispatch()
    const [scrollHeight, setScrollHeight] = useState(0)
    const [scrollWidth, setScrollWidth] = useState(0)

    // pagination
    const totalBookingPages = useSelector(state => state.booking.totalBookingPages)
    const bookingList = useSelector(state => state.booking.bookingList)
    const isLoadingAllBookings = useSelector(state => state.booking.isLoadingAllBookings)
    const [page, setPage] = useState(1)
    // eslint-disable-next-line
    const [limit, setLimit] = useState(4)

    // delete booking
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [dataDeleteModal, setDataDeleteModal] = useState({})
    const isDeletingBooking = useSelector(state => state.booking.isDeletingBooking)

    // update booking
    const [updateModalShow, setUpdateModalShow] = useState(false)
    const [dataUpdateModal, setDataUpdateModal] = useState({})
    const isUpdatingBooking = useSelector(state => state.booking.isUpdatingBooking)

    useEffect(() => {
        let pagination = { page, limit }
        dispatch(getProcessBooking(pagination))
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

    const handleDeleteBookingBtn = (data) => {
        setDataDeleteModal(data)
        setDeleteModalShow(true)
    }

    const handleDeleteBookingClose = () => {
        setDataDeleteModal({})
        setDeleteModalShow(false)
    }

    const handleDeleteBooking = async () => {
        let bookingId = dataDeleteModal?.id
        if (bookingId) {
            let response = await dispatch(deleteBooking(bookingId))
            if (response
                && response.payload
                && response.payload.response
                && response.payload.response.data
                && response.payload.response.data.errorCode !== 0
            ) {
                toast.error(response.payload.response.data.errorMessage)
            }

            if (response && response.payload && response.payload.errorCode === 0) {
                toast.success(response.payload.errorMessage)
                setDeleteModalShow(false)
                let pagination = { page, limit }
                dispatch(getProcessBooking(pagination))
            }
        }
    }

    const handleUpdateBookingBtn = (data) => {
        setDataUpdateModal(data)
        setUpdateModalShow(true)
    }

    const handleUpdateBookingClose = () => {
        setDataUpdateModal({})
        setUpdateModalShow(false)
    }

    return (
        <Scrollbars style={{ width: scrollWidth, height: scrollHeight }}>
            <div className='manage-booking-container'>
                <div className='container'>
                    <h1 className='manage-booking-title'>MANAGE BOOKING</h1>

                    <table className="table table-hover customers mt-3">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">status</th>
                                <th scope="col">time</th>
                                <th scope="col">userName</th>
                                <th scope="col">carName</th>
                                <th scope="col">actions</th>
                            </tr>
                        </thead>
                        {(isLoadingAllBookings || isDeletingBooking || isUpdatingBooking) ?
                            <tbody>
                                <tr>
                                    <td colSpan={6}><LoadingSpinner /></td>
                                </tr>
                            </tbody>
                            :
                            <tbody>
                                {bookingList && bookingList.length > 0 ?
                                    bookingList.map((item, index) => (
                                        <tr key={`booking-${index}`}>
                                            <td>{item.id}</td>
                                            <td>{item.status}</td>
                                            <td>{item.time}</td>
                                            <td>{item?.User?.firstName}</td>
                                            <td>{item?.Car?.name}</td>
                                            <td>
                                                <div className='action-container'>
                                                    <button
                                                        onClick={() => handleUpdateBookingBtn(item)}
                                                        className='btn btn-warning'
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBookingBtn(item)}
                                                        className='btn btn-danger'>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={6}>

                                        </td>
                                    </tr>
                                }
                            </tbody>
                        }
                    </table>

                    {/* pagination */}
                    {
                        totalBookingPages && totalBookingPages > 0 &&
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={2}
                            pageCount={totalBookingPages}
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

                    <ModalDeleteBooking
                        deleteBookingShow={deleteModalShow}
                        deleteBookingClose={handleDeleteBookingClose}
                        handleDeleteBooking={handleDeleteBooking}
                        dataDeleteModal={dataDeleteModal}
                    />

                    <ModalUpdateBooking
                        updateBookingShow={updateModalShow}
                        updateBookingClose={handleUpdateBookingClose}
                        dataUpdateModal={dataUpdateModal}
                        page={page}
                        limit={limit}
                    />
                </div>
            </div>
        </Scrollbars>
    )
}

export default ManageBooking;
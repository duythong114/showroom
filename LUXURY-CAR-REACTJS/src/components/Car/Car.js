import React, { useEffect, useState } from 'react';
import './Car.scss';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { getAllCars } from '../../slices/carSlice'
import { deleteCar } from '../../slices/carSlice'
import ModalCreateCar from './ModalCreateCar'
import ModalDeleteCar from './ModalDeleteCar';
import ModalUpdateCar from './ModalUpdateCar';
import { Scrollbars } from 'react-custom-scrollbars';

const Car = (props) => {
    const dispatch = useDispatch();
    const [scrollHeight, setScrollHeight] = useState(0)
    const [scrollWidth, setScrollWidth] = useState(0)

    // pagination
    const totalCarPages = useSelector(state => state.car.totalCarPages)
    const carList = useSelector(state => state.car.carList)
    const isLoadingAllCars = useSelector(state => state.car.isLoadingAllUsers)
    const [page, setPage] = useState(1)
    // eslint-disable-next-line
    const [limit, setLimit] = useState(4)

    // create new car
    const [createModalShow, setCreateModalShow] = useState(false)
    const isCreatingCar = useSelector(state => state.car.isCreatingCar)

    // delete car
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [dataDeleteModal, setDataDeleteModal] = useState({})
    const isDeletingCar = useSelector(state => state.car.isDeletingCar)

    // update car
    const [updateModalShow, setUpdateModalShow] = useState(false)
    const [dataUpdateModal, setDataUpdateModal] = useState({})
    const isUpdatingCar = useSelector(state => state.car.isUpdatingCar)

    useEffect(() => {
        let pagination = { page, limit }
        dispatch(getAllCars(pagination))
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

    const handleCreateCarBtn = () => {
        setCreateModalShow(true)
    }

    const handleCreateCarClose = () => {
        setCreateModalShow(false)
    }

    const handleDeleteCarBtn = (data) => {
        setDataDeleteModal(data)
        setDeleteModalShow(true)
    }

    const handleDeleteCarClose = () => {
        setDataDeleteModal({})
        setDeleteModalShow(false)
    }

    const handleDeleteCar = async () => {
        let carId = dataDeleteModal?.id
        if (carId) {
            let response = await dispatch(deleteCar(carId))
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
                dispatch(getAllCars(pagination))
            }
        }
    }

    const handleUpdateCarBtn = (data) => {
        setUpdateModalShow(true)
        setDataUpdateModal(data)
    }

    const handleUpdateCarClose = () => {
        setUpdateModalShow(false)
        setDataUpdateModal({})
    }

    return (
        <Scrollbars style={{ width: scrollWidth, height: scrollHeight }}>
            <div className='car-container'>
                <div className='container'>
                    <h1 className='car-title'>MANAGE CAR</h1>

                    {/* create new car btn */}
                    <button
                        onClick={() => handleCreateCarBtn()}
                        className='btn btn-primary mb-2'>
                        Add Car
                    </button>

                    {/* car table */}
                    <table className="table table-hover customers mt-3">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">name</th>
                                <th scope="col">model</th>
                                <th scope="col">image</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        {(isLoadingAllCars || isCreatingCar || isDeletingCar || isUpdatingCar) ?
                            <tbody>
                                <tr>
                                    <td colSpan={6}><LoadingSpinner /></td>
                                </tr>
                            </tbody>
                            :
                            <tbody>
                                {carList && carList.length > 0 ?
                                    carList.map((item, index) => (
                                        <tr key={`car-${index}`}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.model}</td>
                                            <td>{item.image}</td>
                                            <td>
                                                <div className='action-container'>
                                                    <button
                                                        onClick={() => handleUpdateCarBtn(item)}
                                                        className='btn btn-warning'
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCarBtn(item)}
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
                        totalCarPages && totalCarPages > 0 &&
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={2}
                            pageCount={totalCarPages}
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

                    <ModalCreateCar
                        createCarShow={createModalShow}
                        createCarClose={handleCreateCarClose}
                        page={page}
                        limit={limit}
                    />

                    <ModalDeleteCar
                        deleteCarShow={deleteModalShow}
                        deleteCarClose={handleDeleteCarClose}
                        dataDeleteModal={dataDeleteModal}
                        handleDeleteCar={handleDeleteCar}
                    />

                    <ModalUpdateCar
                        updateCarShow={updateModalShow}
                        updateCarClose={handleUpdateCarClose}
                        dataUpdateModal={dataUpdateModal}
                        page={page}
                        limit={limit}
                    />
                </div>
            </div >
        </Scrollbars>
    )
}

export default Car;
import React from 'react';
import './NavHeader.scss';
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../slices/userSlice'
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavHeader = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const user = useSelector(state => state.user.user)
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogOutBtn = async () => {
        let response = await dispatch(logoutUser())
        if (response?.payload?.errorCode === 0) {
            toast.success(response.payload.errorMessage)
            history.push('/')
        }
    }

    return (
        <div>
            {!(location.pathname === "/login" || location.pathname === "/register") &&
                <Navbar className="topnav fixed-top" expand="lg">
                    <Container >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">

                            {/* content left */}
                            <Nav className="me-auto">
                                <Nav.Link>
                                    <NavLink to="/" exact>Home</NavLink>
                                </Nav.Link>

                                {(isAuthenticated && user)
                                    ?
                                    <>
                                        <Nav.Link>
                                            <NavLink to="/personal">Personal</NavLink>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <NavLink to="/booking" exact>Booking</NavLink>
                                        </Nav.Link>
                                    </>
                                    :
                                    <Nav.Link>
                                        <NavLink to="/login">Login</NavLink>
                                    </Nav.Link>
                                }
                            </Nav>

                            {/* content right */}
                            <Nav>
                                {(isAuthenticated && user)
                                    &&
                                    <>
                                        <div className='user-info'>
                                            {/* <h3 className='welcome-text'>Hi&nbsp;</h3> */}
                                            <h3 className='user-role'>{user && user.Group && user.Group.name}:</h3>
                                            <h3 className='user-name'>{user && user.firstName}</h3>
                                        </div>

                                        <NavDropdown className='nav-dropdown-customized className="justify-content-end"' title="Manage" id="basic-nav-dropdown">
                                            <Nav.Link>
                                                <NavLink to="/car" exact>Manage Car</NavLink>
                                            </Nav.Link>
                                            <Nav.Link>
                                                <NavLink to="/booking/manage" exact>Manage booking</NavLink>
                                            </Nav.Link>
                                            <Nav.Link>
                                                <NavLink to="/user" exact>Manage user</NavLink>
                                            </Nav.Link>
                                        </NavDropdown>

                                        <button
                                            onClick={() => handleLogOutBtn()}
                                            className='btn btn-primary btn-customized'
                                        >
                                            <i className="fa-solid fa-right-from-bracket"></i>
                                        </button>
                                    </>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            }

        </div>
    );
}

export default NavHeader;
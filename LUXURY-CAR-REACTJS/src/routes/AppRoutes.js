import {
    Switch,
    Route
} from "react-router-dom";

import Home from "../components/Home/Home";
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import User from '../components/ManageUser/User'
import Car from "../components/Car/Car";
import ManageBooking from "../components/Booking/ManageBooking";
import Booking from "../components/Booking/Booking";
import Personal from "../components/Personal/Personal";
import DetailUser from "../components/ManageUser/DetailUser";
import PrivateRoute from "./PrivateRoute";
import DetailCar from "../components/Home/sections/DetailCar";

const AppRoutes = () => {
    return (
        <>
            <Switch>
                <PrivateRoute path="/personal" component={Personal} />
                <PrivateRoute path="/car" component={Car} exact />
                <PrivateRoute path="/booking/manage" component={ManageBooking} exact />
                <PrivateRoute path="/booking" component={Booking} exact />
                <PrivateRoute path="/user" exact component={User} />
                <PrivateRoute path="/user/detail" component={DetailUser} />
                <PrivateRoute path="/car/detail" component={DetailCar} exact />

                <Route path="/" exact>
                    <Home />
                </Route>

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="*">
                    404 NOT FOUND
                </Route>
            </Switch>
        </>
    )
}

export default AppRoutes;
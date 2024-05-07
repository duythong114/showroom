import {
    Route
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const PrivateRoute = (props) => {
    // const isRefreshingUser = useSelector(state => state.user.isRefreshingUser)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const user = useSelector(state => state.user.user)
    const history = useHistory()

    useEffect(() => {
        if (!(isAuthenticated || user)) {
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    if (isAuthenticated && user) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        )
    } else {
        return Redirect("/login")
    }
}

export default PrivateRoute;
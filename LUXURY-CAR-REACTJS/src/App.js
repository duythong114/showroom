import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './styles/App.scss';
import NavHeader from './components/Navbar/NavHeader'
import AppRoutes from './routes/AppRoutes';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { getUserRefresh } from './slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

function App() {
  const dispatch = useDispatch()
  const isRefreshingUser = useSelector(state => state.user.isRefreshingUser)
  const isRemoving = useSelector(state => state.user.isRemoving)
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    if (!user) {
      dispatch(getUserRefresh())
    }
    // eslint-disable-next-line
  }, [user])

  if (isRefreshingUser || isRemoving) {
    return (
      <LoadingSpinner />
    )
  } else {
    return (
      <div>
        <Router>
          <div className='nav-container'>
            <NavHeader />
          </div>

          <div className='app-container'>
            <AppRoutes />
          </div>
        </Router>

        <ToastContainer
          position="top-center"
          limit={1}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    )
  }
}



export default App;
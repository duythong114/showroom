import PacmanLoader from "react-spinners/PacmanLoader";
import './LoadingSpinner.scss';

function LoadingSpinner() {

    return (
        <div className='spiner-container'>
            < PacmanLoader
                size={80}
                loading={true}
                color="#36d7b7" />
            <h1 className='spiner-text mt-3'>Data is loading...</h1>
        </div >
    )
}

export default LoadingSpinner;
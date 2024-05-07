import './HomeHeader.scss'

const HomeHeader = (props) => {
    return (
        <div className='home-header-container'>
            <div className='home-header-banner'>
                <div className='content-up'>
                    <div className='title1'>Ultimate Luxury Vehicles</div>
                    <div className='title2'>Car And Driver</div>
                    <div className='search'>
                        <i className='fa fa-search'></i>
                        <input type='text' placeholder='Find your car' />
                    </div>
                </div>
                <div className='content-down'>
                    <div className='options'>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className="fa-solid fa-car"></i>
                            </div>
                            {/* <div className='text-child'>Car</div> */}
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className="fa-solid fa-motorcycle"></i>
                            </div>
                            {/* <div className='text-child'>Motor</div> */}
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                            {/* <div className='text-child'>Cart</div> */}
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className="fa-regular fa-credit-card"></i>
                            </div>
                            {/* <div className='text-child'>Credit</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader
import React from 'react';
import './Home.scss';
import HomeFooter from './HomeFooter';
import HomeHeader from './HomeHeader';
import BMW from './sections/BMW';
import Ferrari from './sections/Ferrari';
import Lamborghini from './sections/Lamborghini';
import About from './sections/About';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = (props) => {
    let settings = {
        dots: false,
        infinite: false,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 3,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <div className='home-container' >
            <HomeHeader />
            <BMW settings={settings} />
            <Ferrari settings={settings} />
            <Lamborghini settings={settings} />
            <About />
            <HomeFooter />
        </div>
    )
}

export default Home;
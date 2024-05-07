import './About.scss'
import React from 'react';

const About = (props) => {
    return (
        <div className='about-section-container'>
            <div className='section-container container'>
                <div className='about-header section-header'>
                    <div className='about-title'>VIDEO ABOUT</div>
                </div>
                <div className='about-content row'>
                    <div className='about-video col-12'>
                        <iframe
                            src="https://www.youtube.com/embed/AI7dOlAp-iE"
                            title="2024 Ferrari SF90 Spider Assetto Fiorano - Interior and Exterior Walkaround"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
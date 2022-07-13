import React from 'react';
import { link } from 'react-router-dom';
import './Hero.js';
import './css/style.css';

function Hero ({
    lightBg, 
    topLine, 
    lightText, 
    lightTextDesc, 
    headline, 
    description, 
    buttonLabel, 
    img, 
    alt, 
    imgStart
}) {
    return (
        <>
            <div className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}>
                <div className="container">
                    <div className="row home__hero-row" style={{display: 'flex', flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'}}>
                        <div className="col">
                            <div className="home__hero-text-wrapper">
                                <div className="top-line">{topLine}</div>
                                <h1 className={lightText ? 'heading' : 'heading dark'}>{headline}</h1>
                                <p className={lightTextDesc ? 'home__hero-subtitle' : 'home__hero-subtitle dark'}>
                                    {description}</p>
                                <link to="/">
                                    <button>{buttonLabel}</button>
                                </link>
                            </div>
                        </div>
                        <div className="col">
                            <div className="home__hero-img-wrapper">
                                <img src={img} alt={alt} className="hero__hero-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>   
    )
}

export default Hero;
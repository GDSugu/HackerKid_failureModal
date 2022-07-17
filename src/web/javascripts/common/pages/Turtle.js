import React from 'react';
import '../../../stylesheets/common/pages/turtle/style.scss';
import { pageInit } from '../framework';

const Turtle = () => {
  pageInit('turtle-container', 'Turtle');
  return <>
    <div className="turtle-card">
      <div className="card-container">
        <h1 className='gameTitle'>Turtle</h1>
        <p className="gameDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ullam deleniti nobis deserunt, eveniet, architecto incidunt sunt maiores itaque culpa voluptate molestiae pariatur voluptatem laudantium nostrum maxime obcaecati asperiores minima.</p>
        <button className='gameBtn btn'>
          <div className="d-flex align-items-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 30L12.064 35.936C11.4033 36.5965 10.5617 37.0463 9.6454 37.2285C8.72913 37.4107 7.77941 37.3172 6.9163 36.9597C6.0532 36.6022 5.31546 35.9968 4.79637 35.2201C4.27729 34.4434 4.00015 33.5302 4 32.596V30L6.714 16.432C7.07649 14.6184 8.05612 12.9865 9.48623 11.8138C10.9163 10.6412 12.7086 10.0002 14.558 10H33.442C35.2914 10.0002 37.0837 10.6412 38.5138 11.8138C39.9439 12.9865 40.9235 14.6184 41.286 16.432L44 30V32.594C43.9999 33.5282 43.7227 34.4414 43.2036 35.2181C42.6845 35.9948 41.9468 36.6002 41.0837 36.9577C40.2206 37.3152 39.2709 37.4087 38.3546 37.2265C37.4383 37.0443 36.5967 36.5945 35.936 35.934L30 30H18Z" stroke="#0066AF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 10L20 14H28L30 10" stroke="#0066AF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className='gameBtnDesc'>Play Now</p>
          </div>
        </button>
      </div>
    </div>
  </>;
};

export default Turtle;

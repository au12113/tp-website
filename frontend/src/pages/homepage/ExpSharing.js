import React from 'react'

import { SharingExpTitle, SharingExpImg, youtube } from '../../assets/img'
import { detailsButtonDim } from '../../assets/button'

import './sub-banner.css'
import './exp-sharing.css'

class ExpSharing extends React.Component {
  render () {
    return (
      <div className='sub-banner-container'>
        <div className='d-flex'>
          <img
            className='sub-banner-title'
            src={SharingExpTitle}
          />
          <img
            className='d-none see-all-button'
            src={detailsButtonDim}
          />
        </div>
        <div className='d-flex'>
          <div className='d-none d-lg-flex gallery-container'>
            <img
              src={SharingExpImg}
            />
          </div>
          <div className='d-flex flex-column youtube-exp-container'>
            <div className='media-title-container d-flex justify-content-center align-items-center'>
              <img
                className='media-logo'
                src={youtube}
              />
              <span className='media-title'>ISUZU TANGPARK UBON GROUP</span>
            </div>
            <div className='d-flex justify-content-center embed-media-container'>
              <iframe
                src="https://www.youtube.com/embed/JDp72jy58Oc"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media;"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExpSharing

import React, { useState } from 'react'

import { arrowLeft, arrowRight } from '../assets/button'

import './css/promotion-banner.css'

const PromotionBanner = ({ bannerList, isDesktop, category }) => {
  const [current, setCurrent] = useState(0)
  const itemPerPage = 4
  const minTouchDistance = 50
  const minDragDistance = 60
  const lastPage = isDesktop ? Math.floor(bannerList.length / itemPerPage) - 1 : bannerList.length - 1

  let _swipe = { x: null }

  const _onTouchStart = (e) => {
    const touch = e.touches[0]
    _swipe = { x: touch.clientX }
  }

  const _onTouchEnd = (e) => {
    const touch = e.changedTouches[0]
    const changed = touch.clientX - _swipe.x
    const absX = Math.abs(changed)
    if (absX > minTouchDistance) {
      if (changed > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }
  }

  const _onDragStart = (e) => {
    _swipe.x = e.clientX
  }

  const _onDragEnd = (e) => {
    const changed = e.clientX - _swipe.x
    const absX = Math.abs(changed)
    if (absX > minDragDistance) {
      if (changed > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }
  }

  const getFilePath = (banner) => {
    const filename = isDesktop ? banner.fileName : banner.fileNameMobile
    return `${process.env.PUBLIC_URL}/img/banner/${filename}`
  }

  const nextSlide = () => {
    setCurrent(current === lastPage ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? lastPage : current - 1)
  }

  const renderBannerSlider = () => {
    const startItem = current * itemPerPage
    const endItem = (startItem + itemPerPage - 1) % itemPerPage !== 0 ? startItem + itemPerPage - 1 : startItem
    return bannerList.slice(startItem, endItem + 1).map((banner, i) => {
      const url = banner.url ?? null
      if (url !== null) {
        return (
          <div className='carousel-slide' key={i}>
            <a href={url}>
              <img src={getFilePath(banner)} />
            </a>
          </div>
        )
      } else {
        return (
          <div className='carousel-slide' key={i}>
            <img src={getFilePath(banner)} />
          </div>
        )
      }
    })
  }

  const renderBannerCarousel = () => {
    return (
      <div className='carousel-slide'>
        <img src={getFilePath(bannerList[current])} />
      </div>
    )
  }

  return (
    <div
      className='banner-slider-container d-flex flex-column'
      data-ride='carousel'
      onTouchStart={_onTouchStart}
      onTouchEnd={_onTouchEnd}
      onDragStart={_onDragStart}
      onDragEnd={_onDragEnd}
    >
      <div
        className='d-flex carousel justify-content-center banner-container'
      >
        {isDesktop ? renderBannerSlider() : renderBannerCarousel()}
      </div>
      <div className='slider-nav-container d-flex justify-content-center'>
        <img
          className={`slider-nav left align-self-center${lastPage === 0 ? ' d-none' : ''}`}
          src={arrowLeft}
          onClick={() => prevSlide()}
        />
        <ol className='slider-indicators'>
          {lastPage > 0
            ? Array(lastPage + 1).fill(1).map((el, i) => {
              return (
                <li
                  key={`${category}-${i}`}
                  data-slide-to={current}
                  className={`${i === parseInt(current) ? 'active' : ''}`}
                >
                </li>
              )
            })
            : ''}
        </ol>
        <img
          className={`slider-nav right align-self-center${lastPage === 0 ? ' d-none' : ''}`}
          src={arrowRight}
          onClick={() => nextSlide()}
        />
      </div>
    </div>
  )
}

export default PromotionBanner

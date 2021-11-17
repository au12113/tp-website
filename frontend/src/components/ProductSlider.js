import React, { useState } from 'react'
import './css/product-slider.css'

const ProductSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0)
  const length = slides.length
  let _swipe = { x: null }
  const minTouchDistance = 50
  const minDragDistance = 60

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
        nextSlide()
      } else {
        prevSlide()
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
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  return (
    <div className="styled-slider">
      <i className={`bi-chevron-left left arrow ${length === 1 ? 'd-none' : ''}`} onClick={prevSlide} />
      <i className={`bi-chevron-right right arrow ${length === 1 ? 'd-none' : ''}`} onClick={nextSlide} />
      <div className="slider-page">
        <span>{current + 1}/{length}</span>
      </div>
      <div
        className="slide-image-container"
        onTouchStart={_onTouchStart}
        onTouchEnd={_onTouchEnd}
        onDragStart={_onDragStart}
        onDragEnd={_onDragEnd}
      >
      {
        slides.map((slide, index) => {
          return (
            <div key={index} >
              { index === current && (
                <img src={slide.image} className="slide-image" alt={slide.caption} />
              )}
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default ProductSlider

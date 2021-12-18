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
      <div className="slider-page d-flex justify-content-center">
        <span className="page-number">{current + 1}/{length}</span>
      </div>
      <div
        className="slide-image-container"
        onTouchStart={_onTouchStart}
        onTouchEnd={_onTouchEnd}
        onDragStart={_onDragStart}
        onDragEnd={_onDragEnd}
      >
        <img src={slides[current].image} className="slide-image" alt={slides[current].caption} />
      </div>
    </div>
  )
}

export default ProductSlider

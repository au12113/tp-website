import React, { useState } from 'react'
import './css/product-slider.css'

const ProductSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0)
  const length = slides.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  return (
    <div className="styled-slider">
      <i className="bi-chevron-left left arrow" onClick={prevSlide} />
      <i className="bi-chevron-right right arrow" onClick={nextSlide} />
      <div className="slide-image-container">
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

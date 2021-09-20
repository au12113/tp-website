import React from 'react'

import './css/animation.css'

const FadeInSection = (props) => {
  const [isVisible, setVisible] = React.useState(false)
  const domRef = React.useRef()

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      })
    })
    if (domRef.current) {
      observer.observe(domRef.current)
    }
  }, [domRef])
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : props.slide}`}
      ref={domRef}
    >
      {props.children}
    </div>
  )
}

export default FadeInSection

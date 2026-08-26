import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react'
import { useMediaQuery } from 'react-responsive';

const Highlights = () => {

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(() => {
    gsap.to(['.left-column', '.right-column'], {
      scrollTrigger: {
        trigger: '#highlights',
        start: isMobile ? 'bottom bottom' : 'top center'
      },
      y: 0,
      opacity: 1,
      stagger: 0.5,
      duration: 3,
      ease: 'power1.inOut'
    })
  })

  return (
    <section id='highlights'>
      <h2>There's never been a better time to upgrade</h2>
      <h3>Here's what you get with the new Macbook upgrade</h3>

      <div className='masonry'>
        <div className='left-column'>
          <div>
            <img src="/laptop.png" alt="laptop" />
            <p>Fly through demanding tasks up to 9.8x faster</p>
          </div>
          <div>
            <img src="/sun.png" alt="sun" />
            <p>A stunning <br /> Liquid Retina XDR <br />display</p>
          </div>
        </div>

        <div className='right-column'>
          <div className='apple-gradient'>
            <img src="/ai.png" alt="ai" />
            <p>Built for <br /> <span>Apple Intelligence</span></p>
          </div>
          <div>
            <img src="/battery.png" alt="battery" />
            <p>Upto{" "}<span className='green-gradient'>14 hours more</span>{" "}battery life. <span className='text-dark-100'>&#40;Upto 24 hours total&#41;</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Highlights
import { Canvas } from "@react-three/fiber"
import StudioLights from "./three/StudioLights"
import { features, featureSequence } from "../constants"
import clsx from "clsx"
import type { Group } from "three"
import { Suspense, useEffect, useRef } from "react"
import { Html } from "@react-three/drei"
import { MacbookModel } from "./models/Macbook"
import { useMediaQuery } from "react-responsive"
import useMacbookStore from "../store"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

type ModelScrollProps = {
  isMobile: boolean
}

const ModelScroll = ({ isMobile }: ModelScrollProps) => {
  const groupRef = useRef<Group>(null)
  const { setTexture } = useMacbookStore()

  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement('video');
      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: 'auto',
        crossOrigin: 'anonymous',
      });

      v.load()
    })
  }, [])

  useGSAP(() => {
    if (isMobile) return

    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#f-canvas-wrapper',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
      }
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#f-canvas-wrapper',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    })

    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, { y: Math.PI * 2, ease: 'power1.inOut' })
    }

    timeline
      .call(() => setTexture('/videos/feature-1.mp4'))
      .to('.box1', {opacity: 1, y: 4, delay: 1})

      .call(() => setTexture('/videos/feature-2.mp4'))
      .to('.box2', {opacity: 1, y: 4, delay: 1})

      .call(() => setTexture('/videos/feature-3.mp4'))
      .to('.box3', {opacity: 1, y: 4, delay: 1})

      .call(() => setTexture('/videos/feature-4.mp4'))
      .to('.box4', {opacity: 1, y: 4, delay: 1})
  }, { dependencies: [isMobile], revertOnUpdate: true })

  return (
    <group ref={groupRef} rotation={isMobile ? [0, -0.5, 0] : undefined}>
      <Suspense fallback={<Html>
        <h1 className="text-white text-3xl uppercase">Loading...</h1>
      </Html>} >
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  )
}

const Features = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  return (
    <section id="features">
      <h2>See it all in a new light.</h2>

      <div id="f-canvas-wrapper">
        <Canvas id="f-canvas" camera={{

        }}>
          <StudioLights />
          <ambientLight intensity={0.5} />
          <ModelScroll isMobile={isMobile} />
        </Canvas>

        {!isMobile && (
          <div className="absolute inset-0">
            {features.map((feature, index) => {
              return (
                <div className={clsx('box', `box${index + 1}`, feature.styles)}>
                  <img src={feature.icon} alt={feature.highlight} />
                  <p>
                    <span className="text-white">
                      {feature.highlight}{" "}
                    </span>
                    {feature.text}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {isMobile && (
        <div className="feature-cards">
          {features.map((feature) => (
            <div className="feature-card" key={feature.id}>
              <img src={feature.icon} alt={feature.highlight} />
              <p>
                <span className="text-white">
                  {feature.highlight}{" "}
                </span>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Features
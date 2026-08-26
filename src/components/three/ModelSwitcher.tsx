import { PresentationControls, type PresentationControlProps } from "@react-three/drei";
import { useRef } from "react";
import gsap from "gsap";
import MacbookModel16 from "../models/Macbook-16";
import { Group, type Mesh, type MeshStandardMaterial } from "three";
import { useGSAP } from "@gsap/react";
import MacbookModel14 from "../models/Macbook-14";

type MobileSwitcherProps = {
  scale: number;
  isMobile: boolean;
}

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group: Group, opacity: number) => {
  if (!group) return;

  group.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      (mesh.material as MeshStandardMaterial).transparent = true;
      gsap.to(mesh.material, { opacity, duration: ANIMATION_DURATION })
    }
  })
}

const moveGroup = (group: Group, x: number) => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION })
}

const ModelSwitcher = ({ scale, isMobile }: MobileSwitcherProps) => {
  const smallMacbookRef = useRef<Group>(new Group());
  const largeMacbookRef = useRef<Group>(new Group());

  const showLargeMacbook = scale === 0.08 || scale === 0.05;

  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE)
      moveGroup(largeMacbookRef.current, 0)
  
      fadeMeshes(smallMacbookRef.current, 0)
      fadeMeshes(largeMacbookRef.current, 1)
    } else {
      moveGroup(smallMacbookRef.current, 0)
      moveGroup(largeMacbookRef.current, OFFSET_DISTANCE)
  
      fadeMeshes(smallMacbookRef.current, 1)
      fadeMeshes(largeMacbookRef.current, 0)
    }
  }, [scale])

  const controlsConfig: PresentationControlProps = {
    snap: true,
    speed: 1,
    zoom: 1,
    polar: [-Math.PI, Math.PI],
    azimuth: [-Infinity, Infinity],
    damping: 0.25
  }


  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>  
  )
}

export default ModelSwitcher
import logo from './logo.svg';
import './App.css';
import { useState, useContext, useRef } from 'react';
import { MenuContext } from './index'
import {Canvas} from "@react-three/fiber";
import { AmbientLight } from 'three';
import { useFrame, } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const Sphere = (props) => {
  const ref = useRef();
  const ref2= useRef();
  useFrame((state,delta) => {
    ref.current.rotation.y += delta
    ref.current.rotation.x += delta
    ref.current.position.y = Math.sin((state.clock.elapsedTime - props.position[0] - props.position[2]) *0.7)/5 
    ref2.current.rotation.y += delta
    ref2.current.rotation.x += delta
    ref2.current.position.y = Math.sin((state.clock.elapsedTime - props.position[0] - props.position[2]) *0.7) /5
  })
  return (
    <group>
      <mesh position={props.position} ref={ref} scale={props.size}>
            <sphereGeometry args={[1,2,2]} />
            <meshStandardMaterial color={props.color}/>
      </mesh>
      <mesh position={props.position} ref={ref2} scale={[props.size[0] * 1.05, props.size[1] * 1.05, props.size[2] * 1.05]}>
        <sphereGeometry args={[1.05, 2, 2]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>
    </group>
  )
}

const spheres = [];
  const numberOfSpheres = 20;

  // Generate spheres
  for (let i = -numberOfSpheres; i < numberOfSpheres; i++) {
    for (let j = -numberOfSpheres; j < numberOfSpheres; j++) {
      const x = i * 0.25;
      const y = j * 0.25;
      const z = calculateZ(x, y);
      const position = [x , z*0.2 , y];
      spheres.push(<Sphere key={i} position={position} size={[0.05, 0.05, 0.05]} color={"white"} />);
    }
  }
  function calculateZ(x, y) {
    return Math.sin(x) + Math.sin(y);
  }
  const Title = () => {
    return (
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-9xl font-black"
        style={{ zIndex: 10 }}
      >
        <h1>Omar Ayoub</h1>
      </div>
    );
  }

function App() {
  return (
    <div>
      <div className='absolute top-0 z-0 h-screen w-screen grid items-center bg-gray-900'>
          <Canvas camera={{ position: [0, 2, 0], rotation: [(-Math.PI / 2), 0, 0] }}>
            <OrbitControls/>
            <directionalLight position={[2,2,2]} intensity={1}/>
            <ambientLight intensity={0.3}/>
            {spheres}
          </Canvas>
      </div>
    </div>
  );
}

export default App;

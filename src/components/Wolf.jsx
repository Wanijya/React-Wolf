import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  useAnimations,
} from "@react-three/drei";
import { useEffect } from "react";

const Wolf = () => {
  const model = useGLTF("/models/wolf.drc.glb");

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.6;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  //   const textures = useTexture({
  //     normalMap: "/wolf_normals.jpg",
  //     sampleMatCap: "/matcap/mat-2.png"
  //   });
  //   textures.normalMap.flipY = false;
  //   textures.sampleMatCap.colorSpace = THREE.SRGBColorSpace;

  const [normalMap, sampleMatCap, brancheMap, brancheNormalsMap] = useTexture([
    "/wolf_normals.jpg",
    "/matcap/mat-2.png",
    "/branches_diffuse.jpg",
    "/branches_normals.jpg",
  ]).map((tex, i) => {
    tex.flipY = false;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  });

  const wolfMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: sampleMatCap,
  });

  const brancheMaterial = new THREE.MeshMatcapMaterial({
    normalMap: brancheNormalsMap,
    map: brancheMap,
  });

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = wolfMaterial;
    } else {
      child.material = brancheMaterial;
    }
  });

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.2, -0.53, 0]}
        rotation={[0, Math.PI / 4.5, 0]}
      />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
      <OrbitControls />
    </>
  );
};

export default Wolf;

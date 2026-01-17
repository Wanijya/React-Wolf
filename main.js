import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 100 );
scene.add(camera);
camera.position.z = 5;
console.log(camera.position);

/* MESH ==> (Shap & Material) */
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00
})

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
console.log(cube.position);

const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);
light.position.y = 4;
light.position.z = 4;
console.log(light.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( innerWidth, innerHeight );

document.body.appendChild(renderer.domElement);

function animate() {
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;
  cube.rotation.x += 0.01;
  renderer.render( scene, camera );
}
renderer.setAnimationLoop(animate);
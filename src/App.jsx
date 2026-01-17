import "./App.css";
import Wolf from "./components/Wolf.jsx";
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <>
      <Canvas>
        <Wolf />
      </Canvas>
    </>
  );
};

export default App;

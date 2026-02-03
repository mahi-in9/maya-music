import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MusicPlayer from "./player/MusicPlayer";

export default function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Home />
      </div>
    </>
  );
}

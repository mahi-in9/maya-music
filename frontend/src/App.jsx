import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Settings from "./pages/Settings";
import TrackUpload from "./pages/TrackUpload";

function App() {
  const location = useLocation();

  return (
    <div className="bg-[#0f0f0f] min-h-screen w-full text-white overflow-x-hidden">
      <Navbar />

      {/* Container for Sidebar + Main Content */}
      <div className="flex flex-col md:flex-row">
        <Sidebar />

        {/* Main content adjusts margin based on screen size (Bottom nav on mobile, Side nav on desktop) */}
        <main
          style={{ marginTop: "80px", padding: "80px" }}
          className="flex-1 mt-16 mb-16 md:mb-0 md:ml-20 p-4 md:p-6 transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Routes location={location}>
                <Route
                  path="/"
                  element={<h1 className="text-3xl font-bold">Home Page</h1>}
                />
                <Route
                  path="/shorts"
                  element={<h1 className="text-3xl font-bold">Shorts</h1>}
                />
                <Route
                  path="/subscriptions"
                  element={
                    <h1 className="text-3xl font-bold">Subscriptions</h1>
                  }
                />
                <Route
                  path="/you"
                  element={<h1 className="text-3xl font-bold">Your Profile</h1>}
                />
                <Route path="/upload" element={<TrackUpload />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;

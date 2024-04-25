import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import './App.css';


function App() {
  return (
    <div className="app-container">
      <Navbar />    
      <Home />
      <Footer />
    </div>
  );
}

export default App;

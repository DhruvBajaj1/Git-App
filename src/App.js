import React from "react";
import Home from "./Components/Home.js";
import Header from "./Components/Layout/Header"
import Footer from "./Components/Layout/Footer";
const App = () => {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};
export default App;

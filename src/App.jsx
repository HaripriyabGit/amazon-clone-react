import React from "react";

import Header from "./components/Header";
import CategoryNavbar from "./components/CategoryNavbar";


import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (

<>
      <Header />
      <CategoryNavbar/>
      <Home />
      <Login />

  </>   

     

   
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/Header";
import IndividualMovie from "../pages/IndividualMovie";
import Footer from "../components/Footer";
import { GlobalProvider } from "../context/GlobalContext";
import Favorites from "../pages/Favorites";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { APP_FOLDER_NAME } from "../utils/global";

function AppRouter() {
  return (
    <BrowserRouter basename={`/${APP_FOLDER_NAME}`}>
      <GlobalProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<IndividualMovie />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
        <Footer />
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default AppRouter;

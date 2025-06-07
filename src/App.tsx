import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import "./App.css";
import HamburgerMenu from "./components/Hamburger/Hamburger";
import { routes } from "./routes";
import useToggle from "./hooks/useToggle";

const App = () => {
  const { isOpen, toggleOpen } = useToggle();
  return (
    <>
      <Nav isOpen={isOpen} routes={routes} />
      <HamburgerMenu isOpen={isOpen} toggleOpen={toggleOpen} />
      <Header />
      <div className="mt-4 sm:mt-6 w-5/12 mx-auto border-b border-slate-200"></div>
      <Router>
        <Routes>
          {routes.map((r) =>
            r.component ? (
              <Route path={r.path} element={<r.component />} />
            ) : null
          )}
        </Routes>
      </Router>
    </>
  );
};
export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectRouter from "./components/HOC/ProtectRouter";
import { routes } from "./config/routes";

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((router, idx) => {
          const { path, element, requiredLogin } = router;
          return (
            <Route
              path={path}
              key={idx}
              element={
                requiredLogin ? (
                  <ProtectRouter>{element}</ProtectRouter>
                ) : (
                  element
                )
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default App;

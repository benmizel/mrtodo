import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AddTaskPage from "./pages/AddTaskPage/AddTaskPage";
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./App.scss";

function App() {
  const { user, loading } = useAuth();
  let navigate = useNavigate();

  if (loading) return <div className="loader">Loading...</div>;

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/add"
            element={
              <PrivateRoute>
                <AddTaskPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/edit/:id"
            element={
              <PrivateRoute>
                <EditTaskPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

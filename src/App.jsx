import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AddTaskPage from "./pages/AddTaskPage/AddTaskPage";
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./App.scss";

function App() {
  const { user, loading, logout, deleteAccount } = useAuth();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <>
      <BrowserRouter>
        <Header
          user={user}
          logout={logout}
          setDeleteModalOpen={setDeleteModalOpen}
          isDeleteModalOpen={isDeleteModalOpen}
          deleteAccount={deleteAccount}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks/add" element={<AddTaskPage />} />
          <Route path="/tasks/edit/:taskId" element={<EditTaskPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

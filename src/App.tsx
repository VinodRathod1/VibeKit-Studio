import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';
import PublishedPage from './pages/PublishedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/p/:slug" element={<PublishedPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<DashboardPage />} />
          <Route path="/app/pages/:id" element={<EditorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

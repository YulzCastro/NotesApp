import './App.css';
import { Routes, Route } from 'react-router-dom';
import { SiderBar } from "./components/sidebar";
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { ViewNotas } from './pages/ViewNotes';

function App() {
  return (
    <div >
      <header>
        <SiderBar />
      </header>
      <main>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/viewNotas" element={<ViewNotas />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

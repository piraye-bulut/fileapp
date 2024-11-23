import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AllRoutes } from './routes/AllRoutes';
import { Header } from './components/Header';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
        <Header />
        <AllRoutes />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
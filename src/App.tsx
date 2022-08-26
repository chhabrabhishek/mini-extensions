import './App.css';
import { useState } from 'react';
import store from './components/store/store';
import Login from './components/Login/Login';
import {login} from './components/store/actions';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  store.subscribe(() => {
    setShowDashboard(store.getState().isLoggedIn)
  })

  const handleLogin = (isLogin: boolean) => {
    store.dispatch(login(isLogin))
  }

  return (
    <div className="App">
      {!showDashboard && <Login onLogin={handleLogin} />}
      {showDashboard && <Dashboard />}
    </div>
  );
}

export default App;

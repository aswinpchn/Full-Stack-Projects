import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import OnBoarding from './Components/Onboarding';
import ApplicationBar from './Components/ApplicationBar';
import Dashboard from './Components/Dashboard';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';

import front_end_url from './config';
import { UserContext } from './UserContext';

const cookies = new Cookies();

function App() {

  // Firstly, in order to have a dynamic context which can be passed to the consumers, I'll use the parent's state. This ensures that I've a single source of truth going forth.
  const [user, setUser] = useState({
    isLoggedIn: false,
    user: {}
  });

  // useState React hook. [] This will run on first load only. If cookie is there, replenish Context.
  useEffect(async () => { 
    if (cookies.get('userDetails')) {
      setUser({
        isLoggedIn: true,
        user: {
          email: cookies.get('userDetails').email,
          password: cookies.get('userDetails').password,
        },
      });

      try {
        let data = {
          email: cookies.get('userDetails').email,
          password: cookies.get('userDetails').password,
        };
        let result = await axios.post(`${front_end_url}/users/login`, data);
        
        setUser({
          isLoggedIn: true,
          user: {
            ...result.data
          },
        });
      } catch(e) {
        
      }

    }
  }, []);

  return (
    <div>
      <UserContext.Provider value={{user, setUser}}>
        <ApplicationBar />
        <Router>
          <Switch>
            <Route exact path='/onboarding' render={() => {
              if (user && user.isLoggedIn) {
                return <Redirect to="/dashboard" />;
              } else {
                return <OnBoarding />;
              }
            }} />
            <Route path='/dashboard' render={() => {
              if (user && user.isLoggedIn) {
                return <Dashboard />;
              } else {
                return <Redirect to="/onboarding" />;
              }
            }} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

/*
Router exact - https://stackoverflow.com/questions/49162311/
Authenticated routes - https://ui.dev/react-router-v5-protected-routes-authentication/
React Context - We are using React Context instead of Redux, as this is simple to setup and get going.
  https://reactjs.org/docs/context.html
  Google search, Redux vs Context.
  Good explanation on how to setup - https://stackoverflow.com/questions/41030361/
  https://www.youtube.com/watch?v=lhMKvyLRWo0
  Remember that, like Redux, even Context is not retained on refresh, so do something during first time mount to replenish the value. https://stackoverflow.com/questions/53453861/react-context-api-persist-data-on-page-refresh
  
*/
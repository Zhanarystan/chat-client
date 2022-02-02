import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useStore } from './app/stores/store';
import AlertCreation from './components/AlertCreationPage/AlertCreation';
import AlertList from './components/AlertCreationPage/AlertList';
import LoginPage from './components/LoginPage/LoginPage';
import MapPage from './components/MapPage/MapPage';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser();
    }
  }, [commonStore, userStore])
  
  return (
    <div className="container mt-5">
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/alerts' component={AlertList} />
        <Route path='/sendalert' component={AlertCreation} exact/>
      </Switch>
      
    </div>

  );
}

export default App;

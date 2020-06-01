import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import ListCustomer from './component/ListCustomer';
import AddCustomer from './component/AddCustomer';
import EditCustomer from './component/EditCustomer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <h1 style={style}>React Application</h1>
          <Switch>
            <Route path="/" exact component={ListCustomer}/>
            <Route path="/customers" component={ListCustomer}/>
            <Route path="/add-customer" component={AddCustomer}/>
            <Route path="/edit-customer" component={EditCustomer}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const style = {
  color : 'red',
  margin : '10px'

}

export default App;

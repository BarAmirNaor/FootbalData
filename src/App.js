import Table from './Table'
import Team from './Team';
import React from "react";
import {BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom';

function App() {
    let [ visitedFirstTime ] = React.useState(true);
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/teams/:id" component={Team}/>
                    <Route exact path = '/'>
                        {visitedFirstTime ?
                            <Redirect to = '/teams'/>
                            :
                            <Table/>
                        }
                    </Route>
                    <Route exact path = '/teams'>
                        <Table/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

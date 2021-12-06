import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Register from "../pages/Register"

const unAuthenticed = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/"  component={Register}/>
        </Switch>
            
            
        </BrowserRouter>
    )
}

export default unAuthenticed

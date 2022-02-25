import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
const Render=()=>{
    return <Switch>
      {[
      {
        path: "/test",
        component: <div>test</div>
      },
      {
        path: "/home",
        component: <div>home</div>
      },
      {
        path: "/",
        redirect: '/test',
      },
    ].map((route,key) => {
        if(route.component) {
          return <Route  key={key}  path={route.path} render = {
            props =>(
                <route.component {...props} routes={route.routes}/>
            )
        }>
            </Route>
        } else if(route.redirect) {
          return <Redirect key={key} to="/test" from='/' />
        }
      })}
  </Switch>
  }
  export default Render
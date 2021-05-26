# Part II of Udemy course, these are my notes

This part of the course will focus in routing, authentication and interaction with databases

## Basics of React-Router
Client side routing with this is tool is basically matching routes to components. Named imports for ```BrowserRouter``` and ```Route``` are necessary from ```react-router-dom``` (in case you're working with a web app). With those two components layout your routh handling. See more [here](https://reactrouter.com/web/guides/quick-start)...
It's necessary to config webpack to not use classic server side routing (otherwise you'll get an error in the style of "Cannot GET /someroute"). In devServer prop set historyApiFallback to true. Close webpack and rerun dev-server. You'll see in the logs

```
i ｢wds｣: 404s will fallback to /index.html
```

Set the prop ```exact={true}``` in the Route component, to match only the exact route and render just one component. When React router matches our paths, it just cares if the path at least starts with whatever we have. (Does /someroute starts with a /? Yes, so route "/" is a match.)

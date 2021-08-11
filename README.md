# multiple configurations

## solution 1: multiple configurations angular.json

```
// angular.json
{
  ...
  "verson":1,
  "projects":{
    "your-project-name":{
       "architect": {
           "build": {
               "configurations": {
                "production": {
                   "fileReplacements": [
                  {
                    "replace": "src/environments/environment.ts",
                    "with": "src/environments/environment.prod.ts"
                  }
                ],
              },
               "staging-client-a": {
                   "fileReplacements": [
                  {
                    "replace": "src/environments/environment.client-a.staging.ts",
                    "with": "src/environments/environment.prod.ts"
                  }
                ],
              },
               "staging-client-b": {
                   "fileReplacements": [
                  {
                    "replace": "src/environments/environment.client-b.staging.ts",
                    "with": "src/environments/environment.prod.ts"
                  }
                ],
              }
            }
}
```

ng build --configuration=stage-client-a  
> <strong>Default</strong>: we should rebuild for every configuration

## solution 2: multiple configurations without rebuild by  using independent env.js

* Under src folder, create an env.js. Attach environment variables(e.g. backend api url) to window object. 

```
(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.apiUrl = "http://dev.your-api.com";

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
})(this);

```
* link env.js at head section of index.htm

```
// index.html
<html>
  <head>
    <script src="env.js"></script>
  <head>
  <body>

  </body>
</html>
```

* in angular.json , add env.js in assets list
* create service and provider
* add this provider to app.module.ts provides
* inject the service into components or other elements as needed  
> <strong>Advantage</strong>: When we need change the environemnt variables, we just modify the env.js file  , refresh the browser and need not rebuild the app.

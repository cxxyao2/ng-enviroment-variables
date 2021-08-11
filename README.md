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
default: we should rebuild for every configuration

## solution 2: multiple configurations using independent env.js

> > 1，under src folder, create an env.js. Attach environment variables(e.g. backend api url) to window object.

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

link env.js at head section of index.htm

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

3，in angular.json , add env.js in assets list
4，create service and provider
5, add this provider to app.module.ts provides
6, inject the service into components or other elements as needed.

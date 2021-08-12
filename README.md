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

## solution 2: multiple configurations without rebuild by using independent env.js

- Under src folder, create an env.js. Attach environment variables(e.g. backend api url) to window object.

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

- link env.js at head section of index.htm

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

- in angular.json , add env.js in assets list
- create service and provider
  - EnvService is a simple class having 2 public properties.
  - Provider instantiates the EnvService. In a word, the factory method returns an object with necessary properties coming from env variables in env.js

```
// EnvService
export class EnvService {
  public apiUrl = '';
  public enableDebug = true;
  constructor() {}
}

```

```
// EnvServiceProvider
import { EnvService } from './env.service';

export const EnvServiceFactory = () => {
  // Create env
  const env = new EnvService();

  // Read environment variables  from browser window
  const browserWindow = window || {};
  const browserWindowEnv = browserWindow['__env'] || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js
  // If needed, a deep merge can be performed
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      env[key] = window['__env'][key];
    }
  }

  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};

```

- add this provider to app.module.ts provides
- inject the service into components or other elements as needed
  > <strong>Advantage</strong>: When we need change the environemnt variables, we just modify the env.js file , refresh the browser and need not rebuild the app.
  <hr/>

# apollo client, graphQL

- $ng add apollo-angular

- backend repository is hosted on [https://github.com/cxxyao2/graphql_mongo1](https://github.com/cxxyao2/graphql_mongo1)
- screenshot

> ![graphQL Result](https://github.com/cxxyao2/ng-enviroment-variables/blob/master/src/assets/result1.png)



# `lambda-function-concept` #

***Lambda POC***

## Layers ##

Given a Lambda Layer that's targetted for inclusion (`layer`):

```
├── library
│   └── layer
│       ├── README.md
│       ├── ci
│       │   └── Layer-Template.Yaml
│       ├── documentation
│       │   └── NPM-Usage.md
│       ├── index.js
│       ├── package-lock.json
│       ├── package.json
│       ├── scripts
│       │   ├── build.js
│       │   ├── copy.js
│       │   ├── install.js
│       │   ├── package.json
│       │   └── subprocess.js
│       ├── src
│       │   ├── index.js
│       │   └── uuid.js
│       └── unit-testing
│           ├── index.test.js
│           └── package.test.js
```

A select number defaults are presented:

1. The layer's `dependencies` section needs to have reference to itself.
    - Example:
    ```json
    {
        "name": "@cloud-technology/lambda-layer-concept",
        "private": true,
        "version": "0.1.3",
        "description": "Lambda Layer Dependencies Proof of Concept",
        "repository": "git+https://github.com/cloud-hybrid/lambda-layer-concept.git",
        "main": "index.js",
        "scripts": {
            "build": "cd scripts && npm run build"
        },
        "dependencies": {
         // --> "@cloud-technology/lambda-layer-concept": "cloud-hybrid/lambda-layer-concept#Development",
            "uuid": "^8.3.2"
        }
    }
    ```
    - In order to achieve arbitrary Lambda Layer deployable(s), the exact name found in the layer's `dependencies` section to itself
    **also needs to be how the Lambda Function imports the package**. Example) `const $ = require("@cloud-technology/lambda-layer-concept");`
    - No other means for creating layers that can be generically included during a pipeline's runtime *currently* exists.
1. It's of course best to keep the name consistent in both the Lambda Layer's `package.json`'s `name` ***and*** `dependencies` sections; however,
   it is not required.
1. With limitations due to system-specific, local hoisting, the `dependencies` target URI **cannot be `"."` or other local-like URIs**. Either an
   NPM reference, or more privately, a git-uri is required. See NPM packaging guide(s) for additional details as such is outside the scope of the
   following repository's focus.
1. To faciliatate local development, include the Lambda Layer within the Lambda Function's `package.json`'s `devDependencies` section:
    ```json
    {
        "name": "lambda-function-concept",
        "version": "0.0.3",
        "description": "Lambda POC",
        "main": "index.js",
        "scripts": {},
        "repository": "git+https://github.com/cloud-hybrid/lambda-function-concept.git",
        "devDependencies": {
        // --> "@cloud-technology/lambda-layer-concept": "cloud-hybrid/lambda-layer-concept#Development",
            "aws-sdk": "^2.1048.0"
        }
    }
    ```
1. Construction of the layer needs to follow an incredibly strict structure in order to be impliclitly included during a `node.js` runtime:
   ```
   distribution/library
    └─ layer
        └── nodejs
            ├── README.md
            ├── index.js
            ├── node_modules
            │   ├── @cloud-technology
            │   │   └── lambda-layer-concept
            │   │       ├── Layer-Template.Yaml
            │   │       ├── README.md
            │   │       ├── documentation
            │   │       │   └── NPM-Usage.md
            │   │       ├── index.js
            │   │       ├── package.json
            │   │       ├── scripts
            │   │       │   ├── build.js
            │   │       │   ├── copy.js
            │   │       │   ├── install.js
            │   │       │   ├── package.json
            │   │       │   └── subprocess.js
            │   │       ├── src
            │   │       │   ├── index.js
            │   │       │   └── uuid.js
            │   │       └── unit-testing
            │   │           ├── index.test.js
            │   │           └── package.test.js
            │   └── uuid
            ├── package-lock.json
            └── package.json
   ```
   - Notice the `nodejs/index.js` file; the `index.js` becomes essentially a system-wide callable during a lambda runtime (I haven't tested such throughly yet, nor likely will I in the future, but in the case of at least a Lambda Layer's `handler` definition, the entry-point certainly does), relative to the `nodejs` directory's root. Then, due to NPM-related packaging, all sub-packages found immediately relative to the `index.js`'s root under the `node_modules` directory becomes importable.
   - While other means for imports exist (i.e. `const $ = require("/opt/nodejs/node_modules/@cloud-technology/lambda-layer-concept/index.js")`), full
   directory inclusion is incredibly difficult to locally test against, causes drift between local-development and cloud-deployment(s), and prevents
   local development-related efficiencies like type-hinting, debugging, IDE extensions or other local practices from being able to take place.

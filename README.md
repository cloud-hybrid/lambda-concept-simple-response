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

A select number defaults are required:

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
        - It's of course best to keep the name consistent in both the Lambda Layer's `package.json`'s `name` ***and*** `dependencies` sections; however,
        it is not required.
        - With limitations due to system-specific, local hoisting, the `dependencies` target URI **cannot be `"."` or other local-like URIs**. Either an
        NPM reference, or more privately, a git-uri is required. See NPM packaging guide(s) for additional details as such is outside the scope of the
        following repository's focus.

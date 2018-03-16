# Bearshark
Bearshark is a tool used for visual analysis of a javascript codebase.
It visualizes a codebases internal file dependencies based on `import` or `require` statements.
The visualization requires [React](https://reactjs.org/) since the module onnly provides a React component for the visualization. However the actual codebase does **not** have to be React.

## Getting started
First install Bearshark
```
    npm install --save-dev bearshark
```

### Edit package.json
In your `package.json` file add a Bearshark task for running the server
```
    ...
    scripts {
        "bearsharkServer": "bearshark",
        ...
    }
    ...
```
### Add config file
Bearshark is expecting a config json file to be placed in the same directory as `package.json`.
The config file must be named `bearshark.json` and have the following content
```json
    {
      "filename": "path_to_entry_file",
      "directory": "path_to_directory_containing_source_code",
      "webpackConfig": "(optional) path_to_webpack_config"
    }
```
The filename tell Bearshark which file to use as root of the dependency graph. The directory should be the path to the folder containing all the source code.
webpackConfig is the path to your webpack config file. This only has to be provided if you are using webpack and are using aliases.

### Running the Bearshark server
The Bearshark server is in charge of extracting the dependency graph from your codebase and serving it to the visualization components. It has to run for the visualization to work.
Simply run the script you added to `package.json` in order to start the server
```
    npm run bearsharkServer
```

### Visualizing the dependency graph
The dependency graph provided by the Bearshark server can be easily visualized in a browser within any React application.

`import` the Bearshark React component and render it from your React component of choice
```javascript
    import Bearshark from 'bearshark';
    ...
    render() {
        <Bearshark
            width={600}
            height={600}/>
    }
```
You can provide 3 props to the component
* **width**: The width of the component in pixels
* **height**: The height of the component in pixels
* **url** (optional): The url of the Bearshark server. If no url is provided the default bearshark server is used.

The Bearshark React component calls the Bearshark server on mount. This enforces the server to generate a new dependency graph and serve it for visualization.

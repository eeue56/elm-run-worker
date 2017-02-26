#!/usr/bin/env node

const yargs = require('yargs');

const compiler = require('node-elm-compiler');
const compileToString = compiler.compileToString;
const compile = compiler.compile;

const yargv = yargs
    .example('$0 Main.elm', 'Compile then run Main.elm')
    .alias('v', 'verbose')
    .default('v', false)
    .describe('v', 'Print all messages out')
    .alias('o', 'output')
    .default('o', null)
    .describe('o', 'Store the generated code in the given output file')
    .help('h')
    .alias('h', 'help')
    .argv;


const files = yargv._;


const dontStore = (files, isVerbose) => {
    const options = {
        yes: true,
        output: ".js",
        verbose: isVerbose
    };

    compileToString(files, options).then(function(body){
        // make it runable cause Elm is not wrapped properly
        var Elm = eval(body + "\nmodule.exports = module.exports;");

        Object.keys(Elm).forEach(function(name){
            if (yargv.verbose) console.log('Starting ', name, "...");
            Elm[name].worker();
        })
    }).catch(function(error){
        console.error("Something went wrong!");
        console.error(error);
    });
};


const store = (files, outputFile, isVerbose) => {
    const options = {
        yes: true,
        output: outputFile,
        verbose: isVerbose
    };

    compile(files, options);
};


if (files.length < 1){
    console.error('Please give at least one file!');
    return;
} else {
    if (yargv.verbose) console.log('Compiling: ', files);
}

if (yargv.o === null || typeof yargv.o == "undefined") {
    dontStore(files, yargv.verbose);
} else {
    store(files, yargv.o, yargv.verbose);
}


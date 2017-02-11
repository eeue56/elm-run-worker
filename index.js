#!/usr/bin/env node

const yargs = require('yargs');

const compileToString = require('node-elm-compiler').compileToString;
const yargv = yargs
    .example('$0 Main.elm', 'Compile then run Main.elm')
    .alias('v', 'verbose')
    .default('v', false)
    .describe('v', 'Print all messages out')
    .help('h')
    .alias('h', 'help')
    .argv;


const files = yargv._;
const options = {
    output: ".js"
};

if (files.length < 1){
    console.error('Please give at least one file!');
    return;
} else {
    if (yargv.verbose) console.log('Compiling: ', files);
}

compileToString(files, options).then(function(body){
    var Elm = eval(body + "\nmodule.exports = module.exports;");
    console.log(Elm);

    Object.keys(Elm).forEach(function(name){
        if (yargv.verbose) console.log('Starting ', name, "...");
        Elm[name].worker();
    })
}).catch(function(error){
    console.error("Something went wrong!");
    console.error(error);
});

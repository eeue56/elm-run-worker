# elm-run-worker

Compile and run Elm files in worker mode in a single command. 
Useful for testing Node-based Elm apps!

## Install

```
npm install -g elm-run-worker
```

## Usage

```
noah@Noahs-MacBook-Pro ~/d/elm-run-worker> elm-run-worker --help
Options:
  -v, --verbose  Print all messages out                         [default: false]
  -o, --output   Store the generated code in the given output file
                                                                 [default: null]
  -h, --help     Show help                                             [boolean]

Examples:
  /usr/local/bin/elm-run-worker Main.elm  Compile then run Main.elm
```


## Example

### Compile + run `example/Main.elm` 

```
elm-run-worker example/Main.elm --output elm.js
```


### Compile + run `example/Main.elm` and store it in `elm.js`

```
elm-run-worker example/Main.elm --output elm.js
```


### Compile + run `example/Main.elm` `example/OtherMain.elm` and store it in `elm.js`

```
elm-run-worker example/Main.elm example/OtherMain.elm --output elm.js
```
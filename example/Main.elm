module Main exposing (..)

import Platform
import Task


main : Program Never Model Msg
main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    Int


init : ( Model, Cmd Msg )
init =
    ( 0, Task.attempt CompiledThing (Task.succeed "example/Main.elm") )


type Msg
    = CompiledThing (Result String String)


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        CompiledThing thing ->
            case thing of
                Err message ->
                    let
                        _ =
                            Debug.log "Urm, it failed due to " message
                    in
                        ( model, Cmd.none )

                Ok answer ->
                    let
                        _ =
                            Debug.log "It passed! And was " <| String.length answer
                    in
                        ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none

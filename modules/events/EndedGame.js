import Event from "./Event.js"

export default class EndedGame extends Event{

    json(){
        return {
            "type" : "ended_game",
        }
    }
}
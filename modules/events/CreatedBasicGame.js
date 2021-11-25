import Event from "./Event.js"

export default class CreatedBasicGame extends Event{

    #type="basic"

    json(){
        return {
            "type" : "created_game",
            "data" : {
                "type" : this.#type
            }
        }
    }

    isReady(){
        return true
    }
}
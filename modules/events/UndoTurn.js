import Event from "./Event.js"

export default class UndoTurn extends Event{

    #player
    
    constructor(player){
        super()
        this.#player = player
    }

    json(){
        return {
            "type" : "undo_turn",
            "data" : {}
        }
    }

    isReady(){
        return true
    }
   
    availableActions(game){
        return []
    }

    
}
import Event from "./Event.js"

export default class EndedTurn extends Event{

    #player
    
    constructor(player){
        super()
        this.#player = player
    }

    json(){
        return {
            "type" : "ended_turn",
            "data" : {
                "player" : this.#player,
            }
        }
    }

    isReady(){
        if(!this.#player){ return false }
        return true
    }
   
    availableActions(game){
        if(!this.#player){ return this.actionsWhenNoPlayer() }
    }

    actionsWhenNoPlayer(){
        let blackInteraction = this.json()
        blackInteraction.data.player = "b"
        let whiteInteraction = this.json()
        whiteInteraction.data.player = "w"
        return {
            message:"Which player?",
            options:[
                {text:"Black", interaction:blackInteraction},
                {text:"White", interaction:whiteInteraction}
            ]
        }
    }
}
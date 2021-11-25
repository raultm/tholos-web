import ActionBuilder from "../actions/ActionBuilder.js"
import Event from "./Event.js"
export default class TriggeredAction  extends Event{

    #player
    #action
    #source
    #target

    constructor(player, action, source, target){
        super()
        this.#player = player
        this.#action = action
        this.#source = source
        this.#target = target
    }

    json(){
        return {
            "type" : "triggered_action",
            "data" : {
                "player" : this.#player,
                "action" : this.#action,
                "source" : this.#source,
                "target": this.#target
            }
        }
    }

    isReady(){
        return ActionBuilder.fromEvent(this.json()).isReady()
    }
    

    availableActions(game){
        return ActionBuilder.fromEvent(this.json()).availableActions(game)
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

    actionsWhenNoSource(game){
        let columnNames = Object.keys(game.columns())
        let options = []
        columnNames.map( name => {
            if(game.isAvailableSpaceInColumn(name)){
                let columnInteraction = this.json()
                columnInteraction.data.source = name
                options.push({text:name, interaction:columnInteraction})
            }
        }, this)
        
        return {
            message:"From which Column?",
            options:options
        }
    }

    actionsWhenNoTarget(game){
        let columnNames = Object.keys(game.columns())
        let options = []
        columnNames.map( name => {
            if(game.isAvailableSpaceInColumn(name)){
                let columnInteraction = this.json()
                columnInteraction.data.target = name
                options.push({text:name, interaction:columnInteraction})
            }
        }, this)
        
        return {
            message:"To which Column?",
            options:options
        }
    }
}
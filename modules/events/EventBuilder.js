import CreatedBasicGame from "./CreatedBasicGame.js";
import PickedStones from "./PickedStones.js";
import PlacedStone from "./PlacedStone.js";
import TriggeredAction from "./TriggeredAction.js";
import EndedGame from "./EndedGame.js";
import EndedTurn from "./EndedTurn.js";
import UndoTurn from "./UndoTurn.js";

export default class EventBuilder {

    #type
    #player
    #color
    #amount
    #column
    #action
    #source
    #target

    constructor(type){
        this.#type = type
    }
    
    player(player) {
        this.#player = player
        return this
    }

    color(color) {
        this.#color = color
        return this
    }

    amount(amount) {
        this.#amount = amount
        return this
    }

    column(column) {
        this.#column = column
        return this
    }

    action(action) {
        this.#action = action
        return this
    }

    source(source) {
        this.#source = source
        return this
    }

    target(target) {
        this.#target = target
        return this
    }

    build(){
        switch(this.#type){
            case "created_game":
                return new CreatedBasicGame()
            case "picked_stones":
                return new PickedStones(this.#player, this.#color, this.#amount)
            case "placed_stone":
                return new PlacedStone(this.#player, this.#color, this.#column)
            case "ended_turn":
                return new EndedTurn(this.#player)
            case "ended_game":
                return new EndedGame()
            case "triggered_action":
                return new TriggeredAction(this.#player, this.#action, this.#source, this.#target)
            case "undo_turn":
                return new UndoTurn()
            default:
                throw new Error(`Trying to build an event ${this.#type}. Check spelling ${this.constructor.name} ${this.#type}`)
        }
    }

    static createdBasicGameEvent(type = ""){ 
        switch (type) {
            case "json": return new EventBuilder("created_game").build().json()
            default : new EventBuilder("created_game").build() 
        }
    } 
    static createdBasicGameEventJson(){ return EventBuilder.createdBasicGameEvent("json") } 
    static pickedStonesEvent(player, color, amount){ return new EventBuilder("picked_stones").player(player).color(color).amount(amount).build().json() } 
    static placedStoneEvent(player, color, column){ return new EventBuilder("placed_stone").player(player).color(color).column(column).build().json() }
    static triggeredActionEvent(player, action, source, target){ return new EventBuilder("triggered_action").player(player).action(action).source(source).target(target).build().json() }
    static endedTurnEvent(player){ return new EventBuilder("ended_turn").player(player).build().json() } 
    static undoTurnEvent(player){ return new EventBuilder("undo_turn").build().json() } 
    static endedGameEvent(player){ return new EventBuilder("ended_game").build().json() } 

    static fromInteraction(interaction){
        //console.log(typeof interaction, JSON.parse())
        if(typeof interaction == "string"){
            interaction = JSON.parse(interaction)
        }
        
        let tmp = interaction ?? {}
        let data = tmp.data ?? {}
        return new EventBuilder(interaction.type || "")
                .player(data.player || "")
                .action(data.action || "")
                .color(data.color || "")
                .amount(data.amount || "")
                .column(data.column || "")
                .source(data.source || "")
                .target(data.target || "")
                .build()
    }
}
  
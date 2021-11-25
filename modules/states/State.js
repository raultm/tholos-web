import EventBuilder from "../events/EventBuilder.js"
import Stage from "./Stage.js"

export default class State {
    
    #name ="Error"
    #stage = new Stage

    setName(name) {
        this.#name = name
    }

    name() {
        return this.#name
    }

    setStage(stage){
        this.#stage = stage
    }

    stage(){
        return this.#stage
    }

    availableActions(game){
        throw new Error("You must define an availableActions method in you Class " + this.constructor.name)
    }

    evolve(game, event) {
        switch (event.type) {
            case "ended_game":
                return game.setStatus(new EndGame())
            default:
                throw new Error(`You must define an evolve method in your Class ${this.constructor.name} or you didn't handle the event correcty "${event.type}"`)
        }
    }

    handlingInteraction(game, interaction){
        let event = EventBuilder.fromInteraction(interaction)
        if(event.isReady()){
            game.evolve(event.json())
        }
    }

    on(game){
        throw new Error(`You must define an on method in your Class ${this.constructor.name}`)
    }

}
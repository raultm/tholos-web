import Action from "./Action.js";
import EventBuilder from "../events/EventBuilder.js";

export default class MoveColumn2Column extends Action {
    
    #stone
    
    stone(){
        return this.#stone
    }

    setStoneColor(color){
        this.#stone = color
    }

    isPlayable(game, event){
        return     game.columnTop(event.data.source) == this.#stone
                && game.isAvailableSpaceInColumn(event.data.target)
    }

    play(game, event){
        return game.column2column(event.data.source, event.data.target)
    }
    
    isReady(){
        if(!this.event().data.player){ return false }
        if(!this.event().data.action){ return false }
        if(!this.event().data.source){ return false }
        if(!this.event().data.target){ return false }
        return true
    }
    
    reason(game, event){
        if(game.columnTop(event.data.source) != this.#stone){
            return `${event.data.source} does not have a ${this.#stone} stone on top to move`
        }

        if(! game.isAvailableSpaceInColumn(event.data.target)){
            return `${event.data.target} does not have room for move stone over it`
        }
        
    }

    isAvailable(game){
        let event = game.currentStatus().stage().event()
        if(!event.type == "placed_stones"){
            return false
        }
        if(event.data.player != event.data.color){
            return false
        }
        let self = this
        // Retrieve columns names, filter column, true if any has black stone on top
        return Object
            .keys(game.columns())
            .filter(val => val != event.data.column)
            .reduce( (acc, current) => {
                return acc || game.columnTop(current) == self.stone();
            }, false)
        
    }

    availableActions(game){
        let event = EventBuilder.fromInteraction(game.getInteraction())
        let eventJson = event.json()
        
        if(!eventJson.data.source){ return this.actionsWhenNoSource(game, event) }
        if(!eventJson.data.target){ return this.actionsWhenNoTarget(game, event) }
        return []
    }

    actionsWhenNoSource(game, event){
        let placedStoneEvent = game.currentStatus().stage().event()
        let columnNames = Object.keys(game.columns())
        let options = []
        columnNames
            .filter(val => val != placedStoneEvent.data.column)
            .map( name => {
                if(game.columnTop(name) == this.stone()){
                    let columnInteraction = event.json()
                    columnInteraction.data.source = name
                    options.push({text:name, interaction:columnInteraction})
                }
            }, this)
        
        return {
            message:"From which column?",
            options:options
        }
    }

    actionsWhenNoTarget(game, event){
        let placedStoneEvent = game.currentStatus().stage().event()
        let columnNames = Object.keys(game.columns())
        let options = []
        columnNames
            .filter(val => val != placedStoneEvent.data.column)
            .filter(val => val != event.json().data.source)
            .map( name => {
                if(game.isAvailableSpaceInColumn(name)){
                    let columnInteraction = event.json()
                    columnInteraction.data.target = name
                    options.push({text:name, interaction:columnInteraction})
                }
            })
        
        return {
            message:"To which column?",
            options:options
        }
    }
}
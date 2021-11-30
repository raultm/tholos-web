import Action from "./Action.js";
import EventBuilder from "../events/EventBuilder.js";

export default class Gamma extends Action{

    getDescription(){
        return "May return the top stone (of any color) of the column at a different temple location back to the quarry."
    }

    infoNoSource(){
        return `${this.event().data.player} needs to select between columns to return top stone to quarry`
    }

    isPlayable(game, event){
        if( game.column(event.data.source).stones.length == 0){
            return false
        }
        return true
    }

    play(game, event){
        return game.workshop2quarry(event.data.player, event.data.source)
    }

    reason(game, event){
        if( game.column(event.data.source).stones.length == 0){
            return `${event.data.source} does not have any stone over it`
        }
    }

    isReady(){
        if(!this.event().data.player){ return false }
        if(!this.event().data.action){ return false }
        if(!this.event().data.source){ return false }
        //if(!this.event().data.target){ return false }
        return true
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
        // Retrieve quarry & check if all empty
        return Object
            .keys(game.columns())
            .filter(val => val != event.data.column)
            .reduce( (acc, current) => {
                return acc || !game.isColumnEmpty(current)
            }, false)
        
    }

    availableActions(game){
        let event = EventBuilder.fromInteraction(game.getInteraction())
        let eventJson = event.json()
        
        if(!eventJson.data.source){ return this.actionsWhenNoSource(game, event) }
        return []
    }

    actionsWhenNoSource(game, event){
        let placedStoneEvent = game.currentStatus().stage().event()
        let columnNames = Object.keys(game.columns())
        let options = []
        columnNames
            .filter(val => val != placedStoneEvent.data.column)
            .map( column => {
                if(!game.isColumnEmpty(column)){
                    let columnInteraction = event.json()
                    columnInteraction.data.source = column
                    options.push({text:column, interaction:columnInteraction})
                }
            }, this)
        
        return {
            message:[
                this.infoAction(),
                this.infoNoSource(),
                "From which column?"
            ],
            options:options
        }
    }
}
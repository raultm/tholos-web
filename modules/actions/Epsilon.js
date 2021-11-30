import Action from "./Action.js";
import EventBuilder from "../events/EventBuilder.js";


export default class Epsilon extends Action{

    getDescription(){
        return "May place a stone (of any color) from their workshop in another valid temple location."
    }

    infoNoSource(){
        return `${this.event().data.player} needs to select between available colors in own workshop`
    }
    
    infoSource(){
        return `${this.event().data.player} has selected ${this.event().data.source} stone from own workshop`
    }

    infoNoTarget(){
        return `${this.event().data.player} needs to select target column`
    }

    isPlayable(game, event){
        let stoneWorkshopIndex = game.player(event.data.player).workshop.indexOf(event.data.source)
        if(stoneWorkshopIndex == -1){
            return false
        }
        if( ! game.isAvailableSpaceInColumn(event.data.target)){
            return false
        }
        return true
    }

    play(game, event){
        return game.workshop2column(event.data.player, event.data.source, event.data.target)
    }

    reason(game, event){
        let stoneWorkshopIndex = game.player(event.data.player).workshop.indexOf(event.data.source)
        if(stoneWorkshopIndex == -1){
            return `${event.data.player} does not have a ${event.data.source} stone in workshop`
        }
        if( ! game.isAvailableSpaceInColumn(event.data.target)){
            return `${event.data.target} does not have a empty space`
        }
    }

    isReady(){
        if(!this.event().data.player){ return false }
        if(!this.event().data.action){ return false }
        if(!this.event().data.source){ return false }
        if(!this.event().data.target){ return false }
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
        return game.usedSlotsInWorkshop(event.data.player)
        
    }

    availableActions(game){
        let event = EventBuilder.fromInteraction(game.getInteraction())
        let eventJson = event.json()
        
        if(!eventJson.data.source){ return this.actionsWhenNoSource(game, event) }
        if(!eventJson.data.target){ return this.actionsWhenNoTarget(game, event) }
        return []
    }

    actionsWhenNoSource(game, event){
        let playerWorkshop = game.workshop(game.currentPlayer())
        let options = []
        playerWorkshop.map( color => {
            let columnInteraction = event.json()
            columnInteraction.data.source = color
            options.push({text:color, interaction:columnInteraction})
        }, this)
        
        return {
            message:[
                this.infoAction(),
                this.infoNoSource(),
                "Which color?"
            ],
            options:options
        }
    }

    actionsWhenNoTarget(game, event){
        let placedStoneEvent = game.currentStatus().stage().event()
        let columnNames = Object.keys(game.columns())
        let options = []
        columnNames
            .filter(val => val != placedStoneEvent.data.column)
            .map( name => {
                if(game.isAvailableSpaceInColumn(name)){
                    let columnInteraction = event.json()
                    columnInteraction.data.target = name
                    options.push({text:name, interaction:columnInteraction})
                }
            })
        
        return {
            message:[
                this.infoAction(),
                this.infoSource(),
                this.infoNoTarget(),
                "To which column?"
            ],
            options:options
        }
    }
}
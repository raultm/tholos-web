import Action from "./Action.js";
import EventBuilder from "../events/EventBuilder.js";


export default class Pi extends Action{

    isPlayable(game, event){
        let stoneWorkshopIndex = game.player(game.rival(event.data.player)).workshop.indexOf(event.data.source)
        if(stoneWorkshopIndex == -1){
            return false
        }
        if( game.player(event.data.player)["workshop"].length == 3){
            return false
        }
        return true
    }

    play(game, event){
        return game.workshop2workshop(game.rival(event.data.player), event.data.player, event.data.source)
    }

    reason(game, event){
        let stoneWorkshopIndex = game.player(game.rival(event.data.player)).workshop.indexOf(event.data.source)
        if(stoneWorkshopIndex == -1){
            return `${game.rival(event.data.player)} does not have a ${event.data.source} stone in workshop`
        }
        if( game.player(event.data.player)["workshop"].length == 3){
            return `${event.data.player} does not have a empty space`
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
        // Retrieve rival workshop & check at least one stone
        return game.usedSlotsInWorkshop(game.rival(event.data.player))
        
    }

    availableActions(game){
        let event = EventBuilder.fromInteraction(game.getInteraction())
        let eventJson = event.json()
        
        if(!eventJson.data.source){ return this.actionsWhenNoSource(game, event) }
        return []
    }

    actionsWhenNoSource(game, event){
        let rivalWorkshop = game.workshop(game.rival(game.currentPlayer()))
        let options = []
        rivalWorkshop.map( color => {
            let columnInteraction = event.json()
            columnInteraction.data.source = color
            options.push({text:color, interaction:columnInteraction})
        }, this)
        
        return {
            message:"Which color?",
            options:options
        }
    }
}
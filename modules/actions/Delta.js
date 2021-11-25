import Action from "./Action.js";
import EventBuilder from "../events/EventBuilder.js";

export default class Delta extends Action{

    isPlayable(game, event){
        return true
    }

    play(game, event){
        return game.quarry2workshop(event.data.player, event.data.source)
    }

    reason(game, event){
        return "Error"
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
        return !this.isQuarryEmpty(game)
        
    }

    // Sum the values of quarry
    isQuarryEmpty(game){
        return 0 === Object.entries(game.quarry()).reduce( (acc, val) => acc+=val[1], 0)
    }

    availableActions(game){
        let event = EventBuilder.fromInteraction(game.getInteraction())
        let eventJson = event.json()
        
        if(!eventJson.data.source){ return this.actionsWhenNoSource(game, event) }
        return []
    }

    actionsWhenNoSource(game, event){
        let quarryNames = Object.keys(game.quarry())
        let options = []
        quarryNames.map( color => {
            if(game.quarry()[color] > 0){
                let columnInteraction = event.json()
                columnInteraction.data.source = color
                options.push({text:color, interaction:columnInteraction})
            }
        }, this)
        
        return {
            message:"Which color?",
            options:options
        }
    }
}
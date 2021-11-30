import Stage from './Stage.js';
import State from './State.js';
import ActionBuilder from '../actions/ActionBuilder.js';
import EventBuilder from '../events/EventBuilder.js';
import EndGame from './EndGame.js'

export default class PlayerTurn extends State {
    
    #player
    
    constructor(color){
        super()
        super.setName(`${color} to play`)
        this.setPlayer(color)
        this.setStage(new Beginning(color))
    }

    setPlayer(player){
        this.#player = player
    }

    availableActions(game){
        return this.stage().availableActions(game)
    }

    evolve(game, event) {
        return this.stage().evolve(game, event, this)
    }

    action(action){
        this.stage().action(action)
    }

    on(game){
        game.setPlayer(this.#player)
    }
   
}


class Beginning extends Stage {

    #action = "select_action"

    constructor(player, actions){
        super()
        super.setName(`${player} must choose between pick or place stones`)
    }

    availableActions(game){
        if (Object.keys(game.getInteraction()).length === 0){ return this.defaultOptions(game) }
        return EventBuilder.fromInteraction(game.getInteraction()).availableActions(game) || this.defaultOptions(game)
    }

    defaultOptions(game){
        let pickStonesOption = {text:"Pick Stones from Quarry", interaction: new EventBuilder("picked_stones").player(game.currentPlayer()).build().json()}
        let placeStonOption = {text:"Place Stone in Column", interaction: new EventBuilder("placed_stone").player(game.currentPlayer()).build().json()}
        
        let options = []
        
        if(game.availableSlotsInWorkshop(game.currentPlayer()) > 0){  
            options.push(pickStonesOption)
        }
        if(game.usedSlotsInWorkshop(game.currentPlayer()) > 0){ 
            options.push(placeStonOption)
        }

        if(options.length == 1){
            let interaction = options.pop().interaction
            game.handlingInteraction(interaction)
            return game.availableActions()
        }

        return {
            message:"What do you want to do?",
            options:options
        }
    }

    evolve(game, event, parentStatus){
        switch(event.type){
            case "picked_stones":
                // Only one stone from rival color
                if(game.rival(event.data.player) == event.data.color && event.data.amount > 1){
                    throw Error(`${event.data.player} can't pick ${event.data.amount} ${event.data.color} stones`)
                }
                // Max 2 stones from neutral color
                if("g" == event.data.color && event.data.amount > 2){
                    throw Error(`${event.data.player} can't pick ${event.data.amount} ${event.data.color} stones`)
                }
                // Max 3 stones from same color
                if(event.data.player== event.data.color && event.data.amount > 3){
                    throw Error(`${event.data.player} can't pick ${event.data.amount} ${event.data.color} stones`)
                }
                // Only available space in workshop
                if(event.data.amount > (3 - game.player(event.data.player).workshop.length)){
                    throw new Error(`${event.data.player} has only ${3 - game.player(event.data.player).workshop.length} spot empty`)
                }
                // quarry2workshop n times (n = amount)
                Array.from(Array(event.data.amount)).forEach((x, i) => {
                    game.quarry2workshop(event.data.player, event.data.color)
                });
                
                return parentStatus.setStage(new ChooseAction(event))
            case "placed_stone":
                game.workshop2column(event.data.player, event.data.color, event.data.column)
                
                if(game.currentStatus().name() === "End of Game"){
                    return
                }
                return parentStatus.setStage(new ChooseAction(event))
            case "ended_game":
                return game.setStatus(new EndGame())
            default:
                throw new Error(`${event.type} event is not available in ${this.constructor.name} Stage`)
        }
    }
}

class ChooseAction extends Stage {

    #event
    #actions

    constructor(event){
        super(event)
        this.#event = event
        this.#actions = []
        let player = event.data.player
        super.setName(`${player} must choose between available actions`)
    }

    evolve(game, event, parentStatus){
        switch(event.type){
            case "triggered_action":
                let action = ActionBuilder.fromEvent(event)
                if(action.isPlayable(game, event)){
                    this.#actions.push(event.data.action)
                    return action.play(game, event)
                }else{
                    throw new Error(`Action "${action.constructor.name}" is not playable: ${action.reason(game, event)}`)
                }
            case "undo_turn":
                return game.rollback()
            case "ended_turn":
                return game.setStatus(new PlayerTurn(game.rival(event.data.player)))
            case "ended_game":
                return game.setStatus(new EndGame())
            default:
                throw new Error(`${event.type} event is not available in ${this.constructor.name} Stage`)
        }
    }

    availableActions(game){
        if (Object.keys(game.getInteraction()).length === 0){ return this.defaultOptions(game) }
        return EventBuilder.fromInteraction(game.getInteraction()).availableActions(game) || this.defaultOptions(game)
    }

    defaultOptions(game){
        let undoActions = {text:"Undo the Whole Turn", interaction: new EventBuilder("undo_turn").player(game.currentPlayer()).build().json()}
        let endedTurn = {text:"Confirm End Of Turn", interaction: new EventBuilder("ended_turn").player(game.currentPlayer()).build().json()}
        
        let options = []
        
        options.push(undoActions)
        options.push(endedTurn)
        
        if(this.#event.data.column){
            game.column(this.#event.data.column).actions.map(value => {
                let action = ActionBuilder.fromName(value)
                if(this.#actions.includes(value)) {return}
                if(action.isAvailable(game)){
                    options.unshift({
                        text:value,
                        description: action.getDescription(), 
                        interaction: EventBuilder.triggeredActionEvent(this.#event.data.player, value, "", "")
                    })
                }
            }, this)
        }
        
        //if(this.#event.type == "placed_stone" && this.#event.data.player == this.#event.data.color){
            
        //}

        //if(options.length == 1){
        //    let interaction = options.pop().interaction
            //game.handlingInteraction(interaction)
        //    return game.availableActions()
        //}

        return {
            message:"What do you want to do?",
            options:options
        }
    }
    
}
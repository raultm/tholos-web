import Event from "./Event.js"

export default class PickedStones extends Event {

    #player
    #color
    #amount

    constructor(player,color, amount){
        super()
        this.#player = player
        this.#color = color
        this.#amount = amount
    }

    json(){
        return {
            type : "picked_stones",
            data : {
                player : this.#player,
                color : this.#color,
                amount: this.#amount
            }
        }
    }

    isReady(){
        if(!this.#player){ return false }
        if(!this.#color){ return false }
        if(!this.#amount){ return false }
        return true
    }

    availableActions(game){
        if(!this.#player){ return this.actionsWhenNoPlayer() }
        if(!this.#color){ return this.actionsWhenNoColor(game) }
        if(!this.#amount){ return this.actionsWhenNoAmount(game) }
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

    actionsWhenNoColor(game){
        let blackInteraction = this.json()
        blackInteraction.data.color = "b"
        let whiteInteraction = this.json()
        whiteInteraction.data.color = "w"
        let grayInteraction = this.json()
        grayInteraction.data.color = "g"

        let options = []
        if(game.quarry().b !== 0){
            options.push({text:"Black", interaction:blackInteraction})
        }
        if(game.quarry().w !== 0){
            options.push({text:"White", interaction:whiteInteraction})
        }
        if(game.quarry().g !== 0){
            options.push({text:"Gray", interaction:grayInteraction})
        }
        
        return {
            message:"Which color?",
            options:options
        }
    }

    actionsWhenNoAmount(game){
        let oneStone = this.json()
        oneStone.data.amount = 1
        let twoStones = this.json()
        twoStones.data.amount = 2
        let threeStones = this.json()
        threeStones.data.amount = 3

        let slots = game.availableSlotsInWorkshop(this.#player)
        let quarryAmount = game.quarry()[this.#color]
        let maxAmounts = this.#player == this.#color ?  3:
                         this.#color == "g" ?           2:
                                                        1
        
        let optionsToPopulate = Math.min(slots, maxAmounts, quarryAmount)
        //console.log("optionsToPopulate", optionsToPopulate, slots, maxAmounts, game)
        if(optionsToPopulate == 1){
            game.handlingInteraction(oneStone)
            return game.availableActions()
        }

        let options = []
        switch(optionsToPopulate){
            case 3: options.unshift({text:"3", interaction:threeStones})
            case 2: options.unshift({text:"2", interaction:twoStones})
            default: options.unshift({text:"1", interaction:oneStone})
        }


        return {
            message:"How many stones?",
            options:options
        }
    }
}
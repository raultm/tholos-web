export default class Action {

    #event

    constructor(event){
        this.#event = event
    }

    event(){
        return this.#event
    }

    isPlayable() {
        return false
    }

    play(){

    }

    reason(){
        return "Base Action can not be played"
    }
    
    isAvailable(game){
        return false
    }

    // Has all the data to perform the action
    isReady(){
        return false
    }
}
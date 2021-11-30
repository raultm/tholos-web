export default class Action {

    #event

    constructor(event){
        this.#event = event
    }

    name(){
        switch(this.constructor.name){
            case "Alpha"   : return "α"
            case "Beta"    : return "β"
            case "Omega"   : return "Ω"
            case "Delta"   : return "δ"
            case "Pi"      : return "π"
            case "Epsilon" : return "Σ"
            case "Gamma"   : return "γ"
        }
        return "-"
    }

    infoAction(){
        return `${this.event().data.player} is playing ${this.name()} action`
    }

    infoNoSource(){
        return ``
    }

    event(){
        return this.#event
    }

    getDescription() {
        return ""
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
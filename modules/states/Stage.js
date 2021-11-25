export default class Stage{

    #name = "no stage"
    #event = {}; // Event which triggered this stage

    constructor(event){
        this.#event = event
    }

    event(){
        return this.#event
    }

    setName(name){
        this.#name = name
    }

    name(){
        return this.#name
    }

    evolve(event){
        throw new Error(`You must define an evolve method in your Class ${this.constructor.name}`)
    }
    
}
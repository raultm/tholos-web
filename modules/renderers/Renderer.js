export default class Renderer {

    renderGame(game) {
        throw new Error(`You must define renderGame in ${this.constructor.name}`)
    }

    renderActions(game) {
        throw new Error(`You must define renderActions in ${this.constructor.name}`)
    }
}
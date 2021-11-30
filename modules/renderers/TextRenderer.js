import Renderer from "./Renderer.js"

export default class TextRenderer extends Renderer {

    static render(game){
        return new TextRenderer().renderGame(game)
    }

    renderGame(game){
        let availableActions = game.availableActions()
        if(Array.isArray(availableActions)){
            console.dir(game)
            availableActions = {
                message: "Error - Not Available Options - Check console to view game Object",
                options :[]
            }
        }
        let message = (typeof availableActions.message == "string") ? availableActions.message : 
                      (availableActions.length != 0) ? availableActions.message.join("\n") : 
                      ""
        return           ""
        
        + "\n" 
        + "\n" + `Columns`
        + "\n" + "======="
        + "\n" + `Ω - ${game.column("Ω").stones}`
        + "\n" + `α - ${game.column("α").stones}`
        + "\n" + `β - ${game.column("β").stones}`
        + "\n" + `δ - ${game.column("δ").stones}`
        + "\n" + `π - ${game.column("π").stones}`
        + "\n" + `Σ - ${game.column("Σ").stones}`
        + "\n" + `γ - ${game.column("γ").stones}`
        + "\n" 
        + "\n" + "Quarry"
        + "\n" + "======"
        + "\n" + `w : ${game.quarry().w}`
        + "\n" + `b : ${game.quarry().b}`
        + "\n" + `g : ${game.quarry().g}`
        + "\n" 
        + "\n" + `Players`
        + "\n" + "======="
        + "\n" + `w workshop : ${game.player("w")["workshop"]}`
        + "\n" + `b workshop : ${game.player("b")["workshop"]}`
        + "\n" 
        + "\n" + "Status"
        + "\n" + "======="
        + "\n" + `${game.currentStatus().name()} - ${game.currentStatus().stage().name()}`
        + "\n" 
        + "\n" + `Available Actions`
        + "\n" + "======="
        + "\n" + message
        + "\n" + "<dl>" 
            + availableActions.options.map( element => {

                let button = `<dt><input type="button" style="min-width:200px" onclick="handleAction('${JSON.stringify(element.interaction).replace(/\"/g,"&quot;")}')" value="${element.text}" /></dt>`
                let description = element.description ? `<dd>${element.description}</dd>` : `<dd>&nbsp;</dd>`
                return button + description
            })
            .join("")
            + "</dl>"
        + "\n" 
        
        + "\n" 
        + "\n" + `Events History`
        + "\n" + "======="
        //https://stackoverflow.com/questions/30610523/reverse-array-in-javascript-without-mutating-original-array
        + "\n" + game.events().slice().reverse().map( element => JSON.stringify(element) ).join("\n")
    }
}
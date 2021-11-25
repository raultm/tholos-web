import MoveColumn2Column from "./MoveColumn2Column.js";

export default class Beta extends MoveColumn2Column{

    constructor(event){
        super(event)
        super.setStoneColor("w")
    }
}
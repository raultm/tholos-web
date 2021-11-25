import EventBuilder from "./events/EventBuilder.js"
import InitialState from "./states/InitialState.js"

export default class Game {
  // Private
  #observers = []
  #notifyObservers = true
  #interaction = {}
  #status = new InitialState()
  #player
  #events = []
  #columns = {
    "Ω" : {
      "stones" : [],
      "actions" : []
    },
    "α" : {
      "stones" : [],
      "actions" : []
    },
    "β" : {
      "stones" : [],
      "actions" : []
    },
    "δ" : {
      "stones" : [],
      "actions" : []
    },
    "π" : {
      "stones" : [],
      "actions" : []
    },
    "Σ" : {
      "stones" : [],
      "actions" : []
    },
    "γ" : {
      "stones" : [],
      "actions" : []
    }
  }

  #quarry = {
    "w": 13,
    "b": 13,
    "g": 10
  }

  #players = {
    "b" : {
      "score": 0,
      "workshop":["b", "b"]
    },
    "w" : {
      "score": 0,
      "workshop":["w", "w"]
    }
  }
  
  constructor(...events) {
    this.#events = events;
  }

  addObserver(observer){
    if(observer.hasOwnProperty('notify')){
      this.#observers.push(observer)
    }
  }

  getObservers(){
    return this.#observers
  }

  notifyObservers(){
    if(this.#notifyObservers){
      this.getObservers().map( observer => observer.notify(this), this)
    }
  }

  handlingInteraction(interaction){
    this.#interaction = interaction
    this.currentStatus().handlingInteraction(this, interaction)
    this.notifyObservers()
  }

  getInteraction(){
    return this.#interaction
  }

  setInteraction(interaction){
    this.#interaction = interaction
  }

  evolve(event){
    //console.log(`${this.currentStatus().constructor.name} - ${this.currentStatus().stage().constructor.name}`)
    this.#events.push(event)
    this.currentStatus().evolve(this, event)
    this.#interaction = {}
    this.notifyObservers()
    return this
  }

  // rollback actions until i find an ended_turn or created_game
  rollback(){
    let lastEvent = this.#events.pop()
    switch(lastEvent.type){
      case "created_game": 
      case "ended_turn": 
        this.#events.push(lastEvent)
        return this.loadEvents(...this.#events)
      default:
        return this.rollback()
    }
  }

  loadEvents(...events){
    if(!events){ return false }

    this.#notifyObservers = false
    this.#events = [];
    this.setStatus(new InitialState())
    events.map(event => this.evolve(event), this)
    this.#notifyObservers = true
    this.notifyObservers()
  }

  events(){
    return this.#events
  }

  setStatus(status) {
    this.#status = status
    status.on(this)
    this.notifyObservers()
    return this
  }

  setPlayer(player){
    this.#player = player
  }

  availableActions(){
    return this.currentStatus().availableActions(this)
  }

  currentStatus() {
    return this.#status
  }

  currentPlayer(){
    return this.#player
  }

  columns(){
    return this.#columns
  }
  
  column(column){
    return this.#columns[column]
  }

  columnTop(column){
    return this.#columns[column].stones[this.#columns[column].stones.length - 1 ]
  }

  isAvailableSpaceInColumn(column){
    return this.#columns[column].stones.length < 5
  }

  quarry(){
    return this.#quarry
  }

  player(color){
    return this.#players[color]
  }

  black(){
    return this.player("b")
  }

  white(){
    return this.player("w")
  }

  workshop(player){
    return this.player(player)["workshop"]
  }

  availableSlotsInWorkshop(player){
    return 3 - this.usedSlotsInWorkshop(player)
  }
  
  usedSlotsInWorkshop(player){
    return this.player(player)["workshop"].length
  }

  emptyWorkshop(player){
    this.setWorkshop(player, [])
  }

  setWorkshop(player, workshop){
    this.player(player)["workshop"] = workshop
  }

  setQuarry(color, stonesNumber){
    this.quarry()[color] = stonesNumber
  }

  setColumnStones(column, stones){
    this.column(column)["stones"] = stones
  }

  addColumnAction(column, action){
    this.column(column)["actions"].push(action)
  }

  emptyColumnActions(column){
    this.column(column)["actions"] = []
  }

  quarry2workshop(player, color){
    if(this.#quarry[color] >= 1){
      this.#quarry[color] = this.#quarry[color] - 1
      this.#players[player]["workshop"].push(color)
    }else{
      throw new Error(`${player} can't pick 1 ${color} stone because quarry is empty`)
    }
  }
  
  workshop2column(player, color, column){
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array
    let stoneWorkshopIndex = this.#players[player].workshop.indexOf(color)
    if(stoneWorkshopIndex >= 0){
      this.#players[player].workshop.splice(stoneWorkshopIndex, 1)
      this.push2Column(column, color)
    }else{
      throw Error(`${player} does not have a ${color} stone in workshop`)
    }
    
  }

  workshop2quarry(player, column){
    if(this.column(column).stones.length > 0){
      let color = this.column(column).stones.pop()
      this.#quarry[color] = this.#quarry[color] + 1
    }else{
      throw Error(`${player} does not have a ${color} stone in workshop`)
    }
    
  }

  workshop2workshop(sourcePlayer, targetPlayer, color){
    let stoneWorkshopIndex = this.#players[sourcePlayer].workshop.indexOf(color)
    if(stoneWorkshopIndex == -1){
      throw Error(`${sourcePlayer} does not have a ${color} stone in workshop`)
    }
    if( this.#players[targetPlayer]["workshop"].length == 3){
      throw Error(`${targetPlayer} does not have a empty space`)
    }

    this.#players[sourcePlayer].workshop.splice(stoneWorkshopIndex, 1)
    this.#players[targetPlayer]["workshop"].push(color)
  }

  column2column(source, target){
    return this.push2Column(target, this.#columns[source].stones.pop())
  }

  push2Column(column, stone){
    this.#columns[column].stones.push(stone)
    if(    this.isColumnFull("Ω")
        && this.isColumnFull("α")
        && this.isColumnFull("β")
        && this.isColumnFull("δ")
        && this.isColumnFull("π")
        && this.isColumnFull("Σ")
        && this.isColumnFull("γ")
    ){
      // Move to EndGame Status
      this.evolve(EventBuilder.endedGameEvent())
    }
    return this
  }

  isColumnFull(column){
    return this.#columns[column].stones.length === 5
  }

  isColumnEmpty(column){
    return this.#columns[column].stones.length === 0
  }

  getScore(){
    let columns = this.columns()
    let info = Object.entries(columns).map( (value) => { 
      let scoreByColumn = 0
      let winner = ""
      let countBy = value[1].stones.reduce((acc, current) => { acc[current]=acc[current]+1; return acc }, {w:0,b:0,g:0} )
      if(countBy.w > countBy.b){
        winner = "w"
        scoreByColumn = countBy.w * 1 + countBy.b * 3 + countBy.g * -2 
      }else if(countBy.b > countBy.w){
        winner = "b"
        scoreByColumn = countBy.b * 1 + countBy.w * 3 + countBy.g * -2 
      }else{
        scoreByColumn = 0
      }
      let score = {
          winner: winner,
          score: scoreByColumn
        }
      
      return {
        column: value[0], 
        countBy: countBy,
        winner: score.winner,
        points: score.score
      }
    })
    info.result = info
      .filter((val) => val.winner != "")
      .reduce((acc, val) => { acc[val.winner] = acc[val.winner] + val.points; return acc}, {w:0,b:0})
    
    return info
  }

  rival(color){
    switch(color){
      case "w": return "b"
      case "b": return "w"
    }
  }
}

import Game from '../../modules/Game.js';
import EventBuilder from '../../modules/events/EventBuilder.js';

describe("Move Stones", function() {
  
  var game;
  
  beforeEach(function() {
    game = new Game();
  });

  describe("player uses Ω (Omega) from 2nd column to a 3rd column", function(){
    
    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setColumnStones("Ω", ["b", "w", "g"])
      game.setColumnStones("α", ["w", "g", "b"])
      game.setColumnStones("β", ["b", "g", "w"])
      game.setColumnStones("δ", ["b", "w", "g"])
      game.setColumnStones("π", ["b", "w", "b"])
    });

    it("should move if 2nd column has a b stone to a 3rd column not fulled", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"));
      
      game = game.evolve(EventBuilder.triggeredActionEvent("b","Ω","α", "β"));
      expect(game.columnTop("β")).toBe("b")
      expect(game.column("α").stones.length).toBe(2)
      expect(game.column("β").stones.length).toBe(4)
    });

    it("should NOT move if source column does not have a black stone on top", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"));
      expect( () => game = game.evolve(EventBuilder.triggeredActionEvent("b","Ω","β", "α")) ).toThrow(new Error(`Action "Omega" is not playable: β does not have a b stone on top to move`));
    });

    it("should NOT move if target column has no available space", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"));
      game.setColumnStones("β", ["b", "g", "w", "w", "w"])
      expect( () => game = game.evolve(EventBuilder.triggeredActionEvent("b","Ω","α", "β")) ).toThrow(new Error(`Action "Omega" is not playable: β does not have room for move stone over it`));
    });

    
  })

  describe("player uses α (Alfa) from 2nd column to a 3rd column", function(){
    
    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setColumnStones("Ω", ["b", "w", "g"])
      game.setColumnStones("α", ["w", "g", "b"])
      game.setColumnStones("β", ["b", "g", "w"])
      game.setColumnStones("δ", ["b", "w", "g"])
      game.setColumnStones("π", ["b", "w", "b"])
    });

    it("should move if 4thnd column has a g stone to a 3rd column not fulled", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","α"));
      
      game = game.evolve(EventBuilder.triggeredActionEvent("b","α","δ", "β"));
      expect(game.columnTop("β")).toBe("g")
      expect(game.column("δ").stones.length).toBe(2)
      expect(game.column("β").stones.length).toBe(4)
    });

    it("should NOT move if source column does not have a black stone on top", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","α"));
      expect( () => game = game.evolve(EventBuilder.triggeredActionEvent("b","α","β","δ")) ).toThrow(new Error(`Action "Alpha" is not playable: β does not have a g stone on top to move`));
    });

    it("should NOT move if target column has no available space", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","α"));
      game.setColumnStones("β", ["b", "g", "w", "w", "w"])
      expect( () => game = game.evolve(EventBuilder.triggeredActionEvent("b","α","δ", "β")) ).toThrow(new Error(`Action "Alpha" is not playable: β does not have room for move stone over it`));
    });

    
  })

  describe("player uses α (Alfa) from 2nd column to a 3rd column", function(){
    
    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setColumnStones("Ω", ["b", "w", "g"])
      game.setColumnStones("α", ["w", "g", "b"])
      game.setColumnStones("β", ["b", "g", "w"])
      game.setColumnStones("δ", ["b", "w", "g"])
      game.setColumnStones("π", ["b", "w", "b"])
      game.setColumnStones("Σ", ["b", "w", "w"])
      
    });

    it("should move if 6th column has a w stone to a 2nd column not fulled", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","β"));
      
      game = game.evolve(EventBuilder.triggeredActionEvent("b","β","Σ", "α"));
      expect(game.columnTop("α")).toBe("w")
      expect(game.column("Σ").stones.length).toBe(2)
      expect(game.column("α").stones.length).toBe(4)
    });

    it("should NOT move if source column does not have a black stone on top", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","β"));
      expect( () => game = game.evolve(EventBuilder.triggeredActionEvent("b","β","α","δ")) ).toThrow(new Error(`Action "Beta" is not playable: α does not have a w stone on top to move`));
    });

    it("should NOT move if target column has no available space", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","β"));
      game.setColumnStones("δ", ["b", "g", "w", "w", "w"])
      expect( () => game = game.evolve(EventBuilder.triggeredActionEvent("b","β","Σ", "δ")) ).toThrow(new Error(`Action "Beta" is not playable: δ does not have room for move stone over it`));
    });

    
  })

  describe("player uses δ (Delta) from quarry to workshop", function(){
    
    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setColumnStones("Ω", ["b", "w", "g"])
      game.setColumnStones("α", ["w", "g", "b"])
      game.setColumnStones("β", ["b", "g", "w"])
      game.setColumnStones("δ", ["b", "w", "g"])
      game.setColumnStones("π", ["b", "w", "b"])
      game.setColumnStones("Σ", ["b", "w", "w"])
      
    });

    it("should add b stone for black's workshop", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","δ"));
      
      game = game.evolve(EventBuilder.triggeredActionEvent("b","δ","b"));
      expect(game.player("b").workshop).toEqual(["b", "b"])
    });

    it("should add b stone for white's workshop", function() {
      game = game.evolve(EventBuilder.pickedStonesEvent("b", "w", 1))
      game = game.evolve(EventBuilder.endedTurnEvent("b"));
      game = game.evolve(EventBuilder.placedStoneEvent("w","w","δ"));
      
      game = game.evolve(EventBuilder.triggeredActionEvent("w","δ","b"));
      expect(game.player("w").workshop).toEqual(["w", "b"])
    });
  })

  describe("player uses π (Pi) from rival workshop to own workshop", function(){
    
    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setColumnStones("Ω", ["b", "w", "g"])
      game.setColumnStones("α", ["w", "g", "b"])
      game.setColumnStones("β", ["b", "g", "w"])
      game.setColumnStones("δ", ["b", "w", "g"])
      game.setColumnStones("π", ["b", "w", "b"])
      game.setColumnStones("Σ", ["b", "w", "w"])
    });

    it("should add w stone for black's workshop", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","π"));
      
      game = game.evolve(EventBuilder.triggeredActionEvent("b","π","w"));
      expect(game.player("b").workshop).toEqual(["b", "w"])
    });

    it("should throws error if rival does not have the color in its workshop", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","π"));
      
      expect( () => game = game.evolve(EventBuilder.triggeredActionEvent("b","π","b")) ).toThrow(new Error(`Action "Pi" is not playable: w does not have a b stone in workshop`));
    });

    it("should throws error if player has no space in its workshop", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","π"));
      game.setWorkshop("w", ["b", "w", "g"])
      game.setWorkshop("b", ["b", "w", "g"])

      expect( () => game = game.evolve(EventBuilder.triggeredActionEvent("b","π","b")) ).toThrow(new Error(`Action "Pi" is not playable: b does not have a empty space`));
    });
  })

  describe("player uses Σ (Epsilon) from workshop to column", function(){
    
    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setColumnStones("Ω", ["b", "w", "g"])
      game.setColumnStones("α", ["w", "g", "b"])
      game.setColumnStones("β", ["b", "g", "w"])
      game.setColumnStones("δ", ["b", "w", "g"])
      game.setColumnStones("π", ["b", "w", "b"])
      game.setColumnStones("Σ", ["b", "w", "w"])
    });

    it("should can move stone for own workshop to column", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","Σ"));
      
      game = game.evolve(EventBuilder.triggeredActionEvent("b","Σ","b", "π"));
      expect(game.columnTop("π")).toBe("b")
      expect(game.player("b").workshop.length).toBe(0)
    });

    it("should throws error if column without available space", function() {
      game.setColumnStones("π", ["b", "w", "b", "g", "g"])
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","Σ"));
      
      expect( () => game = game.evolve(EventBuilder.triggeredActionEvent("b","Σ","b", "π")) ).toThrow(new Error(`Action "Epsilon" is not playable: π does not have a empty space`));
    });

    it("should throws error if column without available space", function() {
      game.setWorkshop("b", ["b"])
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","Σ"));
      
      expect( () => game = game.evolve(EventBuilder.triggeredActionEvent("b","Σ","b", "π")) ).toThrow(new Error(`Action "Epsilon" is not playable: b does not have a b stone in workshop`));
    });

  })

  describe("player uses γ (Gamma) from column to quarry", function(){
    
    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setColumnStones("Ω", ["b", "w", "g"])
      game.setColumnStones("α", ["w", "g", "b"])
      game.setColumnStones("β", ["b", "g", "w"])
      game.setColumnStones("δ", ["b", "w", "g"])
      game.setColumnStones("π", ["b", "w", "b"])
      game.setColumnStones("Σ", ["b", "w", "w"])
      game.setColumnStones("γ", ["b", "w", "w"])
    });

    it("should can move stone for own workshop to column", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","γ"));
      
      game = game.evolve(EventBuilder.triggeredActionEvent("b","γ", "π"));
      expect(game.column("π").stones.length).toBe(2)
      expect(game.quarry().b).toBe(14)
    });

    it("should throws error if column has no stones", function() {
      game.setColumnStones("π", [])
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","γ"));
      
      expect( () => game = game.evolve(EventBuilder.triggeredActionEvent("b","γ", "π")) ).toThrow(new Error(`Action "Gamma" is not playable: π does not have any stone over it`));
    });

  })
  
});

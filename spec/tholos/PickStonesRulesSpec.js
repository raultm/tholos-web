import Game from '../../modules/Game.js';
import EventBuilder from '../../modules/events/EventBuilder.js';

describe("Pick Stones", function() {
  
  var game;
  
  beforeEach(function() {
    game = new Game();
  });

  describe("black in its turn if empty workshop", function() {

    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.emptyWorkshop("b")
      //console.log(game.player("b"))
    });
    
    it("should move to rival turn if succesful event", function() {
      game = game.evolve(EventBuilder.pickedStonesEvent("b","w",1));
      game = game.evolve(EventBuilder.endedTurnEvent("b"));
      expect(game.currentStatus().name()).toBe('w to play');
    });

    describe("try to pick up rival stones", function(){
      it("should can pick one", function() {
        game = game.evolve(EventBuilder.pickedStonesEvent("b","w",1));
        expect(game.black().workshop).toEqual(["w"]);
        expect(game.quarry().w).toBe(12)
      });
  
      it("should NOT can pick two", function() {
        expect( () => game.evolve(EventBuilder.pickedStonesEvent("b","w",2)) ).toThrow(new Error("b can't pick 2 w stones"));
      });

      it("should can pick one if one left in quarry", function() {
        game.setQuarry("w", 1)
        game = game.evolve(EventBuilder.pickedStonesEvent("b","w",1));
        
        expect(game.black().workshop).toEqual(["w"]);
        expect(game.quarry().w).toBe(0)
      });

      it("should can not pick one if none left in quarry", function() {
        game.setQuarry("w", 0)
        expect( () => game.evolve(EventBuilder.pickedStonesEvent("b","w",1)) ).toThrow(new Error("b can't pick 1 w stone because quarry is empty"));
      });
    })
    
    describe("try to pick up neutral stones", function(){
      it("should can pick one", function() {
        game = game.evolve(EventBuilder.pickedStonesEvent("b","g",1));
        expect(game.black().workshop).toEqual(["g"]);
        expect(game.quarry().g).toBe(9)
      });
  
      it("should can pick two", function() {
        game = game.evolve(EventBuilder.pickedStonesEvent("b","g",2));
        expect(game.black().workshop).toEqual(["g", "g"]);
        expect(game.quarry().g).toBe(8)
      });
  
      it("should NOT can pick three stones", function() {
        expect( () => game.evolve(EventBuilder.pickedStonesEvent("b","g",3)) ).toThrow(new Error("b can't pick 3 g stones"));
      });

      it("should can pick one if one left in quarry", function() {
        game.setQuarry("g", 1)
        game = game.evolve(EventBuilder.pickedStonesEvent("b","g",1));
        
        expect(game.black().workshop).toEqual(["g"]);
        expect(game.quarry().g).toBe(0)
      });

      it("should can not pick one if none left in quarry", function() {
        game.setQuarry("g", 0)
        expect( () => game.evolve(EventBuilder.pickedStonesEvent("b","g",1)) ).toThrow(new Error("b can't pick 1 g stone because quarry is empty"));
      });
    })

    describe("try to pick up own stones", function(){
      it("should can pick one stone", function() {
        game = game.evolve(EventBuilder.pickedStonesEvent("b","b",1));
        expect(game.black().workshop).toEqual(["b"]);
        expect(game.quarry().b).toBe(12)
      });
  
      it("should can pick two stones", function() {
        game = game.evolve(EventBuilder.pickedStonesEvent("b","b",2));
        expect(game.black().workshop).toEqual(["b", "b"]);
        expect(game.quarry().b).toBe(11)
      });
  
      it("should can pick three stones", function() {
        game = game.evolve(EventBuilder.pickedStonesEvent("b","b",3));
        expect(game.black().workshop).toEqual(["b", "b", "b"]);
        expect(game.quarry().b).toBe(10)
      });
  
      it("should NOT can pick four stones", function() {
        expect( () => game.evolve(EventBuilder.pickedStonesEvent("b","b",4)) ).toThrow(new Error("b can't pick 4 b stones"));
      });

      it("should can pick one if one left in quarry", function() {
        game.setQuarry("b", 1)
        game = game.evolve(EventBuilder.pickedStonesEvent("b","b",1));
        
        expect(game.black().workshop).toEqual(["b"]);
        expect(game.quarry().b).toBe(0)
      });

      it("should can not pick one if none left in quarry", function() {
        game.setQuarry("b", 0)
        expect( () => game.evolve(EventBuilder.pickedStonesEvent("b","b",1)) ).toThrow(new Error("b can't pick 1 b stone because quarry is empty"));
      });
    })
        
  })

  describe("black in its turn after setup", function() {

    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
    });
    
    it("should move to rival turn if succesful event", function() {
      game = game.evolve(EventBuilder.pickedStonesEvent("b","w",1));
      game = game.evolve(EventBuilder.endedTurnEvent("b"));
      expect(game.currentStatus().name()).toBe('w to play');
    });

    it("should can pick one stone from rival color", function() {
      game = game.evolve(EventBuilder.pickedStonesEvent("b","w",1));
      expect(game.black().workshop.length).toBe(3);
    });

    it("should NOT can pick two stones from rival color", function() {
      expect( () => game.evolve(EventBuilder.pickedStonesEvent("b","w",2)) ).toThrow(new Error("b can't pick 2 w stones"));
    });

    it("should NOT can pick more than empty spaces in the workshop", function() {
      expect( () => game.evolve(EventBuilder.pickedStonesEvent("b","b",2)) ).toThrow(new Error("b has only 1 spot empty"));
    });

    
  })

  describe("alternate players", function() {

    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
    });
    
    it("should move to rival turn if succesful event", function() {
      game = game.evolve(EventBuilder.pickedStonesEvent("b","w",1));
      game = game.evolve(EventBuilder.endedTurnEvent("b"));
      expect(game.currentStatus().name()).toBe('w to play');
      expect(game.currentPlayer()).toBe('w');

      game = game.evolve(EventBuilder.pickedStonesEvent("w","b",1));
      game = game.evolve(EventBuilder.endedTurnEvent("w"));
      expect(game.currentStatus().name()).toBe('b to play');
      expect(game.currentPlayer()).toBe('b');
    });

    
    
  })
  

});

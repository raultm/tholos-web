import EventBuilder from '../../../modules/events/EventBuilder.js';

import Game from '../../../modules/Game.js';

describe("Epsilon", function() {
  
  var game;
  var eventBuilder;
  
  beforeEach(function() {
    game = new Game();
    game = game.evolve(EventBuilder.createdBasicGameEventJson());
  });
  
  describe("check availableActions on ChooseAction stage", function(){
    
    it("should return Σ action if ChooseAction invoked with placed_stone and player/stone same color & player has stones in its workshop", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","Σ"))
      let availableActions = game.availableActions(game)
      
      expect(availableActions.options.length).toBe(3)
      expect(availableActions.options[0].text).toBe("Σ")
    });
       
    it("should NOT return Σ action if ChooseAction invoked with placed_stone and player/stone DIFFERENT color", function() {
      game.setWorkshop("b", ["g", "w"])
      game.evolve(EventBuilder.placedStoneEvent("b","w","Σ"))
      game.evolve(EventBuilder.endedTurnEvent("b"))
      game.setWorkshop("w", ["b", "w"])
      game.evolve(EventBuilder.placedStoneEvent("w","b","Σ"))
      
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });
    
    
    it("should NOT return Σ action if ChooseAction invoked with placed_stone and player/stone same color & player workshop is empty", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","Σ"))
      game.setWorkshop("b", [])
      let availableActions = game.availableActions(game)
      
      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });
    
  });
  
  describe("check if ready", function(){
    
    
    beforeEach(function() {
      eventBuilder = new EventBuilder("triggered_action")
    });
    
    it("should says is ready if player, action, source and target are set", function() {
      let event = eventBuilder.player("b").action("Σ").source("b").target("π").build()
      expect(event.isReady()).toBe(true);
    });
    
    it("should says is not ready if no source is set", function() {
      let event = eventBuilder.player("b").action("Σ").build()
      expect(event.isReady()).toBe(false);
    });

    it("should says is not ready if no target is set", function() {
      let event = eventBuilder.player("b").action("Σ").source("b").build()
      expect(event.isReady()).toBe(false);
    });
    
  })

  describe("check availableActions if interaction is not complete", function(){
    
    beforeEach(function() {
      eventBuilder = new EventBuilder("triggered_action")
      game.evolve(EventBuilder.placedStoneEvent("b","b","π"))
    });
    
    describe("which color", function(){
      
      it("should return available colors in player workshop to move", function() {
        let event = eventBuilder.player("b").action("Σ").build()
        game.setInteraction(event.json())
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("Which color?")
        expect(availableActions.options.length).toBe(1);
        expect(availableActions.options[0].text).toBe("b");
      });

      it("should return available colors in avoiding bug when empty quarry", function() {
        let event = eventBuilder.player("b").action("Σ").build()
        game.setInteraction(event.json())
        game.setQuarry("b", 0)
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("Which color?")
        expect(availableActions.options.length).toBe(1);
        expect(availableActions.options[0].text).toBe("b");
      });
    
    })

    describe("to which column", function(){
      it("should return available columns ", function() {
        let event = eventBuilder.player("b").action("Σ").source("b").build()
        game.setInteraction(event.json())
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("To which column?")
        expect(availableActions.options.length).toBe(6);
        expect(availableActions.options[0].text).toBe("Ω");
        expect(availableActions.options[1].text).toBe("α");
        expect(availableActions.options[2].text).toBe("β");
        expect(availableActions.options[3].text).toBe("δ");
        expect(availableActions.options[4].text).toBe("Σ");
        expect(availableActions.options[5].text).toBe("γ");
      });

      it("should return available columns - setting some columns full", function() {
        let event = eventBuilder.player("b").action("Σ").source("b").build()
        game.setInteraction(event.json())
        game.setColumnStones("β", ["g","b","w","g","g"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("To which column?")
        expect(availableActions.options.length).toBe(5);
        expect(availableActions.options[0].text).toBe("Ω");
        expect(availableActions.options[1].text).toBe("α");
        expect(availableActions.options[2].text).toBe("δ");
        expect(availableActions.options[3].text).toBe("Σ");
        expect(availableActions.options[4].text).toBe("γ");
      });
      
      
    })
    
  })
  
});
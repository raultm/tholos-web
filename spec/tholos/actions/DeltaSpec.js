import EventBuilder from '../../../modules/events/EventBuilder.js';

import Game from '../../../modules/Game.js';

describe("Delta", function() {
  
  var game;
  var eventBuilder;
  
  beforeEach(function() {
    game = new Game();
    game = game.evolve(EventBuilder.createdBasicGameEventJson());
  });
  
  describe("check availableActions on ChooseAction stage", function(){

    it("should return δ action if ChooseAction invoked with placed_stone and player/stone same color & quarry not empty", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","δ"))
      let availableActions = game.availableActions(game)
      
      expect(availableActions.options.length).toBe(3)
      expect(availableActions.options[0].text).toBe("δ")
    });
    
    it("should return δ action if ChooseAction invoked with placed_stone and player/stone same color & quarry not empty", function() {
      game.setWorkshop("b", ["g", "w"])
      game.evolve(EventBuilder.placedStoneEvent("b","w","Ω"))
      game.evolve(EventBuilder.endedTurnEvent("b"))
      game.evolve(EventBuilder.placedStoneEvent("w","w","δ"))
      
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(3)
      expect(availableActions.options[0].text).toBe("δ")
    });
    
    it("should NOT return δ action if ChooseAction invoked with placed_stone and player/stone DIFFERENT color & quarry empty", function() {
      game.setWorkshop("b", ["g", "w"])
      game.evolve(EventBuilder.placedStoneEvent("b","w","Ω"))
      game.evolve(EventBuilder.endedTurnEvent("b"))
      game.setQuarry("w", 0)
      game.setQuarry("b", 0)
      game.setQuarry("g", 0)
      game.setWorkshop("w", ["b", "w"])
      game.evolve(EventBuilder.placedStoneEvent("w","b","δ"))
      
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });
    
    it("should NOT return δ action if ChooseAction invoked with placed_stone and player/stone same color quarry is empty", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","δ"))
      game.setQuarry("w", 0)
      game.setQuarry("b", 0)
      game.setQuarry("g", 0)
      let availableActions = game.availableActions(game)
      
      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });
    
  });
  
  describe("check if ready", function(){
    
    
    beforeEach(function() {
      eventBuilder = new EventBuilder("triggered_action")
    });
    
    it("should says is ready if player, action, source are set", function() {
      let event = eventBuilder.player("b").action("δ").source("b").build()
      expect(event.isReady()).toBe(true);
    });
    
    it("should says is not ready if no source is set", function() {
      let event = eventBuilder.player("b").action("δ").build()
      expect(event.isReady()).toBe(false);
    });
   
  })

  describe("check availableActions if interaction is not complete", function(){
    
    beforeEach(function() {
      eventBuilder = new EventBuilder("triggered_action")
      game.evolve(EventBuilder.placedStoneEvent("b","b","δ"))
    });

    describe("from which columns", function(){
      
      it("should return available colors in quarry with white stones to move", function() {
        let event = eventBuilder.player("b").action("δ").build()
        game.setInteraction(event.json())
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("Which color?")
        expect(availableActions.options.length).toBe(3);
        expect(availableActions.options[0].text).toBe("w");
        expect(availableActions.options[1].text).toBe("b");
        expect(availableActions.options[2].text).toBe("g");
      });
      
      
      it("should NOT return empty quarry colors", function() {
        let event = eventBuilder.player("b").action("δ").build()
        game.setInteraction(event.json())
        game.setQuarry("b", 0)
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("Which color?")
        expect(availableActions.options.length).toBe(2);
        expect(availableActions.options[0].text).toBe("w");
        expect(availableActions.options[1].text).toBe("g");
      });
      
    })
    
  })
  
});
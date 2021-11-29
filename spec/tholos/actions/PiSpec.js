import EventBuilder from '../../../modules/events/EventBuilder.js';

import Game from '../../../modules/Game.js';

describe("Pi", function() {
  
  var game;
  var eventBuilder;
  
  beforeEach(function() {
    game = new Game();
    game = game.evolve(EventBuilder.createdBasicGameEventJson());
  });
  
  describe("check availableActions on ChooseAction stage", function(){

    it("should return π action if ChooseAction invoked with placed_stone and player/stone same color & rival has stones in its workshop", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","π"))
      let availableActions = game.availableActions(game)
      
      expect(availableActions.options.length).toBe(3)
      expect(availableActions.options[0].text).toBe("π")
    });
    
    
    it("should NOT return π action if ChooseAction invoked with placed_stone and player/stone DIFFERENT color", function() {
      game.setWorkshop("b", ["g", "w"])
      game.evolve(EventBuilder.placedStoneEvent("b","w","δ"))
      game.evolve(EventBuilder.endedTurnEvent("b"))
      game.setWorkshop("w", ["b", "w"])
      game.evolve(EventBuilder.placedStoneEvent("w","b","π"))
      
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });
    
    
    it("should NOT return π action if ChooseAction invoked with placed_stone and player/stone same color & rival workshop is empty", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","π"))
      game.setWorkshop("w", [])
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
      let event = eventBuilder.player("b").action("π").source("b").build()
      expect(event.isReady()).toBe(true);
    });
    
    it("should says is not ready if no source is set", function() {
      let event = eventBuilder.player("b").action("π").build()
      expect(event.isReady()).toBe(false);
    });
    
  })

  describe("check availableActions if interaction is not complete", function(){
    
    beforeEach(function() {
      eventBuilder = new EventBuilder("triggered_action")
      game.evolve(EventBuilder.placedStoneEvent("b","b","π"))
    });

    describe("from which columns", function(){
      
      it("should return available colors in rival workshop to steal", function() {
        let event = eventBuilder.player("b").action("π").build()
        game.setInteraction(event.json())
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("Which color?")
        expect(availableActions.options.length).toBe(2);
        expect(availableActions.options[0].text).toBe("w");
        expect(availableActions.options[1].text).toBe("w");
      });
      
      
      it("should NOT return color that are not available in rival workshop", function() {
        let event = eventBuilder.player("b").action("π").build()
        game.setInteraction(event.json())
        game.setWorkshop("w", ["b", "g"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("Which color?")
        expect(availableActions.options.length).toBe(2);
        expect(availableActions.options[0].text).toBe("b");
        expect(availableActions.options[1].text).toBe("g");
      });

      it("should return available colors in rival workshop to steal avoiding bug when empty quarry", function() {
        let event = eventBuilder.player("b").action("π").build()
        game.setInteraction(event.json())
        game.setQuarry("w", 0)
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("Which color?")
        expect(availableActions.options.length).toBe(2);
        expect(availableActions.options[0].text).toBe("w");
        expect(availableActions.options[1].text).toBe("w");
      });
      
    })
    
  })
  
});
import EventBuilder from '../../../modules/events/EventBuilder.js';
import ActionBuilder from '../../../modules/actions/ActionBuilder.js';

import Game from '../../../modules/Game.js';

describe("Gamma", function() {
  
  var game;
  var eventBuilder;
  
  beforeEach(function() {
    game = new Game();
    game = game.evolve(EventBuilder.createdBasicGameEventJson());
  });
  
  describe("check description", function(){
    it("should return γ description", function() {
      let action = ActionBuilder.fromName("γ")
      expect(action.getDescription()).toBe("May return the top stone (of any color) of the column at a different temple location back to the quarry.")
    });
  })

  describe("check availableActions on ChooseAction stage", function(){
    
    it("should return γ action if ChooseAction invoked with placed_stone and player/stone same color & at least another column is not empty", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","γ"))
      game.setColumnStones("β", ["w"])
      let availableActions = game.availableActions(game)
      
      expect(availableActions.options.length).toBe(3)
      expect(availableActions.options[0].text).toBe("γ")
    });
        
    it("should NOT return γ action if ChooseAction invoked with placed_stone and player/stone DIFFERENT color", function() {
      game.setWorkshop("b", ["g", "w"])
      game.evolve(EventBuilder.placedStoneEvent("b","w","δ"))
      game.evolve(EventBuilder.endedTurnEvent("b"))
      game.setWorkshop("w", ["b", "w"])
      game.evolve(EventBuilder.placedStoneEvent("w","b","γ"))
      
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });
    
    it("should NOT return γ action if ChooseAction invoked with placed_stone and player/stone same color & all rest of columns are empty", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","γ"))
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
      let event = eventBuilder.player("b").action("γ").source("b").build()
      expect(event.isReady()).toBe(true);
    });
    
    it("should says is not ready if no source is set", function() {
      let event = eventBuilder.player("b").action("γ").build()
      expect(event.isReady()).toBe(false);
    });
    
  })

  describe("check availableActions if interaction is not complete", function(){
    
    beforeEach(function() {
      eventBuilder = new EventBuilder("triggered_action")
      game.evolve(EventBuilder.placedStoneEvent("b","b","γ"))
    });

    describe("from which columns", function(){
      
      it("should return only available columns with at least one stone", function() {
        let event = eventBuilder.player("b").action("γ").build()
        game.setInteraction(event.json())
        game.setColumnStones("β", ["w"])
        game.setColumnStones("δ", ["w"])
        game.setColumnStones("π", ["w"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message[0]).toBe("b is playing γ action")
        expect(availableActions.message[1]).toBe("b needs to select between columns to return top stone to quarry")
        expect(availableActions.message[2]).toBe("From which column?")
        expect(availableActions.options.length).toBe(3);
        expect(availableActions.options[0].text).toBe("β");
        expect(availableActions.options[1].text).toBe("δ");
        expect(availableActions.options[2].text).toBe("π");
      });
      
    })
    
  })
  
});
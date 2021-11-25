import EventBuilder from '../../../modules/events/EventBuilder.js';

import Game from '../../../modules/Game.js';

describe("Beta", function() {
  
  var game;
  var eventBuilder;
  
  beforeEach(function() {
    game = new Game();
    game = game.evolve(EventBuilder.createdBasicGameEventJson());
  });
  
  describe("check availableActions on ChooseAction stage", function(){

    it("should return β action if ChooseAction invoked with placed_stone and player/stone same color & different column with white stone in top", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","β"))
      game.setColumnStones("Ω", ["w"])
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(3)
      expect(availableActions.options[0].text).toBe("β")
    });
    
    it("should return β action if ChooseAction invoked with placed_stone and player/stone same color & different column with white stone in top", function() {
      game.setWorkshop("b", ["g", "w"])
      game.evolve(EventBuilder.placedStoneEvent("b","w","Ω"))
      game.evolve(EventBuilder.endedTurnEvent("b"))
      game.evolve(EventBuilder.placedStoneEvent("w","w","β"))
      
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(3)
      expect(availableActions.options[0].text).toBe("β")
    });
    
    it("should NOT return β action if ChooseAction invoked with placed_stone and player/stone DIFFERENT color & even with column with white stone in top", function() {
      game.setWorkshop("b", ["g", "w"])
      game.evolve(EventBuilder.placedStoneEvent("b","w","Ω"))
      game.evolve(EventBuilder.endedTurnEvent("b"))
      game.setWorkshop("w", ["b", "w"])
      game.evolve(EventBuilder.placedStoneEvent("w","b","β"))
      
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });
    
    it("should NOT return β action if ChooseAction invoked with placed_stone and player/stone same color but no column has white stone on top", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","β"))
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
      let event = eventBuilder.player("b").action("β").source("Ω").target("π").build()
      expect(event.isReady()).toBe(true);
    });
    
    it("should says is not ready if no source is set", function() {
      let event = eventBuilder.player("b").action("β").build()
      expect(event.isReady()).toBe(false);
    });

    it("should says is not ready if no target is set", function() {
      let event = eventBuilder.player("b").action("β").source("Ω").build()
      expect(event.isReady()).toBe(false);
    });
    
  })

  describe("check availableActions if interaction is not complete", function(){
    
    beforeEach(function() {
      eventBuilder = new EventBuilder("triggered_action")
      game.evolve(EventBuilder.placedStoneEvent("b","b","β"))
    });

    describe("from which columns", function(){
      
      it("should return column with white stones to move", function() {
        let event = eventBuilder.player("b").action("β").build()
        game.setInteraction(event.json())
        game.setColumnStones("Ω", ["w"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("From which column?")
        expect(availableActions.options[0].text).toBe("Ω");
      });
      
      it("should return multiple columns with white stones to move", function() {
        let event = eventBuilder.player("b").action("β").build()
        game.setInteraction(event.json())
        game.setColumnStones("Ω", ["w"])
        game.setColumnStones("γ", ["w"])
  
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("From which column?")
        expect(availableActions.options[0].text).toBe("Ω");
        expect(availableActions.options[1].text).toBe("γ");
      });
      
      it("should NOT return column with black stones to move if column associated with the action", function() {
        let event = eventBuilder.player("b").action("β").build()
        game.setInteraction(event.json())
        game.setColumnStones("β", ["w"])
        game.setColumnStones("γ", ["w"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("From which column?")
        expect(availableActions.options[0].text).toBe("γ");
      });
      
    })

    describe("to which columne", function(){
      
      it("should return columns with available space avoiding two columns (column that trigger action and column use as source)", function() {
        let event = eventBuilder.player("b").action("β").source("Ω").build()
        game.setInteraction(event.json())
        game.setColumnStones("β", ["b"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("To which column?")
        expect(availableActions.options.length).toBe(5);
        expect(availableActions.options[0].text).toBe("α");
        expect(availableActions.options[1].text).toBe("δ");
        expect(availableActions.options[2].text).toBe("π");
        expect(availableActions.options[3].text).toBe("Σ");
        expect(availableActions.options[4].text).toBe("γ");
      });
      
      it("should return columns with empty space avoiding two columns (column that trigger action and column use as source)", function() {
        let event = eventBuilder.player("b").action("β").source("Ω").build()
        game.setInteraction(event.json())
        game.setColumnStones("α", ["b"])
        game.setColumnStones("Ω", ["b", "w"])
        game.setColumnStones("δ", ["b", "w", "g", "g", "g"])
        game.setColumnStones("γ", ["b", "w", "g", "g", "g"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("To which column?")
        expect(availableActions.options.length).toBe(3);
        expect(availableActions.options[0].text).toBe("α");
        expect(availableActions.options[1].text).toBe("π");
        expect(availableActions.options[2].text).toBe("Σ");
      });
            
    })
    
  })
  
});
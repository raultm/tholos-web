import EventBuilder from '../../../modules/events/EventBuilder.js';

import Game from '../../../modules/Game.js';

describe("Repeat Action", function() {
  
  var game;
  var eventBuilder;
  
  beforeEach(function() {
    game = new Game();
    game = game.evolve(EventBuilder.createdBasicGameEventJson());
  });
  
  describe("check availableActions on ChooseAction stage", function(){

    it("should NOT return π action if already used this turn", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","π"))
      game.evolve(EventBuilder.triggeredActionEvent("b","π", "w"))
      let availableActions = game.availableActions(game)
      
      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });
  });
});
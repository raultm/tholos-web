import Game from '../../modules/Game.js';
import EventBuilder from '../../modules/events/EventBuilder.js';
import PlayerTurn from '../../modules/states/PlayerTurn.js';

describe("Game", function() {
  
  var game;
  
  beforeEach(function() {
    game = new Game();
  });

  describe("Notify Observers", function(){
    
    it("should notify observers on evolve call", function() {
      let observer = { notify: function(){}}
      game.addObserver(observer)
      spyOn(observer, 'notify').withArgs(game)

      game.evolve(EventBuilder.createdBasicGameEventJson())

      expect(observer.notify).toHaveBeenCalled();  
    });

    it("should notify observers on setStatus call", function() {
      let observer = { notify: function(){}}
      game.addObserver(observer)
      spyOn(observer, 'notify').withArgs(game)

      game.setStatus(new PlayerTurn("b"))

      expect(observer.notify).toHaveBeenCalled();  
    });

    it("should notify observers on handlingAction call", function() {
      let observer = { notify: function(){}}
      game.addObserver(observer)
      spyOn(observer, 'notify').withArgs(game)

      game.handlingInteraction(EventBuilder.createdBasicGameEventJson())

      expect(observer.notify).toHaveBeenCalled();  
    });

    it("should notify observers multiple observers", function() {
      let observer1 = { notify: function(){}}
      let observer2 = { notify: function(){}}
      let observer3 = { notify: function(){}}
      
      game.addObserver(observer1)
      game.addObserver(observer2)
      game.addObserver(observer3)

      spyOn(observer1, 'notify').withArgs(game)
      spyOn(observer2, 'notify').withArgs(game)
      spyOn(observer3, 'notify').withArgs(game)

      game.evolve(EventBuilder.createdBasicGameEventJson())

      expect(observer1.notify).toHaveBeenCalled();  
      expect(observer2.notify).toHaveBeenCalled();  
      expect(observer3.notify).toHaveBeenCalled();  
      
    });
  
  })
  
  describe("Adding Observers", function(){
    
    it("should can add one observer", function() {
      let observer = { notify: function(){}}
      expect(game.getObservers().length).toBe(0)
  
      game.addObserver(observer)
      expect(game.getObservers().length).toBe(1)
    });
  

    it("should can add multiple observers", function() {
      let observer = { notify: function(){}}
      expect(game.getObservers().length).toBe(0)
  
      game.addObserver(observer)
      game.addObserver(observer)
      game.addObserver(observer)
      expect(game.getObservers().length).toBe(3)
    });

    it("should cant add observer if it does not have a notify property", function() {
      let observer = {}
      expect(game.getObservers().length).toBe(0)
  
      game.addObserver(observer)
      expect(game.getObservers().length).toBe(0)
    });
  
  })
  

});

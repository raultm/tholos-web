import Omega from "./Omega.js";
import Alpha from "./Alpha.js";
import Beta from "./Beta.js";
import Delta from "./Delta.js";
import Pi from "./Pi.js";
import Epsilon from "./Epsilon.js";
import Gamma from "./Gamma.js";

export default class ActionBuilder {

    static fromEvent(event){
        switch(event.data.action){
            case("Ω"): return new Omega(event)
            case("α"): return new Alpha(event)
            case("β"): return new Beta(event)
            case("δ"): return new Delta(event)
            case("π"): return new Pi(event)
            case("Σ"): return new Epsilon(event)
            case("γ"): return new Gamma(event)
            default:   throw new Error(`ActionBuilder cant build from event ${JSON.stringify(event)}`)
        }
    }

    static fromName(name) {
        switch(name){
            case("Ω"): return new Omega()
            case("α"): return new Alpha()
            case("β"): return new Beta()
            case("δ"): return new Delta()
            case("π"): return new Pi()
            case("Σ"): return new Epsilon()
            case("γ"): return new Gamma()
            default:   throw new Error(`ActionBuilder cant build from  ${JSON.stringify()}`)
        }
    }
}
window.newGame = function(){
    game.loadEvents({"type":"created_game","data":{"type":"basic"}})
}


window.exportGame = function()
{
    // In localStorage save as binaryString, convert to Binary Array
    var arraybuff = toBinArray(JSON.stringify(game.events()));
    var blob = new Blob([arraybuff]);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(blob);
    a.download = "tholos.game";
    a.onclick = function () {
        setTimeout(function () {
        window.URL.revokeObjectURL(a.href);
        }, 1500);
    };
    a.click();
}

window.importGame = function()
{
    var fileInput = document.getElementById("gamefile")
    var f = fileInput.files[0];
    var r = new FileReader();
    
    
	r.onload = function (event) { 
        let events = JSON.parse(toBinString(r.result))
        console.log(...events)
        game.loadEvents(...events); 
    }
	r.readAsArrayBuffer(f);
}

window.toBinArray = function(str) {
    var l = str.length,
        arr = new Uint16Array(l);
    for (var i = 0; i < l; i++) arr[i] = str.charCodeAt(i);
    return arr;
}

window.toBinString = function(arr) {
    var uarr = new Uint16Array(arr);
    var strings = [], chunksize = 0xffff;
    // There is a maximum stack size. We cannot call String.fromCharCode with as many arguments as we want
    for (var i = 0; i * chunksize < uarr.length; i++) {
        strings.push(String.fromCharCode.apply(null, uarr.subarray(i * chunksize, (i + 1) * chunksize)));
    }
    return strings.join('');
}
window.bug1 = function(){
    game.loadEvents(
        {"type":"created_game","data":{"type":"basic"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"Σ"}},
        {"type":"triggered_action","data":{"player":"b","action":"Σ","source":"b","target":"δ"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"γ"}},
        {"type":"triggered_action","data":{"player":"w","action":"γ","source":"δ","target":""}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"b","amount":3}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"δ"}},
        {"type":"triggered_action","data":{"player":"w","action":"δ","source":"g","target":""}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"δ"}},
        {"type":"triggered_action","data":{"player":"b","action":"δ","source":"g","target":""}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"g","column":"Σ"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"g","column":"γ"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"w","amount":3}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"α"}},
        {"type":"triggered_action","data":{"player":"b","action":"α","source":"Σ","target":"γ"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"Σ"}},
        {"type":"triggered_action","data":{"player":"w","action":"Σ","source":"w","target":"δ"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"α"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"Ω"}},
        {"type":"triggered_action","data":{"player":"w","action":"Ω","source":"α","target":"γ"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"b","amount":3}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"w","amount":3}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"π"}},
        {"type":"triggered_action","data":{"player":"b","action":"π","source":"w","target":""}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"Ω"}},
        {"type":"triggered_action","data":{"player":"w","action":"Ω","source":"π","target":"β"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"α"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"w","amount":2}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"β"}},
        {"type":"triggered_action","data":{"player":"b","action":"β","source":"Ω","target":"π"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"Σ"}},
        {"type":"triggered_action","data":{"player":"w","action":"Σ","source":"w","target":"Ω"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"g","amount":2}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"g","amount":2}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"w","column":"α"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"g","column":"α"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"g","column":"Ω"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"g","column":"β"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"g","column":"Ω"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"α"}},
        {"type":"triggered_action","data":{"player":"w","action":"α","source":"Ω","target":"β"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"b","amount":3}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"w","amount":3}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"Σ"}},
        {"type":"triggered_action","data":{"player":"b","action":"Σ","source":"b","target":"δ"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"Σ"}},
        {"type":"triggered_action","data":{"player":"w","action":"Σ","source":"w","target":"δ"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"b","amount":2}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"π"}},
        {"type":"triggered_action","data":{"player":"w","action":"π","source":"b","target":""}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"γ"}},
        {"type":"triggered_action","data":{"player":"b","action":"γ","source":"α","target":""}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"b","column":"π"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"α"}},
        {"type":"triggered_action","data":{"player":"b","action":"α","source":"β","target":"Ω"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"w","amount":3}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"b","amount":3}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"π"}}
    )
}

window.bug2 = function(){
    game.loadEvents(
        {"type":"created_game","data":{"type":"basic"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"α"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"δ"}},
        {"type":"triggered_action","data":{"player":"w","action":"δ","source":"w","target":""}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"β"}},
        {"type":"triggered_action","data":{"player":"b","action":"β","source":"δ","target":"α"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"b","amount":1}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"g","amount":2}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"b","column":"α"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"w","amount":1}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"α"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"g","column":"δ"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"π"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"g","column":"π"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"b","amount":1}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"w","column":"δ"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"w","amount":2}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"b","amount":3}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"b","column":"β"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"Ω"}},
        {"type":"triggered_action","data":{"player":"b","action":"Ω","source":"β","target":"π"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"β"}},
        {"type":"triggered_action","data":{"player":"w","action":"β","source":"δ","target":"Σ"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"δ"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"Ω"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"δ"}},
        {"type":"triggered_action","data":{"player":"b","action":"δ","source":"g","target":""}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"b","amount":1}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"g","column":"Ω"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"b","amount":1}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"b","amount":3}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"b","column":"Ω"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"α"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"b","column":"Σ"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"Σ"}},
        {"type":"triggered_action","data":{"player":"b","action":"Σ","source":"b","target":"β"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"w","amount":3}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"b","amount":3}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"δ"}},
        {"type":"triggered_action","data":{"player":"w","action":"δ","source":"g","target":""}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"γ"}},
        {"type":"triggered_action","data":{"player":"b","action":"γ","source":"α","target":""}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"g","column":"γ"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"γ"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"γ"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"β"}},
        {"type":"triggered_action","data":{"player":"b","action":"β","source":"γ","target":"δ"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"π"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"b","amount":1}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"w","amount":3}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"b","column":"α"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"π"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"g","amount":2}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"β"}},
        {"type":"triggered_action","data":{"player":"w","action":"β","source":"π","target":"γ"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"g","column":"π"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"Σ"}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"placed_stone","data":{"player":"b","color":"g","column":"Ω"}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"picked_stones","data":{"player":"w","color":"w","amount":3}},
        {"type":"ended_turn","data":{"player":"w"}},
        {"type":"picked_stones","data":{"player":"b","color":"g","amount":2}},
        {"type":"ended_turn","data":{"player":"b"}},
        {"type":"placed_stone","data":{"player":"w","color":"w","column":"Σ"}}
    )
}



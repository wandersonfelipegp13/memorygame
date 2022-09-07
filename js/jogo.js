var cartas;
var acerto;
var viradas;
var valCarta1;
var valCarta2;
var segundos;
var nick;
var score = window.sessionStorage.getItem('score');
var anterior;

nick = prompt("Nome: ");
if(nick == "")
    nick = "player";
document.getElementById("nick").innerHTML = nick;

if(score == null)
    score = 0;
document.getElementById("score").innerHTML = score;

function play(){
    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("segundos").style.color = "var(--verde)";
    reseta();   
    embaralha();
    tempo();
    desvira();  
}

function reseta(){
    cartas = [ 0, 0, 0, 0, 0, 0 ];
    acerto = [ 0, 0, 0, 0, 0, 0 ];
    viradas = 0;
    valCarta1 = 0;
    valCarta2 = 0;
    segundos = 15;
    anterior = null;
}

function embaralha() {
    for (var i = 0; i < cartas.length; i++) {
        var ok = false;
        var num;
        while (true) {
            var repitidos = 0;
            num = Math.floor(Math.random() * 3 + 1);
            for (let carta of cartas) {
                if (carta == num) {
                    repitidos++;
                    if (repitidos > 1) {
                        ok = false;
                        break;
                    }
                } else {
                    ok = true;
                }
            }
            if (ok) {
                break;
            }
        }
        cartas[i] = num;
    }
    
}

function vira(carta, element) {
    
    viradas++;

    if(element != anterior){

        if(viradas == 2){
            anterior = element;
            element.src = pickImage(cartas[carta - 1]);
            valCarta2 = cartas[carta - 1];
            setTimeout(desvira, 1000);
        } 
        if(viradas == 1) {
            anterior = element;
            element.src = pickImage(cartas[carta - 1]);
            valCarta1 = cartas[carta - 1];
        }
    } else {
        setTimeout(desvira, 1000);
        anterior = null;
    }
    
}

function pickImage(posicao){
    
    var caminho = "img/";
    if(posicao == 1)
        caminho += "star";
    else if(posicao == 2)
        caminho += "ray";
    else
        caminho += "core";

    return caminho + ".png";
}
 
function desvira() {

    if(valCarta1 == valCarta2){
        for (var j = 0; j < cartas.length; j++) {
            if(cartas[j] == valCarta1){
                acerto[j] = 1;
            }    
        }
    }

    var c = document.querySelectorAll("img");
    for (var i = 0; i < cartas.length; i++) {
        if(acerto[i] == 0)
            c[i].src = "img/costas.png"; 
    }

    viradas = 0;

}

function tempo(){
    document.getElementById("segundos").innerHTML = segundos;
    var t = setInterval(function() {
    	segundos--;

        if(winLose()){
            score++;
            volta(t);
        }

        if(segundos == 0)
            volta(t);

        if(segundos < 6)
            document.getElementById("segundos").style.color = "var(--aviso)";

        if(segundos < 4)
            document.getElementById("segundos").style.color = "var(--alert)";

        document.getElementById("segundos").innerHTML = segundos;
  	}, 1000);
}

function winLose(){
    for (let p of acerto)
        if(p == 0)
            return false;        
    return true;
}

function volta(t) {
    clearInterval(t);
    setTimeout(function(){
        document.getElementById("menu").style.visibility = "visible";
        console.log(window.sessionStorage.getItem('score'));
        document.getElementById("score").innerHTML = score;

    }, 1000);
    window.sessionStorage.setItem('score', score);
}
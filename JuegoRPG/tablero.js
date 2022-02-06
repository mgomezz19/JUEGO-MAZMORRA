    var posx_yo=0;
    var posy_yo=0;
    var posx_profe=0;
    var posy_profe=0;
    var mover_div_x = 0;
    var mover_div_y = -290;
    var mover_div_malo_x = 0;
    var mover_div_malo_y = -300;
    var mover_div_examen_x = 0;
    var mover_div_examen_y = -350;
    var cargado = false;
window.onload = function () {
    // load();
    var celda = document.querySelectorAll("td");
    var tabla = document.querySelector("table");
    var numprof_x;
    var numprof_y;
    var examen_x;
    var examen_y;
    var div_malo = document.querySelector(".div_malo");
    var div_examen = document.querySelector(".div_examen");

    celda[0].className="prota";
    celda[63].className="salida";
    celda[0].textContent="X";
    celda[0].style.color="transparent"; 

    do {
        numprof_x = parseInt(Math.random() * 8);
        numprof_y = parseInt(Math.random() * 8);
                
    } while (tabla.rows[numprof_x].cells[numprof_y].textContent!="");
    tabla.rows[numprof_x].cells[numprof_y].className="malo";
    tabla.rows[numprof_x].cells[numprof_y].textContent="P";
    tabla.rows[numprof_x].cells[numprof_y].style.color="transparent";

        mover_div_malo_x +=110*numprof_y;
        div_malo.style.left=mover_div_malo_x+"px";
      
        mover_div_malo_y +=95*numprof_x;
        div_malo.style.transform="translateZ("+mover_div_malo_y+"px)";

    // div_malo.style.left=celda[numprof].style.left+"px";
    // div_malo.style.top=celda[numprof].style.top+"px";
    do {
        examen_x = parseInt(Math.random() * 8);
        examen_y = parseInt(Math.random() * 8);
                
    } while (tabla.rows[examen_x].cells[examen_y].textContent!="");
    tabla.rows[examen_x].cells[examen_y].className="examen";
    tabla.rows[examen_x].cells[examen_y].textContent="E";
    tabla.rows[examen_x].cells[examen_y].style.color="transparent"

        mover_div_examen_x +=115*examen_y;
        div_examen.style.left=mover_div_examen_x+"px";
      
        mover_div_examen_y +=95*examen_x;
        div_examen.style.transform="translateZ("+mover_div_examen_y+"px)";


    for (let i = 0; i < celda.length; i++) {
        if (celda[i].innerHTML=="") {
            celda[i].textContent=".";
            celda[i].style.color="transparent";
        }
        
    }
}
function moverdiv(direccion) {
    var div_prota = document.querySelector(".div_prota");

    switch (direccion) {
        case "izq":
            mover_div_x -=110;
            div_prota.style.left=mover_div_x+"px";
            break;

        case "arr":
            mover_div_y -=90;
            div_prota.style.transform="translateZ("+mover_div_y+"px)";
            break;

        case "der":
            mover_div_x +=110;
            div_prota.style.left=mover_div_x+"px";
            break;

        case "aba":
            mover_div_y +=90;
            div_prota.style.transform="translateZ("+mover_div_y+"px)";
            break;
    
        default:
            break;
    }
  }

  function moverdivmalo(direccion) {
    var div_malo = document.querySelector(".div_malo");
    console.log(mover_div_malo_y);
    switch (direccion) {
        case "izq":
            mover_div_malo_x -=110;
            div_malo.style.left=mover_div_malo_x+"px";
            break;

        case "arr":
            mover_div_malo_y -=90;
            div_malo.style.transform="translateZ("+mover_div_malo_y+"px)";
            console.log(mover_div_malo_y);
            break;

        case "der":
            mover_div_malo_x +=110;
            div_malo.style.left=mover_div_malo_x+"px";
            break;

        case "aba":
            mover_div_malo_y +=90;
            div_malo.style.transform="translateZ("+mover_div_malo_y+"px)";
            break;
    
        default:
            break;
    }
  }
window.addEventListener("keyup", event => {
    var tabla = document.querySelector("table");
    var x_final=0;
    var y_final=0;
    switch (event.keyCode) {
        case 37://izquierda
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (tabla.rows[i].cells[j].textContent=="X") {
                        if (tabla.rows[i].cells[j-1].textContent=="E") {//SI A LA IZQUIERDA DEL USUARIO HAY UN EXAMEN LO PILLA Y DESBLOQUEA LA SALIDA
                            salida=true;
                            var obtener = document.createElement("audio");
                            obtener.src="obtener.mp3";
                            obtener.play();
                            var div_examen = document.querySelector(".div_examen");
                            document.body.removeChild(div_examen);
                            tabla.rows[7].cells[7].textContent="S";
                        }  
                        
                        //MOVIMIENTO DEL USUARIO
                        if (tabla.rows[i].cells[j-1].textContent!="." && tabla.rows[i].cells[j-1].textContent!="E") {
                            
                        }
                        else{
                            console.log(tabla.rows[i].cells[j]);
                            console.log(tabla.rows[i].cells[j-1]);
                            tabla.rows[i].cells[j].textContent=".";
                            tabla.rows[i].cells[j-1].textContent="X";
                            moverdiv("izq");
                            posy_yo = i;
                            posx_yo = j;
                            break;
                            
                        }
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    
                    if (tabla.rows[i].cells[j].textContent=="P") {
                        posy_profe = i;
                        posx_profe = j;
                    }
                }
            }
            y_final=posy_profe-posy_yo;
            x_final=posx_profe-posx_yo;
            if (Math.abs(y_final)>Math.abs(x_final)) {
                if (y_final<0) {
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe+1].cells[posx_profe].textContent="P";
                    moverdivmalo("aba");
                }
                else if(y_final==0&&x_final==0){
                    console.log("te he ecomio primo");
                }
                else{
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe-1].cells[posx_profe].textContent="P";
                    moverdivmalo("arr");
                }
            }
            else{
                if (x_final<0) {
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe].cells[posx_profe+1].textContent="P";
                    moverdivmalo("der");
                }
                else if(y_final==0&&x_final==0){
                    console.log("te he ecomio primo");
                }
                else{
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe].cells[posx_profe-1].textContent="P";
                    moverdivmalo("izq");
                }
            }
        break;
            
        case 38://arriba
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (tabla.rows[i].cells[j].textContent=="X") {
                        if (tabla.rows[i-1].cells[j].textContent=="E") {//SI ARRIBA DEL USUARIO HAY UN EXAMEN LO PILLA Y DESBLOQUEA LA SALIDA
                            salida=true;
                            var obtener = document.createElement("audio");
                            obtener.src="obtener.mp3";
                            obtener.play();
                            var div_examen = document.querySelector(".div_examen");
                            document.body.removeChild(div_examen);
                            tabla.rows[7].cells[7].textContent="S";
                        }  

                        //MOVIMIENTO DEL USUARIO
                        if (tabla.rows[i-1].cells[j].textContent!="." && tabla.rows[i-1].cells[j].textContent!="E") {
                        
                        }
                        else{
                            console.log(tabla.rows[i].cells[j]);
                            console.log(tabla.rows[i-1].cells[j]);
                            tabla.rows[i].cells[j].textContent=".";
                            tabla.rows[i-1].cells[j].textContent="X";
                            moverdiv("arr");
                            posy_yo = i;
                            posx_yo = j;
                            break;
                            
                        }
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    
                    if (tabla.rows[i].cells[j].textContent=="P") {
                        posy_profe = i;
                        posx_profe = j;
                    }
                }
            }
            y_final=posy_profe-posy_yo;
            x_final=posx_profe-posx_yo;
            if (Math.abs(y_final)>Math.abs(x_final)) {
                if (y_final<0) {
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe+1].cells[posx_profe].textContent="P";
                    moverdivmalo("aba");
                }
                else if(y_final==0&&x_final==0){
                    console.log("te he comio primo");
                }
                else{
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe-1].cells[posx_profe].textContent="P";
                    moverdivmalo("arr");
                }
            }
            else{
                if (x_final<0) {
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe].cells[posx_profe+1].textContent="P";
                    tabla.rows[posy_profe].cells[posx_profe+1].className="malo";
                    moverdivmalo("der");
                }
                else if(y_final==0&&x_final==0){
                    console.log("te he ecomio primo");
                }
                else{
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe].cells[posx_profe-1].textContent="P";
                    moverdivmalo("izq");
                }
            }
        break;

        case 39://derecha
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (tabla.rows[i].cells[j].textContent=="X") {
                        if (tabla.rows[i].cells[j+1].textContent=="E") {//SI A LA DERECHA DEL USUARIO HAY UN EXAMEN LO PILLA Y DESBLOQUEA LA SALIDA
                            salida=true;
                            var obtener = document.createElement("audio");
                            obtener.src="obtener.mp3";
                            obtener.play();
                            var div_examen = document.querySelector(".div_examen");
                            document.body.removeChild(div_examen);
                            tabla.rows[7].cells[7].textContent="S";
                        } 

                        if (tabla.rows[i].cells[j+1].textContent=="S") {//SI A LA DERECHA DEL USUARIO ESTA LA SALIDA, GANA EL JUEGO
                            ganar();
                        } 
                        
                        //MOVIMIENTO DEL USUARIO
                        if (tabla.rows[i].cells[j+1].textContent!="." && tabla.rows[i].cells[j+1].textContent!="E" && tabla.rows[i].cells[j+1].textContent!="S") {
                        
                        }
                        else{
                            console.log(i+"+"+j);
                            console.log(i+"+"+(j+1));
                            tabla.rows[i].cells[j].textContent=".";
                            tabla.rows[i].cells[j+1].textContent="X";
                            moverdiv("der");
                            posy_yo = i;
                            posx_yo = j;
                            break;
                            
                        }
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    
                    if (tabla.rows[i].cells[j].textContent=="P") {
                        posy_profe = i;
                        posx_profe = j;
                    }
                }
            }
            y_final=posy_profe-posy_yo;
            x_final=posx_profe-posx_yo;
            if (Math.abs(y_final)>Math.abs(x_final)) {
                if (y_final<0) {
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe+1].cells[posx_profe].textContent="P";
                    moverdivmalo("aba");
                }
                else if(y_final==0&&x_final==0){
                    console.log("te he ecomio primo");
                }
                else{
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe-1].cells[posx_profe].textContent="P";
                    moverdivmalo("arr");
                }
            }
            else{
                if (x_final<0) {
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe].cells[posx_profe+1].textContent="P";
                    moverdivmalo("der");
                }
                else if(y_final==0&&x_final==0){
                    console.log("te he ecomio primo");
                }
                else{
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe].cells[posx_profe-1].textContent="P";
                    moverdivmalo("izq");
                }
            }
        break;

        case 40://abajo
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (tabla.rows[i].cells[j].textContent=="X") {
                        if (tabla.rows[i+1].cells[j].textContent=="E") {//SI ABAJO DEL USUARIO HAY UN EXAMEN LO PILLA Y DESBLOQUEA LA SALIDA
                            salida=true;
                            var obtener = document.createElement("audio");
                            obtener.src="obtener.mp3";
                            obtener.play();
                            var div_examen = document.querySelector(".div_examen");
                            document.body.removeChild(div_examen);
                            tabla.rows[7].cells[7].textContent="S";
                        } 

                        if (tabla.rows[i+1].cells[j].textContent=="S") {//SI ABAJO DEL USUARIO ESTA LA SALIDA, GANA EL JUEGO
                            ganar();
                        }

                        //MOVIMIENTO DEL USUARIO
                        if (tabla.rows[i+1].cells[j].textContent=="." || tabla.rows[i+1].cells[j].textContent=="E" || tabla.rows[i+1].cells[j].textContent=="S") {
                            console.log(i+"+"+j);
                            console.log((i+1)+"+"+j);
                            posy_yo = i;
                            posx_yo = j;
                        }
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    
                    if (tabla.rows[i].cells[j].textContent=="P") {
                        posy_profe = i;
                        posx_profe = j;
                    }
                }
            }
            tabla.rows[posy_yo].cells[posx_yo].textContent=".";
            tabla.rows[posy_yo+1].cells[posx_yo].textContent="X";
            moverdiv("aba");
            y_final=posy_profe-posy_yo;
            x_final=posx_profe-posx_yo;
            if (Math.abs(y_final)>Math.abs(x_final)) {
                if (y_final<0) {
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe+1].cells[posx_profe].textContent="P";
                    moverdivmalo("aba");
                }
                else if(y_final==0&&x_final==0){
                    console.log("te he ecomio primo");
                }
                else{
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe-1].cells[posx_profe].textContent="P";
                    moverdivmalo("arr");
                }
            }
            else{
                if (x_final<0) {
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe].cells[posx_profe+1].textContent="P";
                    moverdivmalo("der");
                }
                else if(y_final==0&&x_final==0){
                    console.log("te he ecomio primo");
                }
                else{
                    tabla.rows[posy_profe].cells[posx_profe].textContent=".";
                    tabla.rows[posy_profe].cells[posx_profe-1].textContent="P";
                    moverdivmalo("izq");
                }
            }
        break;
            
        default:
            break;
    }

});

function ganar() {
    var audio_victoria = document.querySelector(".audio_victoria");
    audio_victoria.play();
    var div_ganar = document.querySelector(".ganar");
    var izquierda = document.querySelector(".izquierda"); 
    var derecha = document.querySelector(".derecha"); 
    var abajo = document.querySelector(".abajo"); 
    var prota = document.querySelector(".div_prota"); 
    var malo = document.querySelector(".div_malo"); 
    var moneda = document.querySelector(".div_examen"); 
    div_ganar.style.opacity=1;
    izquierda.style.opacity=0;
    derecha.style.opacity=0;
    abajo.style.opacity=0;
    prota.style.opacity=0;
    malo.style.opacity=0;
    moneda.style.opacity=0;

}
// function load(){
//     conload.style.display = 'inline-block';
//     animacion(conload,[{opacity:1, opacity:0}], { duration:3500, fill:'forwards' }, function(){   
//       conload.style.display = 'none'; 
      
//     }) 
//     setInterval(() => {
//         var tablero = document.querySelector("table");
//         var paredes = document.querySelectorAll("img");
    
//         for (let i = 0; i < paredes.length; i++) {
//             animacion(paredes[i],[{opacity:0, opacity:1}], { duration:3000, fill:'forwards' }, function(){   
                
                
//             }); 
            
//         }
            
//             animacion(tablero,[{opacity:0, opacity:1}], { duration:3000, fill:'forwards' }, function(){   
            
            
//             });
            
        
        
//     }, 3000);

//   }

function sonido() {
    var audio = document.querySelector('audio');
    var boton = document.querySelector('button');

        if(!audio.paused)   { 
            boton.className="muteado";
            audio.pause();   
        } 
        else { 
            boton.className="escuchando";
            audio.play(); 
        }
}
  

// function mover(direccion) {
    
//     var celda = document.querySelectorAll("td");

//     switch (direccion) {
//         case "Izq":
            
//             console.log(direccion);
//             for (let i = 0; i < celda.length; i++) {
//                 if (celda[i].textContent=="X") {
//                     if (celda[i-1].textContent!=".") {
                    
//                     }
//                     else{
//                         console.log(celda[i]);
//                         console.log(celda[i-1]);
//                         celda[i].textContent=".";
//                         celda[i-1].textContent="X";
//                         break;
                        
//                     }
//                 }
                
//             }
//             break;

//         case "Der":
//             console.log(direccion);
//             for (let i = 0; i < celda.length; i++) {
//                 if (celda[i].textContent=="X") {
//                     if (celda[i+1].textContent!=".") {
                    
//                     }
//                     else{
//                         console.log(celda[i]);
//                         console.log(celda[i+1]);
//                         celda[i].textContent=".";
//                         celda[i+1].textContent="X";
//                         break;
                        
//                     }
//                 }
                
//             }
            
//             break;

            
//         case "Arr":
//             console.log(direccion);
//             for (let i = 0; i < celda.length; i++) {
//                 if (celda[i].textContent=="X") {
//                     if (celda[i-8].textContent!=".") {
                    
//                     }
//                     else{
//                         console.log(celda[i]);
//                         console.log(celda[i-8]);
//                         celda[i].textContent=".";
//                         celda[i-8].textContent="X";
//                         break;
                        
//                     }
//                 }
                
//             }
//             break;

//         case "Aba":
//             console.log(direccion);
//             for (let i = 0; i < celda.length; i++) {
//                 if (celda[i].textContent=="X") {
//                     if (celda[i+8].textContent!=".") {
                    
//                     }
//                     else{
//                         console.log(celda[i]);
//                         console.log(celda[i+8]);
//                         celda[i].textContent=".";
//                         celda[i+8].textContent="X";
//                         break;
                        
//                     }
//                 }
                
//             }
//             break;

//         default:
//             break;
//     }
    
// }
    var posx_yo=0;
    var posy_yo=0;
    var posx_profe=0;
    var posy_profe=0;
    var mover_div_x = 0;
    var mover_div_y = -350;
    var mover_div_malo_x = 0;
    var mover_div_malo_y = -350;
    var cargado = false;
window.onload = function () {
    load();
    var celda = document.querySelectorAll("td");
    var tabla = document.querySelector("table");
    var numprof_x;
    var numprof_y;
    var examen;
    var div_malo = document.querySelector(".div_malo");

    celda[0].className="prota";
    celda[0].textContent="X";
    celda[0].style.color="transparent"; 

    do {
        numprof_x = parseInt(Math.random() * 8);
        numprof_y = parseInt(Math.random() * 8);
                
    } while (tabla.rows[numprof_x].cells[numprof_y].textContent!="");
    tabla.rows[numprof_x].cells[numprof_y].className="malo";
    tabla.rows[numprof_x].cells[numprof_y].textContent="P";
    tabla.rows[numprof_x].cells[numprof_y].style.color="transparent"

    console.log(mover_div_malo_y);
        mover_div_malo_x +=115*numprof_y;
        div_malo.style.left=mover_div_malo_x+"px";
      
        mover_div_malo_y +=95*numprof_x;
        div_malo.style.transform="translateZ("+mover_div_malo_y+"px)";
          
        console.log(mover_div_malo_y);

    // div_malo.style.left=celda[numprof].style.left+"px";
    // div_malo.style.top=celda[numprof].style.top+"px";

    do {
        examen = parseInt(Math.random() * celda.length);
    } while (celda[examen].textContent!="");
    celda[examen].textContent="E";
    // celda[examen].style.color="transparent";

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
            mover_div_x -=115;
            div_prota.style.left=mover_div_x+"px";
            break;

        case "arr":
            mover_div_y -=95;
            div_prota.style.transform="translateZ("+mover_div_y+"px)";
            break;

        case "der":
            mover_div_x +=115;
            div_prota.style.left=mover_div_x+"px";
            break;

        case "aba":
            mover_div_y +=95;
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
            mover_div_malo_x -=115;
            div_malo.style.left=mover_div_malo_x+"px";
            break;

        case "arr":
            mover_div_malo_y -=95;
            div_malo.style.transform="translateZ("+mover_div_malo_y+"px)";
            console.log(mover_div_malo_y);
            break;

        case "der":
            mover_div_malo_x +=115;
            div_malo.style.left=mover_div_malo_x+"px";
            break;

        case "aba":
            mover_div_malo_y +=95;
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
                            tabla.rows[7].cells[7].textContent="S";
                        } 

                        if (tabla.rows[i].cells[j+1].textContent=="S") {//SI A LA DERECHA DEL USUARIO ESTA LA SALIDA, GANA EL JUEGO
                            alert("Has consegido escapar");
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
                            tabla.rows[7].cells[7].textContent="S";
                        } 

                        if (tabla.rows[i+1].cells[j].textContent=="S") {//SI ABAJO DEL USUARIO ESTA LA SALIDA, GANA EL JUEGO
                            alert("Has consegido escapar");
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
function load(){
    conload.style.display = 'inline-block';
    animacion(conload,[{opacity:1, opacity:0}], { duration:3500, fill:'forwards' }, function(){   
      conload.style.display = 'none'; 
      
    }) 
    setInterval(() => {
        var tablero = document.querySelector("table");
        var paredes = document.querySelectorAll("img");
        for (let i = 0; i < paredes.length; i++) {
            animacion(paredes[i],[{opacity:0, opacity:1}], { duration:3000, fill:'forwards' }, function(){   
                
                
            }); 
            
        }
            
            animacion(tablero,[{opacity:0, opacity:1}], { duration:3000, fill:'forwards' }, function(){   
            
            
            });
            
        
        
    }, 3000);
   
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
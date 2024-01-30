//Variable para mostrar datos en html
var pantalla;
//Evaluador para al momento de dar igual, si escribo otro numero que me lo detecte como si fuera el primero
var evaluador_operaciones="";
//Variable que guardará lo que el usuario ponga
var x="";
//Variable para que entre en el if dentro del método de numero()
var xi="1";
//Variable que guardara el numero puesto después de haber presionado un signo
var ni="0";
//Evaluador para comprobar si el usuario ha puesto .
var punto="0";
//Evaluador para comprobar si el usuario ha puesto ceros
var evaluador_cero="0";
//Variable que ayuda a guardar el ultimo signo puesto para en caso de darle al igual muchas veces, este funcione correctamente
var evaluador_igual="0";
//Variable que ayuda a guardar el ultimo signo puesto para realizar la operación
var operacion_realizar="";
//Variable que guardar la operación y con el método eval(realizar), traduzca la operación y la realice
var realizar="";
//Variables que nos ayudará a la hora de eliminar un caracter
var last_pantalla, posicion="";
//Evaluador del menos
var evaluador_menos=0;
//Arreglo que guardará los signos de los botones para moverle al diseño justo después de hacer un clic.
const botones = document.getElementsByClassName("simbolos");
//Método para interactuar con el numero recibido
    function numero(n){
        pantalla = document.getElementById("pantalla_res");
        //Si el usuario pone un numero justo después de haberle picado al "=", entrará aquí
        if (pantalla.innerHTML==evaluador_operaciones){
            borrar();
        }
        //Al ingresar un numero, entrará en este if
        if (x=="" || xi==1  ) {	
            //Si el usuario pone un "." como primera opción, entrara aquí
            if (n=="." && x=="") { 
               pantalla.innerHTML+="0."; 
               x+=n; 
               punto=1; 
            }
            //Si el usuario pone un "0" como primera opción, entrara aquí
            if (n==0 && x==""){
                    //Si el usuario mando un 00, lo convertimos en 0
                    if(n==00){
                        n=0;
                    }
                    pantalla.innerHTML+=n;
                    evaluador_cero=1;
                    x+=n; 
            }
           else { 
            //Si el usuario pone un "." y el evaluador no está activado, entrara aquí
               if (n=="." && punto==0) { 
                   pantalla.innerHTML+=n;
                   x+=n;
                   punto=1; 
                   evaluador_cero=0;
               }
               //Si el usuario pone un "." y el evaluador esta activado, entrara aquí 
               else if (n=="." && punto==1) {} 
               else {
                //Si el usuario pone un numero cualquiera, y antes el usuario había puesto un 0, entrará aquí
                if (n>=1 && evaluador_cero==1){
                    posicion = (pantalla.innerHTML).length;
                    pantalla.innerHTML=pantalla.innerHTML.substring(0,posicion-1);
                    pantalla.innerHTML+=n;  
                    x=n; 
                    evaluador_cero=0; 
                }
                else {
                    //Si el evaluador de 0 esta activado, entrará aquí
                    if (evaluador_cero==1){
                        //Si el usuario puso un "0." y quiere poner un 0, entrará aquí
                        if (punto==1){
                            pantalla.innerHTML+=n;
                            x+=n;
                            evaluador_cero=0;
                        }
                    }
                    else{
                        //La mayoría de los casos entrará aquí
                   pantalla.innerHTML+=n;
                   x+=n;
                }
                }
               }
            }
    }
    
    }
    //Método que es llamado cuando el usuario pone un simbolo de operación
    function addoperacion(op){
        pantalla = document.getElementById("pantalla_res");
        //Si no se había hechon una operación antes, entrará aquí
        if(xi==1){
            if(operacion_realizar==""){
                //If para poner numeros en negativo
                if (pantalla.innerHTML==""){
                    if(op=="-"){
                        evaluador_menos=1;
                        pantalla.innerHTML=op;
                        x=op;
                    }
                }
                else{
                    //If para evitar posibles errores con el "."
                    if (x=="0" || x=="." || x=="0."){
                        x=0;
                    }
                    //Si el usuario pone un simbolo después de haber puesto un numero, entrará aquí
                    if(x!="-"){
                        ni=x;
                        pantalla.innerHTML+=op;
                        last_pantalla=pantalla.innerHTML;
                        diseñoBotones(op);
                        operacion_realizar=op;
                        evaluador_igual=op;
                        x="";
                        punto=0;
                        evaluador_cero=0;
                        evaluador_menos=0;
                    }
                }
        
            }
            //En caso contrario de que si se haya puesto una operación antes...
            else {
                //Si el usuario le pica a otro simbolo (antes de picarle al igual), entrará aquí
                if (x!=""){
                    if(x=="-"){
                    }
                    else{
                        igualar();
                        diseñoBotones(op);
                        ni=x;
                        pantalla.innerHTML+=op;
                        last_pantalla=pantalla.innerHTML;
                        operacion_realizar=op;
                        evaluador_igual=op;
                        x="";
                        punto=0;
                    }
                }
                //Si el usuario quiere poner un numero como negativo, entrará aquí (solo si va a multiplicar o sumar)
                else if (op=="-"){
                    if (evaluador_menos==0){
                        if (operacion_realizar=="*" || operacion_realizar=="/"){
                        evaluador_menos=1;
                        x+=op;
                        pantalla.innerHTML+=x;
                        }
                    }
                }
            }
            //Si la operación es multiplicación o division, habilitamos el "-" en caso de que quiera poner negativos
            if(operacion_realizar=="*" || operacion_realizar=="/"){
                botones[2].style.opacity="100%";
            }
        }
}
    //Si el ususario le dio al igual, entrará aquí
    function igualar(){
        pantalla = document.getElementById("pantalla_res");
        //If para posibles errores
        if(xi==1){
        if (x=="0" || x=="." || x=="0."){
            x=0;
        }   
        evaluador_menos=0;
        //Si el usuario presiona "=" varias veces, sabiendo que antes hizo una operación, entrará aquí
        if (pantalla.innerHTML==x){
            if (ni==0 || evaluador_igual==0){}
            else {
                realizar=x+evaluador_igual+ni;
                x=eval(realizar);
                evaluador_operaciones=x;
                pantalla.innerHTML=eval(realizar);
            }
        }
        //Si hay una operación pendiente, la realizará con la ayuda de eval(realizar)
        if (operacion_realizar !=""){
            if(x==0){x='0';}
            if (x!=""){
                realizar=ni+operacion_realizar+x;
                ni=x;
                pantalla.innerHTML=eval(realizar);
                x=eval(realizar);
                evaluador_operaciones=x;
                operacion_realizar="";
                for (var i=0; i < botones.length; i++){
                    botones[i].style.opacity="80%";
                }
            }
            else{
                alert("No hay ningún valor con el cual interactuar");
            }
            
        }
    }
    //Si la operación es dividida entre 0, entrará aquí
    if(isFinite(x)==false){
        xi=0;
        pantalla.innerHTML="Esto da infinito";
    }
    }
    //Método para calcular la raiz
    function raiz(){
        //Si no hay ninguna operación de por medio, entrará aquí
        if(operacion_realizar == "" && xi==1){
            ni=Math.sqrt(x);
            pantalla.innerHTML=ni;
            x=ni;
            operacion_realizar="";
            punto=0;
        }
        //Si la raiz es negativa, entrará aquí
        if(isNaN(x)){
            xi=0;
            pantalla.innerHTML="No hay raices negativas...";
        }
    }
    //Método para cambiar el diseño de los botones que no fueron presionados
    function diseñoBotones(op){
        for (var i=0; i < botones.length; i++){
            if (botones[i].value==op){}
            else {
            botones[i].style.opacity="5%";
            }
        }
    }
    //Método para borrar todo
    function borrar(){
        pantalla = document.getElementById("pantalla_res");
        for (var i=0; i < botones.length; i++){
            botones[i].style.opacity="80%";
        }
        x="";
        xi="1";
        ni="0";
        punto="0";
        evaluador_cero="0";
        operacion_realizar="";
        realizar="";
        pantalla.innerHTML="";
        evaluador_igual="0";
        evaluador_operaciones="";
    }
    //Método para eliminar el ultimo caracter
    function deleteCaracter(){
        posicion = x.length;
        if(xi==1){
        if (pantalla.innerHTML==""){
        }
        //Si la cadena x contiene algo, entrará aquí
        else {
            //Obtenemos el ultimo caracter
            x=x.substring(0,posicion-1);
            //Si aún no se ha puesto ningún simbolo, entrará aquí
            if (operacion_realizar==""){
                pantalla.innerHTML=x;
            }
            //En caso contrario, entrará aquí
            else {
                pantalla.innerHTML=last_pantalla+x;
            }
            
        }
    }
    }
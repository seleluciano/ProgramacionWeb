function iniciar(){
    var boton=document.getElementById("grabar");
    boton.addEventListener('click',nuevoItem);
    mostrar();
}

//Agregar datos
function nuevoItem(){
    var clave=document.getElementById("clave").value;
    var valor=document.getElementById("texto").value;
    sessionStorage.setItem(clave,valor);
    document.getElementById("clave").value='';
    document.getElementById("texto").value='';
    mostrar(clave);
}

//leer el dato cargado, lee el ultimo ya que solo guarda el ultimo valor
/*
function mostrar(clave){
    var cajadatos=document.getElementById("cajadatos");
    var valor=sessionStorage.getItem(clave);
    cajadatos.innerHTML='<div>' + clave + '-' + valor + '</div>';
    var clave=document.getElementById('clave');
    clave.innerHTML="";
    var texto=document.getElementById('texto');
    texto.innerHTML="";
}
*/
//Muestra todos los valores que guardo
function mostrar(){
    var cajadatos=document.getElementById("cajadatos");
    cajadatos.innerHTML='';
    if(sessionStorage.length>0){
        cajadatos.innerHTML='<div> <input type="button" onclick="eliminartodo()" value="Eliminar todo"> </div>'
    }
    for (var i=0; i < sessionStorage.length; i++){
        var clave= sessionStorage.key(i);
        var valor=sessionStorage.getItem(clave);
        cajadatos.innerHTML+='<div>' + clave + '-' + valor + '<br> <input type="button" onclick="eliminar(\''+ clave + '\')" value="Eliminar"></div>'
    }
}

function eliminar(clave){
    if(confirm('seguro deseas eliminar?')){
        sessionStorage.removeItem(clave);
        mostrar();
    }
}

function eliminartodo(){
    if(confirm('seguro deseas eliminar?')){
        sessionStorage.clear();
        mostrar();
    }
}

addEventListener('load',iniciar);
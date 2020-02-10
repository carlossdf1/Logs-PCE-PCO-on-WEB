const vals=[];

function leerArchivo(e) {
    let archivos = e.target.files;
    if (!archivos) {
        return;
    }

    for (let j=0,f; f = archivos[j] ; j++) {

        let lector = new FileReader();

        lector.onload = (function(theFile) {
            return function(e){

                let srt=limpiaTxt((e.target.result).toString());
             
                let date = new Date(theFile.lastModified)
                let fila=extraeDatos(srt);
                //fila.push(theFile.name.replace('.txt', ''));
                fila.unshift(date);
                vals.push(fila);

                if(j+1==archivos.length){
                    //window.location.href="#test6";

                    console.log("PASO DATOS ############################################################");
                    if(vals[0][0]!="Fecha"){
                        vals.unshift(["Fecha","2,5um","10um","AT °C","RH %","DP °C","WB °C"]);
                    }
                    //console.log(vals);
                    google.charts.setOnLoadCallback(drawChart(vals));
                }
            }
        })(f);
        lector.readAsText(f);
    }//for
}

function limpiaTxt(srt){
    srt=srt.replace('MassCon  ug/m\r\n2.5um:', '');
    srt=srt.replace('10 um:', '');
    srt=srt.replace(/ /g, '');
    srt=srt.replace('AT:', '');
    srt=srt.replace('RH:', '\r\n');
    srt=srt.replace('DP:', '');
    srt=srt.replace('WB:', '\r\n');
    srt=srt.replace(/\r\n/g, '-');
    return(srt);
}

function extraeDatos(srt){
    let fila=[];

    let num='';
    for (var i=0; i<srt.length;i++){

        if (srt[i]!='-'){
            num+=srt[i];
        }

        else{
            fila.push(parseInt(num));
            num='';
        }
    }

    return fila;
}


function switchVals(){
    let graf=copiaVals();

    let s=new Array(6);
    
    s[0]=document.getElementById("25").checked;
    s[1]=document.getElementById("10").checked;
    s[2]=document.getElementById("at").checked;
    s[3]=document.getElementById("rh").checked;
    s[4]=document.getElementById("dp").checked;
    s[5]=document.getElementById("wb").checked;
    
    console.log(s);

    let u=new Array(6);

    if(s[0]==false){
        u[0]=graf[0].indexOf("2,5um");
        graf=borraColumnas(graf,u[0]);
        //console.log(01,u[0]);
    }
    
    if(s[1]==false){
        u[1]=graf[0].indexOf("10um");
        graf=borraColumnas(graf,u[1]);
        //console.log(02,u[1]);
    }

    if(s[2]==false){
        u[2]=graf[0].indexOf("AT °C");
        graf=borraColumnas(graf,u[2]);
        //console.log(03,u[2]);
    }
    if(s[3]==false){
        u[3]=graf[0].indexOf("RH %");
        graf=borraColumnas(graf,u[3]);
        //console.log(04,u[3]);   
    }
    if(s[4]==false){
        u[4]=graf[0].indexOf("DP °C");
        graf=borraColumnas(graf,u[4]);
        //console.log(05,u[4]);  
    }
    if(s[5]==false){
        u[5]=graf[0].indexOf("WB °C");
        graf=borraColumnas(graf,u[5]);
        //console.log(06,u[5]);   
    }
    console.log(u);
    return graf;
}

function dibujaGraf(){
    let vals=switchVals();
    google.charts.setOnLoadCallback(drawChart(vals));
}

function copiaVals(){
    let datos=new Array();
    for(let y=0;y<vals.length;y++){
        //datos.push(vals[y]);
        datos.push(new Array((vals[y][0]),(vals[y][1]),(vals[y][2]),(vals[y][3]),(vals[y][4]),(vals[y][5]),(vals[y][6])));
    }
    return datos;
}


function borraColumnas(dat,ind){
    let datos=dat.slice();
    for(let j=0;j<datos.length;j++){
        datos[j].splice(ind,1);
    }

    return datos;
}


document.getElementById('file-input').addEventListener('change',leerArchivo, false);

document.getElementById('25').addEventListener('change',dibujaGraf,false);
document.getElementById('10').addEventListener('change',dibujaGraf,false);
document.getElementById('at').addEventListener('change',dibujaGraf,false);
document.getElementById('rh').addEventListener('change',dibujaGraf,false);
document.getElementById('dp').addEventListener('change',dibujaGraf,false);
document.getElementById('wb').addEventListener('change',dibujaGraf,false);


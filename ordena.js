let vals=[];
let datos=[];

function leerArchivo(e) {
    var archivos = e.target.files;
    if (!archivos) {
        return;
    }

    datos.push(['Time','2.5um','10 um']);

    console.log(archivos);

    for (var j=0,f; f = archivos[j] ; j++) {
        console.log(f);
        var lector = new FileReader();

        lector.onload = (function(theFile) {
            return function(e){
                let srt='';
                let fila=[];
                console.log(e.target.result);
                srt=(e.target.result).toString();
                srt=srt.replace('MassCon  ug/m\r\n2.5um:', '');
                srt=srt.replace('10 um:', '');
                srt=srt.replace(/ /g, '');
                srt=srt.replace('AT:', '');
                srt=srt.replace('RH:', '\r\n');
                srt=srt.replace('DP:', '');
                srt=srt.replace('WB:', '\r\n');
                srt=srt.replace(/\r\n/g, '-');
                
                var date = new Date(theFile.lastModified)

                //fila.push(theFile.name.replace('.txt', ''));
                fila.push(date.getTime());

                let num='';
                for (var i=0; i<srt.length;i++){
            
                    if (srt[i]!='-'){
                        num+=srt[i];
                    }

                    else{
                        fila.push(num);
                        num='';
                    }
                }
                vals.push(fila);
                datos.push([fila[0],parseInt(fila[1]),parseInt(fila[2])]);
                
                console.log(datos);
                console.log(vals);
            }
        })(f);
        lector.readAsText(f);
    }//for
    //google.charts.setOnLoadCallback(drawChart);
}

document.getElementById('file-input')
.addEventListener('change', leerArchivo, false);


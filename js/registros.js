let registros;

const campoBusqueda = document.getElementById("buscarDocumento");
const resultado = document.getElementById("resultado");

//Obtiene todos los registro vigentes en la hoja de calculo google sheets
async function getRegistros() {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1ETP3tsXyQV5B1T29RzZCRgi_v_fJvllsIMBFPbTT2MY',
            range: 'Registro!C:D',
        });
    } catch (err) {
        console.warn(err.message);
        return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        console.warn('No se encontraron registros');
        return;
    }

    registros = [];
    range.values.forEach((fila) => {
        if (isNaN(parseInt(fila[0])) || fila[2] !== undefined) return;
        const nuevoRegistro = {
            numero: parseInt(fila[0]),
            nombre: fila[1]
        };
        registros.push(nuevoRegistro);
    });   
    // Flatten to string to display
    
}

window.addEventListener("click", function(e) {
    if (!campoBusqueda.contains(e.target)) {
        return mostrarResultados();   
    }    
})

function mostrarResultados() {
    const textoBusqueda = parseInt(campoBusqueda.value);
    if(!isNaN(textoBusqueda)) {
        const nombreEncontrado = buscarNombrePorNumero(textoBusqueda);    
        if (nombreEncontrado) {
            resultado.value = nombreEncontrado;
        } else {
            resultado.value = " ";
        }      
    } else {
        resultado.value = " ";
    }    
}

function buscarNombrePorNumero(numero) {
    const valor = registros.find(registro => registro.numero === numero);    
    return valor ? valor.nombre : null;
}
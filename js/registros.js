let registros;

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


    // Flatten to string to display
    console.log(range.values);
}
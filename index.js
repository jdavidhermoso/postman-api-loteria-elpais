const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');
const fs = require('fs');

function getUpdateDateTime() {
}

try {
    https.get('https://api.elpais.com/ws/LoteriaNavidadPremiados?n=resumen', (resp) => {
        let data = '';
        let parsedData = '';
        let updateDateTime = '';
        let resultsYear = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            data = data.replace('premios=', '');
            parsedData = JSON.parse(data);
            updateDateTime = parsedData.timestamp;
            resultsYear = new Date(updateDateTime * 1000).getFullYear();
            console.log(resultsYear)
            console.dir(data)


            fs.writeFile(`./results-${resultsYear}.json`, data, () => {
                console.log('File saved!')
            })
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
} catch (error) {
    core.setFailed(error.message);
}

const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');
const fs = require('fs');

try {
    https.get('https://api.elpais.com/ws/LoteriaNavidadPremiados?n=resumen', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            data = data.replace('premios=', '')

            fs.writeFile(`./results-${new Date().getFullYear()}.json`, data, () => {
                console.log('File saved!')
            })
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
} catch (error) {
    core.setFailed(error.message);
}

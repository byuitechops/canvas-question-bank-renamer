const { main } = require('./main.js');
const fs = require('fs');
const d3 = require('d3-dsv');

async function getInput() {
    let courseIDs = [49810, 55036, 55034];

    //Is array test
    if(!Array.isArray(courseIDs))
        throw new Error('Please use an array');

    return courseIDs;
}

async function makeOutput (results) {
    var courses = d3.csvFormat(results);
    let wstream = fs.createWriteStream('./log.csv', {encoding: 'utf8'});
    wstream.write(courses);
    wstream.end();
}

function handleError (error) {
    console.error(error.message);
    return;
}

async function start () {
    let search = process.argv[2];
    let replace = process.argv[3];
    try{
        var input = await getInput();
        var output =  await main(search, replace, input);
        await makeOutput(output);
    } catch(error){
       handleError(error);
    }
}

start();
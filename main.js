const fs = require('fs');
const { Command } = require('commander');

const program = new Command();

program
    .option('-i, --input <file>', 'input file path')  
    .option('-o, --output <file>', 'output file path')  
    .option('-d, --display', 'display result in console')  
    .parse(process.argv);

const options = program.opts();


if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

let data;
try {
    data = fs.readFileSync(options.input, 'utf8');
} catch (error) {
    console.error('Cannot read input file');
    process.exit(1);
}

let jsonData;
try {
    jsonData = JSON.parse(data);
} catch (error) {
    console.error('Error parsing JSON');
    process.exit(1);
}

if (options.output) {
    try {
        fs.writeFileSync(options.output, JSON.stringify(jsonData, null, 2));
        console.log(`Result written to ${options.output}`);
    } catch (error) {
        console.error('Cannot write to output file');
        process.exit(1);
    }
}

if (options.display) {
    console.log(jsonData);
}

const fs = require('fs');

// fs.rename('randomFile.xml', 'notRandomFile.xml', (err) => {
//   if (err) console.log(err);
// });

// fs.createReadStream('test.log').pipe(fs.createWriteStream('newLog.log'));

/**
 * Duplicates files while slightly renaming them. 
 * @param {string} operatingSystem 
 * @param {string} environment 
 * @return {string}
 */
function duplicateFiles(operatingSystem, environment) {
  let filesFromCurrentDirectory = fs.readdirSync('./');
  console.log(filesFromCurrentDirectory);
  filesFromCurrentDirectory((file) => {
    if (file.includes(`_${operatingSystem}`) && file.includes(`_${environment}`)) {
      return 'The files are already there';
    } else {
      // copy and rename the file to include the new operating system and environment
      copyFile('old name', 'newName');
    }
  })
};

function filesFromCurrentDirectory() {
  fs.readdir('./', (err, files) => {
    if (err) console.error(err);
    return files;
  });
};

function copyFile(source, target) {
  return new Promise((resolve,reject) => {
    const rd = fs.createReadStream(source);
    rd.on('error', err => reject(err));
    const wr = fs.createWriteStream(target);
    wr.on('error', err => reject(err));
    wr.on('close', () => resolve());
    rd.pipe(wr);
  });
};

// copyFile('test2.log', 'notTest.log');
duplicateFiles(process.argv[2], process.argv[3]);
// copyFile('test.log', 'notTest.log');

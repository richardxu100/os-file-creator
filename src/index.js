const fs = require('fs');

/**
 * duplicateFiles - renames files to allow them to be used in different operating system and environments
 *
 * @param  {string} operatingSystem
 * @param  {string} environment
 * @return {string}
*/
function duplicateFiles(operatingSystem, environment) {
  const filesFromCurrentDirectory = fs.readdirSync('./');
  console.log(filesFromCurrentDirectory);
  if (filesFromCurrentDirectory.some((file => file.includes(`_${operatingSystem}`) && file.includes(`_${environment}`)))) {
    return 'Some files are already there, please delete them before starting.';
  } else {
    filesFromCurrentDirectory.forEach((file) => {
      let renamedFile = renameFile(file, operatingSystem, environment); // replace operating system and environment
      duplicateFile(file, renamedFile).catch((err) => console.error(err));
    });
    return 'Success! The files have been created/duplicated.';
  }
};

/**
 * renameFile - replaces the operatingSystem and environment of a provided fileName
 *
 * @param  {string} fileName        f.e.
 * @param  {string} operatingSystem f.e. linux, windows, and mac
 * @param  {string} environment     f.e. PROD and ALPHA
 * @return {string}                 f.e.
*/
function renameFile(fileName, operatingSystem, environment) {

}

/**
 * duplicateFile - takes a file and creates a duplicate with a different name
 *
 * @param  {string} name
 * @param  {string} newName
 * @return {null}
*/
function duplicateFile(name, newName) {
  return new Promise((resolve, reject) => {
    const rd = fs.createReadStream(name);
    const wr = fs.createWriteStream(newName);
    rd.on('error', err => reject(err));
    wr.on('error', err => reject(err));
    wr.on('close', () => resolve());
    rd.pipe(wr);
  });
};

duplicateFiles(process.argv[2], process.argv[3]);

// fs.rename('randomFile.xml', 'notRandomFile.xml', (err) => { if (err) console.log(err); });

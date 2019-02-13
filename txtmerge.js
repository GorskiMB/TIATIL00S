// Load in modules
const fs              = require('fs'),
      readline        = require('readline'),
      ArgumentParser  = require('argparse').ArgumentParser;

// Configuration
const fileExtension   = '.txt';

// Initialize readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initalize Argument Parser
const parser = new ArgumentParser({
  version: '1.0.0',
  addHelp: true,
  description: 'Merge multiple text files from a directory. Example: npm start --source="path\\to\\source" --output="path\\to\\output.txt"'
});

parser.addArgument(
  ['-s', '--source'],
  {
    help: 'Path to source directory with text files to merge.'
  }
);

parser.addArgument(
  ['-o', '--output'],
  {
    help: 'Path to the output text file.'
  }
);

const args = parser.parseArgs();

const sourceDirectory = args.source;

// Checks if the path is a directory
const isDirectory = path => {
  // Returns true if path is a directory. Otherwise returns false.
  return fs.existsSync(path) ? fs.statSync(path).isDirectory() : false;
};

// Gets file names of all files from a directory that match the file extension
const getTxtFiles = path => {
  // Make sure the path is a directory
  if (!isDirectory(path)) return;

  // Get file names of all files from the directory
  let files = fs.readdirSync(path);

  // Filter out all file names that don't match the file extension
  files = files.filter(file => {
    return file.slice(-fileExtension.length) == fileExtension;
  });

  // Return filtered filenames of the files
  return files;
};

// Sort
const sortEntries = array => {
  array.sort();
  return array;
};

// Get all files to be merged
const files = getTxtFiles(sourceDirectory);

// Check if there are files
if (!files) {
  rl.write('Path not a directory or contains no files.');
  // Exit the program
  process.exit();
}

// Count number of duplicates detected
let duplicates = 0;
// The resulting merge array
let result = [];

// Loop thorugh each file
files.forEach(fileName => {
  rl.write(`Merging ${fileName}...\r\n`);

  // Read in file contents
  let file = fs.readFileSync(`${sourceDirectory}/${fileName}`);
  // Convert the data to an array of entries
  file = file.toString().split('\r\n');

  // Save the size of the array
  let size = file.length;

  // Loop through each entry
  let i = 0;
  while (i < file.length) {
    rl.write(`(${i}/${size}) ${fileName}...\r\n`);

    // Delete the entry if it is empty
    if (file[i] === '') {
      file.splice(i, 1);
      i--;
    }

    // Delete the entry if it already exists in the merging array
    if (result.indexOf(file[i]) !== -1) {
      file.splice(i, 1);
      i--;
      size--;
      duplicates++;
    }

    i++;
  }

  // Merge the processed entries to the resulting array
  result = result.concat(file);
});

// Sort the entries
result = sortEntries(result);

// Save the resulting entries to the output file
fs.writeFileSync(args.output, result.join('\r\n'));

rl.write(`Done! Duplicates: ${duplicates}\r\n`);

// Close readline
rl.close();

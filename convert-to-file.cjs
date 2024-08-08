/* eslint-disable prettier/prettier */
import { readFile, writeFile } from 'fs'
// Define input and output file paths
const inputFilePath = './public_key.pem';
const outputFilePath = './public-key.txt';

// Read file and convert to Base64
readFile(inputFilePath, (err, data) => {
  if (err) throw err;
  const base64Content = data.toString('base64')
writeFile(outputFilePath, base64Content, (err) => {
    if (err) throw err;
    
  
console.log('File successfully converted to Base64!');
  });
});
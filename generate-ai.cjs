/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs/promises');
const path = require('path');
const fsSync = require('node:fs');
const readline = require('readline');
const { execSync } = require('child_process');

// Create readline interface to capture input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Default output path for the compiled file
const outputPath = path.join(__dirname, 'compiled-source.txt');

// Directories to ignore completely
const ignoreDirs = [
  path.join(__dirname, '.vscode'),
  // Add more directories to ignore as needed
];

// List of file extensions to ignore (e.g., SVGs, images, .DS_Store)
const ignoreExtensions = ['.svg', '.jpg', '.jpeg', '.png', '.gif', '.DS_Store'];

// Hardcoded set of relative paths (both directories and specific files) for Option 4
const hardcodedPaths = [
  'package.json',
  'src/manifest.json',
  'src/pages/Background/index.ts',
  'src/pages/Content/actions/show-update-notification.tsx',
  'src/pages/Content/index.tsx',
  'src/pages/Content/views/sharpen-overlay-button.tsx',
];

/**
 * Recursively retrieves all files from a directory, excluding ignored directories and file types.
 * @param {string} dirPath - The directory path to traverse (absolute path).
 * @param {Array<string>} arrayOfFiles - Accumulator for file paths.
 * @returns {Array<string>} - Array of file paths.
 */
const getAllFiles = function (dirPath, arrayOfFiles = []) {
  if (!fsSync.existsSync(dirPath)) {
    console.warn(`Directory does not exist and will be skipped: ${dirPath}`);
    return arrayOfFiles;
  }

  const files = fsSync.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);

    // Check if the file should be ignored (directories or extensions)
    const shouldIgnore =
      ignoreDirs.some((ignoreDir) => fullPath.startsWith(ignoreDir)) ||
      ignoreExtensions.some((ext) => fullPath.endsWith(ext));

    if (shouldIgnore) {
      continue;
    }

    if (fsSync.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
};

/**
 * Reads the contents of a file.
 * @param {string} filePath - The path to the file.
 * @returns {string} - The file contents.
 */
const getFileContents = function (filePath) {
  try {
    return fsSync.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(
      `Failed to read file and will be skipped: ${filePath}\nError: ${error.message}`
    );
    return '';
  }
};

/**
 * Compiles multiple files into output files with delimiters, splitting when content exceeds the maximum character limit.
 * @param {Array<string>} files - Array of file paths to compile.
 * @param {string} outputPath - The base path to the output file.
 */
const compileFiles = async function (files, outputPath) {
  let outputFileIndex = 1;
  let currentChars = 0;
  let currentContent = '';
  const maxChars = 1000000; // Maximum characters per output file
  const baseOutputPath = outputPath.replace(/\.txt$/, '');

  for (const filePath of files) {
    if (!fsSync.existsSync(filePath)) {
      console.warn(`File does not exist and will be skipped: ${filePath}`);
      continue;
    }

    const relativeFilePath = path.relative(__dirname, filePath);
    const contents = getFileContents(filePath);
    const fileContent = `\n\n--- START OF FILE: ${relativeFilePath} ---\n\n${contents}\n\n--- END OF FILE: ${relativeFilePath} ---\n\n`;
    const fileChars = fileContent.length;

    if (currentChars + fileChars > maxChars && currentContent !== '') {
      // Write currentContent to output file
      const outputFileName = `${baseOutputPath}-${outputFileIndex}.txt`;
      try {
        await fs.writeFile(outputFileName, currentContent, 'utf8');
        console.log(`Compiled part into ${outputFileName}`);
      } catch (error) {
        console.error('Error writing to output file:', error);
      }
      // Reset currentContent and currentChars
      outputFileIndex++;
      currentChars = 0;
      currentContent = '';
    }

    // If the fileContent itself exceeds maxChars, write it to a separate file
    if (fileChars > maxChars) {
      const outputFileName = `${baseOutputPath}-${outputFileIndex}.txt`;
      try {
        await fs.writeFile(outputFileName, fileContent, 'utf8');
        console.log(`Compiled large file into ${outputFileName}`);
      } catch (error) {
        console.error('Error writing to output file:', error);
      }
      outputFileIndex++;
      continue;
    }

    currentContent += fileContent;
    currentChars += fileChars;
  }

  // Write any remaining content
  if (currentContent !== '') {
    const outputFileName = `${baseOutputPath}-${outputFileIndex}.txt`;
    try {
      await fs.writeFile(outputFileName, currentContent, 'utf8');
      console.log(`Compiled part into ${outputFileName}`);
    } catch (error) {
      console.error('Error writing to output file:', error);
    }
  }
};

/**
 * Retrieves changed files between the 'main' branch and the current HEAD.
 * @returns {Array<string>} - Array of changed file paths.
 */
const getChangedFilesBetweenBranches = function () {
  try {
    const output = execSync('git diff --name-only main...HEAD', {
      encoding: 'utf8',
    });
    const files = output
      .split('\n')
      .filter(Boolean)
      .map((filePath) => path.resolve(filePath));
    return files;
  } catch (error) {
    console.error('Error getting changed files from git:', error);
    return [];
  }
};

/**
 * Retrieves all currently changed files (staged and unstaged).
 * @returns {Array<string>} - Array of changed file paths.
 */
const getAllChangedFiles = function () {
  try {
    // Get unstaged changes
    const output = execSync('git diff --name-only', { encoding: 'utf8' });
    // Get staged changes
    const stagedOutput = execSync('git diff --name-only --cached', {
      encoding: 'utf8',
    });
    const files = output
      .concat(`\n${stagedOutput}`)
      .split('\n')
      .filter(Boolean)
      .map((filePath) => path.resolve(filePath));
    return [...new Set(files)]; // Remove duplicates
  } catch (error) {
    console.error('Error getting changed files from git:', error);
    return [];
  }
};

/**
 * Determines whether a file should be ignored based on predefined rules.
 * @param {string} filePath - The path to the file.
 * @returns {boolean} - True if the file should be ignored; otherwise, false.
 */
const shouldIgnoreFile = function (filePath) {
  const shouldIgnore =
    ignoreDirs.some((ignoreDir) => filePath.startsWith(ignoreDir)) ||
    ignoreExtensions.some((ext) => filePath.endsWith(ext));

  return shouldIgnore;
};

/**
 * Determines whether a path is a directory.
 * @param {string} p - The path to check.
 * @returns {boolean} - True if directory; false otherwise.
 */
const isDirectory = function (p) {
  try {
    return fsSync.statSync(p).isDirectory();
  } catch (error) {
    console.warn(
      `Cannot access path and will be skipped: ${p}\nError: ${error.message}`
    );
    return false;
  }
};

/**
 * Writes a list of relative file paths to the output file.
 * @param {Array<string>} files - Array of absolute file paths.
 * @param {string} outputPath - The path to the output file.
 */
const writePathsToFile = async function (files, outputPath) {
  const relativePaths = files.map((filePath) =>
    path.relative(__dirname, filePath).replace(/\\/g, '/')
  );
  const content = relativePaths.join('\n') + '\n';

  try {
    await fs.writeFile(outputPath, content, 'utf8');
    console.log(`Written ${relativePaths.length} file paths to ${outputPath}`);
  } catch (error) {
    console.error('Error writing paths to output file:', error);
  }
};

// Start of the script: Prompt the user for an option
rl.question(
  `Select an option:
  1) Process a folder path
  2) Process changed files between branches
  3) Process all currently changed files
  4) Process hardcoded directory and file paths
  5) List changed file paths between branches
  6) List all currently changed file paths
Enter 1, 2, 3, 4, 5, or 6: `,
  (choice) => {
    switch (choice.trim()) {
      case '1': {
        rl.question(
          'Enter the folder path to process: ',
          async (folderPath) => {
            const absolutePath = path.resolve(folderPath);

            if (
              !fsSync.existsSync(absolutePath) ||
              !isDirectory(absolutePath)
            ) {
              console.error('The provided path is invalid or not a directory.');
              rl.close();
              return;
            }

            // Get all files from the specified folder
            let files = getAllFiles(absolutePath);

            // Filter out ignored files
            files = files.filter((filePath) => !shouldIgnoreFile(filePath));

            if (files.length === 0) {
              console.log(
                'No files to process in the specified folder after applying ignore rules.'
              );
              rl.close();
              return;
            }

            // Compile files into the output
            compileFiles(files, outputPath)
              .then(() => rl.close())
              .catch((error) => {
                console.error('Error during compilation:', error);
                rl.close();
              });
          }
        );
        break;
      }

      case '2': {
        // Option 2: Process changed files between branches
        console.log('Processing changed files between branches...');
        const files = getChangedFilesBetweenBranches();

        if (files.length === 0) {
          console.log('No changed files found between branches.');
          rl.close();
          return;
        }

        // Filter out ignored files
        const filteredFiles = files.filter(
          (filePath) => !shouldIgnoreFile(filePath)
        );

        // Filter out files that do not exist
        const existingFiles = filteredFiles.filter((filePath) =>
          fsSync.existsSync(filePath)
        );

        if (existingFiles.length === 0) {
          console.log(
            'No changed files to process after applying ignore rules.'
          );
          rl.close();
          return;
        }

        // Call the compile function with the list of files
        compileFiles(existingFiles, outputPath)
          .then(() => rl.close())
          .catch((error) => {
            console.error('Error during compilation:', error);
            rl.close();
          });

        break;
      }

      case '3': {
        // Option 3: Process all currently changed files
        console.log('Processing all currently changed files...');
        const files = getAllChangedFiles();

        if (files.length === 0) {
          console.log('No changed files found.');
          rl.close();
          return;
        }

        // Filter out ignored files
        const filteredFiles = files.filter(
          (filePath) => !shouldIgnoreFile(filePath)
        );

        // Filter out files that do not exist
        const existingFiles = filteredFiles.filter((filePath) =>
          fsSync.existsSync(filePath)
        );

        if (existingFiles.length === 0) {
          console.log(
            'No changed files to process after applying ignore rules.'
          );
          rl.close();
          return;
        }

        // Call the compile function with the list of files
        compileFiles(existingFiles, outputPath)
          .then(() => rl.close())
          .catch((error) => {
            console.error('Error during compilation:', error);
            rl.close();
          });

        break;
      }

      case '4': {
        // Option 4: Process hardcoded directory and file paths
        console.log('Processing hardcoded directory and file paths...');
        const relativePaths = hardcodedPaths;

        if (relativePaths.length === 0) {
          console.log('No hardcoded paths to process.');
          rl.close();
          return;
        }

        // Resolve relative paths to absolute paths
        const absolutePaths = relativePaths.map((p) =>
          path.resolve(__dirname, p)
        );

        // Gather all files from the specified paths
        let allFiles = [];
        for (const p of absolutePaths) {
          if (isDirectory(p)) {
            // If directory, get all files recursively
            const files = getAllFiles(p);
            allFiles = allFiles.concat(files);
          } else if (fsSync.existsSync(p) && fsSync.statSync(p).isFile()) {
            // If file, add directly if not ignored
            if (shouldIgnoreFile(p)) {
              console.log(`File is ignored and will be skipped: ${p}`);
            } else {
              allFiles.push(p);
            }
          } else {
            console.warn(
              `Path is neither a directory nor a valid file and will be skipped: ${p}`
            );
          }
        }

        // Remove duplicates
        allFiles = [...new Set(allFiles)];

        if (allFiles.length === 0) {
          console.log(
            'No files found in the specified paths after applying ignore rules.'
          );
          rl.close();
          return;
        }

        // Call the compile function with the list of files
        compileFiles(allFiles, outputPath)
          .then(() => rl.close())
          .catch((error) => {
            console.error('Error during compilation:', error);
            rl.close();
          });

        break;
      }

      case '5': {
        // Option 5: List changed file paths between branches
        console.log('Listing changed file paths between branches...');
        const files = getChangedFilesBetweenBranches();

        if (files.length === 0) {
          console.log('No changed files found between branches.');
          rl.close();
          return;
        }

        // Filter out ignored files
        const filteredFiles = files.filter(
          (filePath) => !shouldIgnoreFile(filePath)
        );

        // Filter out files that do not exist
        const existingFiles = filteredFiles.filter((filePath) =>
          fsSync.existsSync(filePath)
        );

        if (existingFiles.length === 0) {
          console.log(
            'No changed files found between branches after applying ignore rules.'
          );
          rl.close();
          return;
        }

        // Write the list of relative file paths to the output file
        writePathsToFile(existingFiles, outputPath)
          .then(() => rl.close())
          .catch((error) => {
            console.error('Error writing paths to file:', error);
            rl.close();
          });

        break;
      }

      case '6': {
        // Option 6: List all currently changed file paths
        console.log('Listing all currently changed file paths...');
        const files = getAllChangedFiles();

        if (files.length === 0) {
          console.log('No changed files found.');
          rl.close();
          return;
        }

        // Filter out ignored files
        const filteredFiles = files.filter(
          (filePath) => !shouldIgnoreFile(filePath)
        );

        // Filter out files that do not exist
        const existingFiles = filteredFiles.filter((filePath) =>
          fsSync.existsSync(filePath)
        );

        if (existingFiles.length === 0) {
          console.log('No changed files found after applying ignore rules.');
          rl.close();
          return;
        }

        // Write the list of relative file paths to the output file
        writePathsToFile(existingFiles, outputPath)
          .then(() => rl.close())
          .catch((error) => {
            console.error('Error writing paths to file:', error);
            rl.close();
          });

        break;
      }

      default: {
        console.log('Invalid choice. Please enter 1, 2, 3, 4, 5, or 6.');
        rl.close();
      }
    }
  }
);

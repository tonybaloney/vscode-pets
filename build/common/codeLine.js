"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCount = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
let currentLineCount = 0;
const lineCounts = {};
function getCppFiles(dir) {
    const cppFiles = [];
    function readDirRecursively(currentDir) {
        const files = fs.readdirSync(currentDir);
        files.forEach(file => {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                readDirRecursively(filePath);
            }
            else if (filePath.endsWith('.cpp') || filePath.endsWith('.h')) {
                cppFiles.push(filePath);
            }
        });
    }
    readDirRecursively(dir);
    return cppFiles;
}
function countLinesInFiles(files) {
    files.forEach(file => {
        const fileContent = fs.readFileSync(file, 'utf-8');
        const lines = fileContent.split('\n').length;
        lineCounts[file] = lines;
    });
}
function countCodeLine() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        const dirPath = workspaceFolders[0].uri.fsPath;
        const cppFiles = getCppFiles(dirPath);
        countLinesInFiles(cppFiles);
        const totalLines = sumLineCounts(lineCounts);
        return totalLines;
    }
    else {
        return -1;
    }
}
function sumLineCounts(lineCounts) {
    return Object.values(lineCounts).reduce((sum, count) => sum + count, 0);
}
function updateCount() {
    const lineCount = countCodeLine();
    if (lineCount > currentLineCount) {
        currentLineCount = lineCount;
        const updateEvent = new CustomEvent("update-line-count", { detail: currentLineCount });
        document.dispatchEvent(updateEvent);
    }
}
exports.updateCount = updateCount;
//# sourceMappingURL=codeLine.js.map
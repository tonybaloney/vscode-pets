import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';


let currentLineCount = 0;

const lineCounts: { [file: string]: number } = {};

function getCppFiles(dir: string): string[] {
    const cppFiles: string[] = [];
    
    function readDirRecursively(currentDir: string) {
        const files = fs.readdirSync(currentDir);

        files.forEach(file => {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                readDirRecursively(filePath);
            } else if (filePath.endsWith('.cpp') || filePath.endsWith('.h')) {
                cppFiles.push(filePath);
            }
        });
    }

    readDirRecursively(dir);
    return cppFiles;
}

function countLinesInFiles(files: string[]) {

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
        } else {
            return -1;
        }
}

function sumLineCounts(lineCounts: { [key: string]: number }): number {
    return Object.values(lineCounts).reduce((sum, count) => sum + count, 0);
}

export function updateCount() {
    const lineCount = countCodeLine();
    const diff = lineCount - currentLineCount;
    if (lineCount > currentLineCount) {
        currentLineCount = lineCount;
    }
    console.log("updaing the line count as ", currentLineCount);
    return diff;
}
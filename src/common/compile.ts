import * as vscode from 'vscode';


export function doCompile() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        if (document.languageId === 'cpp') {
            const filePath = document.fileName;
            createTerminalAndCompile(filePath);
            const result = runCompilationTask(filePath);
            return result;
        } else {
            console.log("Not C++ file");
            return null;
        }
    } else {
        console.log("No active editor");
        return null;
    }
}


function createTerminalAndCompile(filePath: string) {
    const terminal = vscode.window.createTerminal('Compilation Terminal');
    terminal.show();
    terminal.sendText(`g++ -o output ${filePath} && ./output`);
}

async function runCompilationTask(filePath: string): Promise<number> {
    return new Promise((resolve, reject) => {
        const task = new vscode.Task(
            { type: 'shell' },
            vscode.TaskScope.Workspace,
            'Compile',
            'shell',
            new vscode.ShellExecution(`g++ -o output ${filePath}`),
            ['$cpp-compile-errors']
        );


        // Hide the terminal
        task.presentationOptions = {
            reveal: vscode.TaskRevealKind.Never,
            echo: true,
            focus: false,
            panel: vscode.TaskPanelKind.Dedicated,
            showReuseMessage: false,
            clear: true
        };

        const disposable = vscode.tasks.onDidEndTaskProcess((e) => {
            if (e.execution.task.name === 'Compile') {
                disposable.dispose();  // Clean up the event listener
                if (e.exitCode === 0) {
                    resolve(0);
                } else {
                    resolve(1);
                }
            }
        });

        vscode.tasks.executeTask(task).then(undefined, reject);
    });
}

import * as vscode from 'vscode';

// Create header guard command
export default function () {
    const CODE = "protected:\n\tstatic void _bind_methods();\n"
    if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.selection) {
        var activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            var selections = activeEditor.selections;
            selections = selections.sort((a:vscode.Selection, b: vscode.Selection) => a.start.isAfter(b.start) ? 1 : -1);
            let selection : any;
            while (selection = selections.shift()) {
                let pos = activeEditor.document.offsetAt(selection.start)
                vscode.window.activeTextEditor.insertSnippet(new vscode.SnippetString(CODE), activeEditor.document.positionAt(pos));
            }
        }
    }
}

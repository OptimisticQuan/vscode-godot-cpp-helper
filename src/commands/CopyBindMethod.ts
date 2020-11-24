import * as vscode from 'vscode';
import Container from '../Container';

/**
 * Copy to clipboard implementation command
 */
export default function () {
    const TEMPLATE = "void classType::_bind_methods() {\n\n\n}\n"
    if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.selection) {
        if (vscode.window.activeTextEditor) {
            var activeEditor = vscode.window.activeTextEditor;
            var selections = activeEditor.selections;
            let imp = "";
            let selection : any;
            let code = activeEditor.document.getText();
            let container = new Container(code);
            while (selection = selections.shift()) {
                let classDetails = container.findClass(activeEditor.document.offsetAt(selection.start));

                if (classDetails) { // If was null then selection is not a c++ function declration
                    imp += '\n' + TEMPLATE.replace(/classType/g, classDetails.name) + '\n';
                }
            }

            if (imp.length > 0) {
                vscode.env.clipboard.writeText(imp);
            }
        }
    }
}

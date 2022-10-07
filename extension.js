// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
// const async = require('async');

let fileCount = [];
let directoryCount = [];
let directoryIndex = 0;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "helloworld-minimal-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable1 = vscode.commands.registerCommand('extension.hieCmd1', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World! from VS');
	});

	let disposable2 = vscode.commands.registerCommand('extension.hieCmd2', () => {
		vscode.window.showInformationMessage('We are testing second command');
		console.log(vscode.env.appName);
		console.log(vscode.env.sessionId);
		var nDate = new Date();
		console.log(nDate.toUTCString());
		directoryCount.push(vscode.workspace.rootPath);
		let directryData = vscode.workspace.fs.readDirectory(vscode.Uri.file(directoryCount[directoryIndex]));
		directryData.then(function (value) {
			for (var i = 0; i < value.length; i++) {
				let data = value[i];
				console.log(data[0], data[1]);
				if (data[1] == 1) {
					fileCount.push(directoryCount[directoryIndex] + '/' +  data[0]);
				}
				else if (data[1] == 2) {
					directoryCount.push(directoryCount[directoryIndex] + '/' + data[0]);
				}
			}
		});
	});

	let disposable3 = vscode.commands.registerCommand('extension.hieCmd3', () => {
		let message = 'File(s): ' + fileCount.length + ' Folder(s): ' + directoryCount.length;
		console.log('Printing Files and Folders');
		fileCount.forEach(function(item) {
			console.log(item);
		});
		directoryCount.forEach(function(item) {
			console.log(item);
		});
		vscode.window.showInformationMessage(message);
	});

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}

function scanDirectory(directoryAddress) {

}

// this method is called when your extension is deactivated
function deactivate() { }

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}
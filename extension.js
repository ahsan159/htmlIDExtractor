// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
// const async = require('async');

let fileCount = [];
let htmlCount = [];
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
		addItem(directoryCount, vscode.workspace.rootPath);
		let directryData = vscode.workspace.fs.readDirectory(vscode.Uri.file(directoryCount[directoryIndex]));
		directryData.then(function (value) {
			// this first loop will scan the top level directory
			for (var i = 0; i < value.length; i++) {
				let data = value[i];
				console.log(data[0], data[1]);
				if (data[1] == 1) {
					addItem(fileCount, directoryCount[directoryIndex] + '/' + data[0]);
				}
				else if (data[1] == 2) {
					addItem(directoryCount, directoryCount[directoryIndex] + '/' + data[0]);
				}
			}
			let subDir2 = [];
			subDir2[directoryIndex] = directryData;
			for (var i = directoryIndex + 1; i < directoryCount.length; i++) {
				subDir2[i] = vscode.workspace.fs.readDirectory(vscode.Uri.file(directoryCount[i]));
			}			//console.log(subDir2);
			var directoryCountLevel1 = directoryCount.length;
			Promise.all(subDir2).then(function (value) {
				for (var i = 1; i < directoryCountLevel1; i++) {
					//console.log(directoryCount[i], value[i]);
					let rDir = directoryCount[i];
					let subDirs = value[i];
					console.log(subDirs, i);
					subDirs.forEach(function (data) {
						try {
							if (data[1] == 1) {
								addItem(fileCount, rDir + '/' + data[0]);
							}
							else if (data[1] == 2) {
								addItem(directoryCount, rDir + '/' + data[0]);
							}
						}
						catch (exp) {
							console.log(exp, i);
						}
					});
				}
				console.log(subDir2);
				console.log('Promise concludion in loop');
			});
			console.log('Promise conclusion');
		});
	});

	let disposable3 = vscode.commands.registerCommand('extension.hieCmd3', () => {
		let message = 'File(s): ' + fileCount.length + ' Folder(s): ' + directoryCount.length;
		console.log('Printing Files and Folders');
		fileCount.forEach(function (item) {
			console.log(item);
		});
		directoryCount.forEach(function (item) {
			console.log(item);
		});
		vscode.window.showInformationMessage(message);
	});

	let disposable4 = vscode.commands.registerCommand('extension.insert1', () => {
		const editor = vscode.window.activeTextEditor;
		const doc = editor.document;
		editor.edit((editBuilder) => {
			editBuilder.insert("my string");
		});
	});

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
	context.subscriptions.push(disposable4);
}

function scanDirectory(directoryAddress) {

}

function addItem(array, item) {
	if (array.indexOf(item) == -1) {
		array.push(item);
	}
	return array;
}

// this method is called when your extension is deactivated
function deactivate() { }

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}
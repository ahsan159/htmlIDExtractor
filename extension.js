// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
// const async = require('async');

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
	let disposable = vscode.commands.registerCommand('extension.hieCmd1', () => {
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
		let fileCount = [];
		let directoryCount = [];
		directoryCount.push(vscode.workspace.rootPath);
		/*
		let directoryData = vscode.workspace.fs.readDirectory(vscode.Uri.file(vscode.workspace.rootPath));
		// let totalCount = 0;
		directoryData.then(function (value) {
			totalCount = value.length;
			for (let i = 0; i < value.length; i++) {
				let directoryEntry = value[i];
				console.log(directoryEntry[0]);
				if (directoryEntry[1] == 1) {
					fileCount.push(directoryEntry[0])
				}
				if (directoryEntry[1] == 2) {
					directoryCount.push(vscode.workspace.rootPath + '/' + directoryEntry[0]);
				}
			}
		*/
		console.log('Total Directories: ' + directoryCount.length);

		let item = directoryCount[0];
		let directoryData = vscode.workspace.fs.readDirectory(vscode.Uri.file(item));
		directoryData.then(function (value) {
			for (let i = 0; i < value.length; i++) {
				let directoryEntry = value[i];
				//console.log(directoryEntry[0]);
				if (directoryEntry[1] == 1) {
					fileCount.push(item + '/' + directoryEntry[0])
				}
				if (directoryEntry[1] == 2) {
					directoryCount.push(item + '/' + directoryEntry[0]);
				}
				// console.log(directoryCount.length);
			}
		}).then(function () {
			// console.log(fileCouremnt.length);
			// console.log(directoryCount.length);
			let message = 'Files: ' + fileCount.length + ', Folders: ' + directoryCount.length;
			console.log(message);
			// vscode.window.showInformationMessage(message);
			for (let dIndex = 0; dIndex < directoryCount.length; dIndex++) {
				let item = directoryCount[dIndex];
				let directoryData = vscode.workspace.fs.readDirectory(vscode.Uri.file(item));
				directoryData.then(function (value) {
					for (let i = 0; i < value.length; i++) {
						let directoryEntry = value[i];
						if (directoryEntry[1] == 1) {
							fileCount.push(item + '/' + directoryEntry[0])
						}
						if (directoryEntry[1] == 2) {
							directoryCount.push(item + '/' + directoryEntry[0]);
						}
						//console.log(directoryEntry[0]);
						// console.log(directoryCount.length);
					}
				});
			}
		});
		await(function () {
			// console.log(fileCount);
			// console.log(directoryCount);
			let message = 'Files: ' + fileCount.length + ', Folders: ' + directoryCount.length;
			console.log(message);
			// vscode.window.showInformationMessage(message);
		});
		await(function () {
			let message = 'Files: ' + fileCount.length + ', Folders: ' + directoryCount.length;
			console.log(message);
			fileCount.forEach(function (item) {
				if (item.endsWith('.html')) {
					console.log("HTMLFILE", item);
				}
			});
		});

	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
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
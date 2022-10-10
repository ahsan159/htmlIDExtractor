# Lesson Learned
## vscode api (07-Oct-2022)
1. Using file system in javascript requires complete line of code 'vscode.workspace.fs' then remaining functions of filesystem can be accessed.
2. To access any path we need to use 'vscode.Uri.file($PATH)'.
## Async Nature of javascript/Node.js (07-Oct-2022)
3. Async nature of node.js is proving pain in the ass really. As i am failed to find any method myself and on internet to correctly synchronize these async processes. Furthermore, iteration and recursion is not providing any good results while using async nature promises which return thenable results.  

## Promise.all([array_of_promises]).then(function(value){});
4. This function saved the lot of confusion. Furthermore, what it does actually is that the process that ran in parallel are now processed serially by collecting their output data. This will resolve async nature of javascript without introducing async and await keywords. This function is only used because vscode.workspace.fs.readDirectory does not return absolute path of files and folders. Otherwise, no serialization of processes is required.

# ToDo List
1. Read the directory done. (Up to second level directories and file list is read successfully. 10-10-2022.)
2. configure intelliscense to insert some basic strings in javascript files.
3. read html ID from file.
4. insert some ID's in js file.
5. finalize the code.
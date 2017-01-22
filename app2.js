var readlineSync = require('readline-sync');
var exit = false;
var menu = [
    'Print current folder',
    'Change current folder',
    'Create file or folder',
    'Delete file or folder',
    'Search in file or folder',
    'Quit Program'
];

/* this will be the storage for our file system */
var fsStorage = [
    [0, 0, 'root'],
    [1, 0, 'subfolder1'],
    [2, 0, 'subfolder2'],
    [3, 0, 'subfolder3'],
    [4, 1, 'subfolder4'],
    [5, 4, 'subfolder5'],
    [6, 5, 'file1', 'content1'],
    [7, 5, 'file2', 'content2']
];

var currentFolder = 0;
var lastDir = 0;

main();

function main() {
    while (!exit) {
        printMenu();
        //   console.log(fsStorage);
    }
    process.exit(0);
}

function printMenu() {
    var answer = readlineSync.keyInSelect(menu, 'Please make your choice:');
    switch (answer) {
        case 0:
            printCurrentFolder();
            break;
        case 1:
            changeCurrentFolder();
            break;
        case 2:
            createFileOrFolder();
            break;
        case 3:
            deleteFileOrFolder();
            break;
        case 4:
            searchInFileOrFolder();
            break;
        case 5:
            quitProgram();
            break;
    }
}

function printCurrentFolder() {

    console.log('printing current folder');
    printParent(currentFolder);

    /* todo: implement hierarcial folder and file printing at current folder  */
    for (var i = 0; i < fsStorage.length; i++) { // pass on entire array

        if (fsStorage[i][1] == currentFolder) { //if 
            if (currentFolder != fsStorage[i][0])
                console.log("--" + fsStorage[i][2]);
        }
    }
}

function changeCurrentFolder() {
    var found = 0;
    console.log('changing current folder');
    /* todo: implement cli to move in all directions  */

    var folderName = readlineSync.question('type the name of the folder to change to:(or .. to move up) ');

    if (folderName == "..") {
        if (currentFolder == 0) {
            console.log("error can not go above root");
            return;
        }
        console.log("moved one level up");
        // currentFolder = lastDir;
        currentFolder = getParent(currentFolder);
        return;
    }

    for (var i = 0; i < fsStorage.length; i++) {
        if (fsStorage[i][2] === folderName) /// find a file or a dir with that name
            if (fsStorage[i][1] == currentFolder) // find that it is a son
                if (fsStorage[i].length != 4) { //find that it is a folder and not a file
                lastDir = currentFolder;
                currentFolder = fsStorage[i][0]; //move to new currentFolder index




                found = 1;
                return;
            }
    }
    if (found === 0)
        console.log("Error no such directory or you tried a file name");

}

function createFileOrFolder() {

    /* todo: implement additon of file/folder to file system array   */
    var folderName = readlineSync.question('creating a file or a folder? (type file or folder)');
    if (folderName === "folder") {
        var folderName = readlineSync.question('type the name of the folder to create:');
        fsStorage.push([fsStorage.length, currentFolder, folderName]);
        console.log("folder: " + folderName + " created!");
        return;
    }
    if (folderName === "file") {

        var folderName = readlineSync.question('type the name of the file to create:');
        var content = readlineSync.question('type the content of the file:');
        fsStorage.push([fsStorage.length, currentFolder, folderName, content]);
        console.log("file: " + folderName + " created!");
        return;

    } else { console.log("wrong option"); }
}

function deleteFileOrFolder() {
    console.log('delete file folder');
    var folderName = readlineSync.question('type the name of the file or folder to delete:');
    console.log(folderName);
    if ((folderName) == "root") {
        console.log("Error can not erase root");
        return;
    }


    for (var i = 0; i < fsStorage.length; i++) {
        if (fsStorage[i][2] == folderName)
            if (currentFolder == fsStorage[i][1])
                fsStorage.splice(i, 1);
    }

    while (fixTree()) {

    }
}

function searchInFileOrFolder() {
    console.log('searching current files folder');
    /* todo: implement search across all folders by name and content  */
}

function quitProgram() {
    var answer = readlineSync.keyInYNStrict('Are you sure?');
    exit = answer ? true : false;
}


function printParent(child) {
    for (var i = 0; i < fsStorage.length; i++) {
        if (fsStorage[i][0] === child)
            console.log("-" + fsStorage[i][2]);
    }
}

function getParent(child) {
    for (var i = 0; i < fsStorage.length; i++) {
        if (fsStorage[i][0] === child)
            return fsStorage[i][1];
    }
}


function fixTree() {
    for (var i = 0; i < fsStorage.length; i++)
        if (orphan(fsStorage[i][1])) {

            fsStorage.splice(i, 1);
            return 1;
        }

    return 0;
}

function orphan(numb) {

    for (var i = 0; i < fsStorage.length; i++) {
        if (fsStorage[i][0] == numb)
            return 0;
    }

    return 1;


}
export let pages = {};
const fs = require('fs');
let pageDoneCount = 0;
fs.readdir(`${__dirname}/pages/`, function(error, filelist){
    for (let i = 0; i < filelist.length; i++) {
        import(`./pages/${filelist[i]}/index.js`)
        .then((m) => { 
            pages[filelist[i]] = m;
            m.init(filelist[i]);
            ++pageDoneCount;
            if(filelist.length == pageDoneCount) {
                onready();
            }
        })
    }
})

let onready;
export function setOnReady(callback) {
    onready = callback
}

const config = require("../config.js");
let lastPage;

export function close() {
    if(lastPage) {
        lastPage.close();
    }
}

export function open(name) {

    if(lastPage) {
        lastPage.close();
    }
    pages[name].open();
    lastPage = pages[name];
}
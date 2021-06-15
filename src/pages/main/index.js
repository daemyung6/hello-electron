let NAME;
let DIR
let main;
const pages = document.getElementById('pages');

import * as ui from "../../ui.js";

export function init(name) {
    NAME = name
    DIR = `./pages/${name}/src`

    main = document.createElement('div');
    main.classList.add(name);
    main.classList.add('page');
    
    pages.appendChild(main);

    let style = document.createElement('style');
    style.innerHTML = /*css*/`
        .${NAME} .background {

        }
    `
    document.head.appendChild(style);
}
export function open() {
    render();
    main.classList.add('select-page');


}
export function close() {
    main.classList.remove('select-page');
}

function render() {
    main.innerHTML = /*html*/`

    `
}
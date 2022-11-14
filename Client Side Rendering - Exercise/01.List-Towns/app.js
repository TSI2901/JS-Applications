import {html, render} from "./node_modules/lit-html/lit-html.js";

let root = document.getElementById(`root`);
let form = document.getElementsByTagName(`form`)[0];
form.addEventListener(`submit`, onSubmit)

function onSubmit(e) {
    e.preventDefault();
    const towns = (form.querySelector('input').value).split(', ');
    let result = createTown(towns);
    render(result,root);
}
function createTown(towns) {
    return html`<ul>
        ${towns.map(t => html`<li>${t}</li>`)}
    </ul>`;
}

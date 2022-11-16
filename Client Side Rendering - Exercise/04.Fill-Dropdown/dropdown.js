import {html, render} from "./node_modules/lit-html/lit-html.js";
let url = 'http://localhost:3030/jsonstore/advanced/dropdown';
let menu = document.getElementById('menu');
let form = document.querySelector('form');
form.addEventListener('submit',onSubmit)

await showItems();
async function showItems() {
    let data = await getData();
    let result = Object.values(data).map(x => html` <option value="${x._id}">${x.text}</option>`)
    render(result,menu);
}
async function addItem(input) {
    await fetch(url,{
        method: `POST`,
        headers: {"Content-type": `application/json`},
        body: JSON.stringify({text: input})
    })
}
async function onSubmit(e) {
    e.preventDefault();
    let input = document.getElementById('itemText').value;
    await addItem(input);
    document.getElementById('itemText').value ="";
    await showItems();
}
async function getData(){
    let responce = await fetch(url);
    let data =await responce.json();
    return data;
}
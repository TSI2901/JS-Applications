import {html, render} from "./node_modules/lit-html/lit-html.js";
import {towns} from "./towns.js";

let townList = document.getElementById('towns');
let result = makeTowns();
render(result,townList)

function makeTowns() {
   return html`<ul>
      ${towns.map(t => html`<li>${t}</li>`)}
   </ul>`
}
document.querySelector('button').addEventListener('click',search)
function search() {
   let searched = document.getElementById('searchText').value;
   let list = Array.from(townList.children[0].children);
   let count = 0;
   list.forEach(li => {
      if (li.textContent.includes(searched)){
         li.setAttribute('class','active')
         count++;
      }
      else {
         li.removeAttribute('class','active')
      }
   })
   document.querySelector('#result').textContent = `${count} matches found`;
}

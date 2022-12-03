import {html} from "../api/lib.js";
import {get} from "../api/api.js";

const catalogTemplate = (offers) => html`
    <section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">
            ${offers.length === 0 ? html`<h2>There are no albums added yet.</h2>` : offers.map(x => offerTemplate(x))}
            <!-- Display a li with information about every post (if any)-->
            
        </ul>

       
        
    </section>
`
function offerTemplate(offer) {
    return html`
        <li class="card">
            <img src="${offer.imageUrl}" alt="travis" />
            <p>
                <strong>Singer/Band: </strong><span class="singer">${offer.singer}</span>
            </p>
            <p>
                <strong>Album name: </strong><span class="album">${offer.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${offer.sales}</span></p>
            <a class="details-btn" href="/catalog/${offer._id}">Details</a>
        </li>
    `
}
export async function showCatalog(ctx) {
    let offers = await get(`/data/albums?sortBy=_createdOn%20desc`);
    ctx.render(catalogTemplate(offers));
}
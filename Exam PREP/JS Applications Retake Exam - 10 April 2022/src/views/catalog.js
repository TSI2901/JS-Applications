import {html} from "../api/lib.js";
import {get} from "../api/api.js";

const catalogTemplate = (offers) => html`
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>
        <div class="all-posts">
            ${offers.length === 0 ? html`<h1 class="title no-posts-title">No posts yet!</h1>`:offers.map(x => offerTemplate(x))}
        </div>
    </section>
`;
function offerTemplate(offer) {
    return html`
        <div class="post">
            <h2 class="post-title">${offer.title}</h2>
            <img class="post-image" src="${offer.imageUrl}" alt="Material Image">
            <div class="btn-wrapper">
                <a href="/details/${offer._id}" class="details-btn btn">Details</a>
            </div>
        </div>
    `
}
export async function showCatalog(ctx) {
    let offers = await get(`/data/posts?sortBy=_createdOn%20desc`);
    ctx.render(catalogTemplate(offers));
}
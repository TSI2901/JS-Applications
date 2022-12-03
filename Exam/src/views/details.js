import {html, nothing} from "../api/lib.js";
import {del, get} from "../api/api.js";
import {getLikes, getOwnLikes, like} from "../api/BONUS-like.js";


const detailsTemplate = (offer, isUser, isOwner, canLike, likes, onDelete, onLike) => html`<!-- Details page -->
<section id="details">
      <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
          <img src="${offer.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
          <p><strong>Band:</strong><span id="details-singer">${offer.singer}</span></p>
          <p>
            <strong>Album name:</strong><span id="details-album">${offer.album}</span>
          </p>
          <p><strong>Release date:</strong><span id="details-release">${offer.release}</span></p>
          <p><strong>Label:</strong><span id="details-label">${offer.label}</span></p>
          <p><strong>Sales:</strong><span id="details-sales">${offer.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${likes}</span></div>
        ${detailsController(offer, isUser, isOwner, canLike,onDelete,onLike)}
        <!--Edit and Delete are only for creator-->
        
      </div>
    </section>
`;

function detailsController(offer, isUser, isOwner, canLike, onDelete, onLike) {
    if (isUser === false) {
        return nothing;
    }
    if (isOwner) {
        return html`
            <div id="action-buttons">
                <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                <a @click="${onDelete}" href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>`
    }
    if (isUser && canLike) {
        return html`
            <div id="action-buttons">
                <a @click="${onLike}" href="javascript:void(0)" id="apply-btn">Like</a>
            </div>`
    }
}

export async function showDetails(ctx) {
    let id = ctx.params.id;

    const request = [
        get(`/data/albums/${id}`),
        getLikes(id),
    ]

    let isUser = Boolean(ctx.user);

    if (ctx.user) {
        request.push(getOwnLikes(id, ctx.user._id));
    }

    const [offer, likes, hasLiked] = await Promise.all(request);

    let isOwner = isUser && ctx.user._id === offer._ownerId;
    const canLike = !isOwner && hasLiked === 0;
    ctx.render(detailsTemplate(offer, isUser, isOwner, canLike, likes, onDelete, onLike));

    async function onDelete() {
        const choice = confirm();
        if (choice){
            await del(`/data/albums/${id}`);
            ctx.page.redirect(`/catalog`);
        }

    }

    async function onLike() {
        await like(id);
        ctx.page.redirect(`/catalog/${id}`);
    }
}
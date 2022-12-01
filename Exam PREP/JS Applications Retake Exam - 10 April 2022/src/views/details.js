import {html,nothing} from "../api/lib.js";
import {get, del} from "/src/api/api.js"

const detailsTemplate = (post, isUser, isOwner, onDelete) => html`
    <!-- Details Page -->
    <section id="details-page">
        <h1 class="title">Post Details</h1>

        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src="${post.imageUrl}" alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${post.title}</h2>
                    <p class="post-description">Description: ${post.description}</p>
                    <p class="post-address">Address: ${post.address}</p>
                    <p class="post-number">Phone number: ${post.phone}</p>
                    <p class="donate-Item">Donate Materials: 0</p>
                    <div class="btns">

                        ${btnController(onDelete,isOwner,isUser,post)}
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
`

function btnController(onDelete, isOwner, isUser, post) {
    if (isOwner) {
        return html`
            <a class="edit-btn btn" href="/edit/${post._id}">Edit</a>
            <a class="delete-btn btn" @click="${onDelete}" href="javascript:void(0)">Delete</a>
        
        `
    }
}

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const book = await get(`/data/posts/${id}`);
    let isOwner = false;
    let isUser = false;
    if (ctx.user) {
        isUser = true;
        if (book._ownerId === ctx.user._id) {
            isOwner = true;
        }
    }

    async function onDelete() {
        const choice = confirm();
        if (choice) {
            await del(`/data/posts/${id}`);
            ctx.page.redirect(`/catalog`);
        }
    }

    ctx.render(detailsTemplate(book, isUser, isOwner, onDelete));
}
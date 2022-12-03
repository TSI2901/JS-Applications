import {html} from "../api/lib.js";
import {createSubmitHandler} from "../api/util.js";
import {get, put} from "../api/api.js";

const editTemplate = (offer, onEdit) => html`
    <!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
      <div class="form">
        <h2>Edit Album</h2>
        <form @submit="${onEdit}" class="edit-form">
          <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value="${offer.singer}"/>
          <input type="text" name="album" id="album-album" placeholder="Album" .value="${offer.album}"/>
          <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value="${offer.imageUrl}"/>
          <input type="text" name="release" id="album-release" placeholder="Release date" .value="${offer.release}"/>
          <input type="text" name="label" id="album-label" placeholder="Label" .value="${offer.label}"/>
          <input type="text" name="sales" id="album-sales" placeholder="Sales" .value="${offer.sales}"/>
    
          <button type="submit">post</button>
        </form>
      </div>
    </section>
`;

export async function showEdit(ctx) {
    let id = ctx.params.id;
    let offer = await get(`/data/albums/${id}`)
    console.log(offer);
    ctx.render(editTemplate(offer, createSubmitHandler(onEdit)));

    async function onEdit({
                              singer,
                              album,
                              imageUrl,
                              release,
                              label,
                              sales
                          }
    ) {
        if (singer === "" || imageUrl === "" || album === "" || release === "" || label === "" || sales === "") {
            return alert(`All fields are required`);
        }
        await put(`/data/albums/${id}`, {
            singer,
            album,
            imageUrl,
            release,
            label,
            sales
        });
        ctx.page.redirect(`/catalog/${id}`);
    }
}
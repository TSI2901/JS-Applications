import {get, post} from "./api.js";

export async function like(offerId) {

        return post(`/data/likes`, {
        offerId
    });
}
export async function getLikes(petId) {
    return get(`/data/likes?where=albumId%3D%22${petId}%22&distinct=_ownerId&count`);
}
export async function getOwnLikes(offerId,userId) {
    return get(`/data/likes?where=albumId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

import {html, render, page} from "../api/lib.js";
import {getUserData} from "../api/util.js";
import {logout} from "../api/user.js";

let header = document.getElementsByTagName(`header`)[0];

const navTemplate = (user, navController) => html`
    <h1><a href="/">Orphelp</a></h1>

<nav>
    <a href="/catalog">Dashboard</a>

    <!-- Logged-in users -->
    ${navController(user)}
</nav>
`;

function navController(user) {
    if (user){
        return html
            `
                <div id="user">
                    <a href="/myPosts">My Posts</a>
                    <a href="/create">Create Post</a>
                    <a @click="${onLogout}" href="javascript:void(0)">Logout</a>
                </div>
            `;
    }
    else{
        return html
            `
                <!-- Guest users -->
                <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>  
            `;
    }
}
async function onLogout(){
    await logout();
    showNav();
    page.redirect(`/catalog`);//TO CATALOG
}

export function showNav() {
    let user = getUserData();

    render(navTemplate(user, navController), header)
}
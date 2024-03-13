import {postRequest, getRequest, putRequest} from "@/services/axios.service";

// Fonction pour l'authentification d'un utilisateur
async function signInWithAPI(userData) {
    return postRequest(`/authapi/auth/signin`, userData, 'SIGNIN');
}

// Fonction pour récupérer les informations de l'utilisateur par login
async function getUserInfoFromAPI(login) {
    return getRequest(`/authapi/user/getuser/${login}`, 'GETUSERINFO');
}

async function updateHeroWithAuthAPI(heroData) {
    return putRequest(`/herocorp/heroes/authupdate`, heroData, 'UPDATEHERO');
}


async function registerUserWithAPI(userData) {
    return postRequest(`/authapi/user/register`, userData, 'REGISTER');
}

// Fonction pour enregistrer un nouvel utilisateur
async function registerUser(userData) {
    let response = await registerUserWithAPI(userData);
    // Gérer la logique supplémentaire si nécessaire, comme la gestion des erreurs
    return response;
}

async function signIn(userData) {
    let response = await signInWithAPI(userData);
    return response;
}

async function getUserInfo(login) {
    let response = await getUserInfoFromAPI(login);
    // Logique supplémentaire si nécessaire
    return response;
}

async function updateHeroWithAuth(heroData) {
    let response = await updateHeroWithAuthAPI(heroData);
    // Logique supplémentaire si nécessaire, comme la gestion des erreurs ou la confirmation de la mise à jour
    return response;
}

export {
    signIn,
    getUserInfo,
    updateHeroWithAuth,
    registerUser
};

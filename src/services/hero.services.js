import { getRequest, postRequest, putRequest } from "@/services/axios.service";

// Fonctions interactant directement avec l'API pour les héros
async function getAllHeroesFromAPI() {
    return getRequest('/herocorp/heroes/getaliases', 'GETALLHEROES');
}

async function createHeroFromAPI(heroData) {
    // heroData doit être un objet avec le format { publicName: ..., realName: ..., powers: [...], : ... }
    return postRequest(`/herocorp/heroes/create`, heroData, 'CREATEHERO');
}

async function updateHeroFromAPI(heroData) {
    // Assurez-vous que heroData contient au moins le champ _id
    if (!heroData || !heroData._id) {
        throw new Error('Hero data must contain _id field');
    }

    return putRequest(`/herocorp/heroes/update`, heroData, 'UPDATEHERO');
}

async function getHeroByIdFromAPI(heroId) {
    // Ajouter org-secret dans l'URL
    return getRequest(`/herocorp/heroes/getbyid/${heroId}`, 'GETHEROBYID');
}

// Fonctions de niveau supérieur pour les héros
async function getAllHeroes() {
    let response = await getAllHeroesFromAPI();
    // Logique supplémentaire si nécessaire
    return response;
}

async function createHero(heroData) {
    let response = await createHeroFromAPI(heroData);
    // Logique supplémentaire si nécessaire
    return response;
}

async function updateHero(heroData) {
    let response = await updateHeroFromAPI(heroData);
    // Logique supplémentaire si nécessaire
    return response;
}

async function getHeroById(heroId ) {
    let response = await getHeroByIdFromAPI(heroId);
    // Logique supplémentaire si nécessaire
    return response;
}

export {
    getAllHeroes,
    createHero,
    updateHero,
    getHeroById,
};

import { getRequest, postRequest, patchRequest } from "@/services/axios.service";

// Fonctions interactant directement avec l'API
async function getTeamsFromAPI() {
    return getRequest('/herocorp/teams/get', 'GETTEAMS');
}

async function createTeamFromAPI(name) {
    let data = {
        name: name
    };
    return postRequest('/herocorp/teams/create', data, 'CREATETEAM');
}

async function addHeroesToTeamFromAPI(teamId, heroIds) {
    let data = {
        idTeam: teamId,
        idHeroes: heroIds
    };
    return patchRequest('/herocorp/teams/addheroes', data, 'ADDHEROESTOTEAM');
}

async function removeHeroesFromTeamFromAPI(teamId, heroIds) {
    let data = {
        idTeam: teamId,
        idHeroes: heroIds
    };
    return patchRequest('/herocorp/teams/removeheroes', data, 'REMOVEHEROESFROMTEAM');
}

// Fonctions de niveau supérieur
async function getTeams() {
    let response = await getTeamsFromAPI();
    // Ajoutez ici toute logique supplémentaire si nécessaire
    return response;
}

async function createTeam(name) {
    let response = await createTeamFromAPI(name);
    // Ajoutez ici toute logique supplémentaire si nécessaire
    return response;
}

async function addHeroesToTeam(teamId, heroIds) {
    let response = await addHeroesToTeamFromAPI(teamId, heroIds);
    // Ajoutez ici toute logique supplémentaire si nécessaire
    return response;
}

async function removeHeroesFromTeam(teamId, heroIds) {
    let response = await removeHeroesFromTeamFromAPI(teamId, heroIds);
    // Ajoutez ici toute logique supplémentaire si nécessaire
    return response;
}

export {
    getTeams,
    createTeam,
    addHeroesToTeam,
    removeHeroesFromTeam,
};

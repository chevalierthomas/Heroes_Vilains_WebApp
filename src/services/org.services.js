import { getRequest, postRequest, patchRequest } from "@/services/axios.service";

// Fonctions interactant directement avec l'API pour les organisations
async function getOrgsFromAPI() {
    return getRequest('/herocorp/orgs/get', 'GETORGS');
}

async function createOrgFromAPI(orgData) {
    return postRequest('/herocorp/orgs/create', orgData, 'CREATEORG');
}

async function addTeamToOrgFromAPI(teamId) {
    let data = { idTeam: teamId };
    // Ajouter org-secret dans l'URL
    return patchRequest(`/herocorp/orgs/addteam`, data, 'ADDTEAMTOORG');
}


async function removeTeamFromOrgFromAPI(teamId) {
    let data = { idTeam: teamId };
    // Ajouter org-secret dans l'URL
    return patchRequest(`/herocorp/orgs/removeteam`, data, 'REMOVETEAMFROMORG');
}


async function getOrgByIdFromAPI(orgId) {
    // Ajouter org-secret dans l'URL
    return getRequest(`/herocorp/orgs/getbyid/${orgId}`, 'GETORGBYID');
}


// Fonctions de niveau supérieur pour les organisations
async function getOrgs() {
    let response = await getOrgsFromAPI();
    // Logique supplémentaire si nécessaire
    return response;
}

async function createOrg(name, secret) {
    // Créer l'objet orgData directement dans la fonction
    const orgData = { name, secret };
    let response = await createOrgFromAPI(orgData);
    // Logique supplémentaire si nécessaire
    return response;
}

async function addTeamToOrg(teamId) {
    let response = await addTeamToOrgFromAPI(teamId);
    // Logique supplémentaire si nécessaire
    return response;
}

async function removeTeamFromOrg(teamId) {
    let response = await removeTeamFromOrgFromAPI(teamId);
    // Logique supplémentaire si nécessaire
    return response;
}

async function getOrgById(orgId) {
    let response = await getOrgByIdFromAPI(orgId);
    // Logique supplémentaire si nécessaire
    return response;
}

export {
    getOrgs,
    createOrg,
    addTeamToOrg,
    removeTeamFromOrg,
    getOrgById,
};

const API_KEY = "XgRhCt8SeSNE0fWID0nBqW2RKeE";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

async function getStatus(e){
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok){
        displayStatus(data);
    }else{
        throw new Error(data.error);
    }
}

function displayStatus(data){
    document.getElementById("resultsModalTitle").innerText = "API Key Status";
    document.getElementById("results-content").innerHTML = `
    <div>Your key is valid until</div>
    <div class = "key-status">${data.expiry}</div>`;

    resultModal.show()
}
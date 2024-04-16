const API_KEY = "XgRhCt8SeSNE0fWID0nBqW2RKeE";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultModal = new bootstrap.Modal(document.getElementById("resultsModal"));
/*

GET method = wired up our Check  Key button and got the status from the API.  

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
*/

// POST METHOD


document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));


function processOptions(form){
    // this makes the option have value with comma separated
    let optArray = []

    for (let entry of form.entries()){
        if(entry[0] === "options"){
            optArray.push(entry[1]);
        }
    }
    form.delete("options");
    form.append("options", optArray.join());
    return form
}


async function postForm(e){
    const form = processOptions(new FormData(document.getElementById("checksform"))); // FormData: captures all data in the form and returns it as object
    
    
    /*
    Check if the form input is displayed 

    for (let entry of form.entries()){
        console.log(entry)
    }
    */

    const response = await fetch(API_URL,{
                                        method: "post",
                                        headers: {
                                            "Authorization": API_KEY,
                                        },
                                        body: form,
    })

    const data = await response.json()
    if(response.ok){
        displayErrors(data);
    }else{
        displayException(data);
        throw new Error(data.error);
    }
}

function displayErrors(data){
    let heading = `JSHint Results fot ${data.file}`;

    if(data.total_errors === 0){
        results =  `<div class="no_errors">No errors reported.</div>`;
    }else{
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`
        for(let error of data.error_list){
            results += `<div>At line <span class="line">${error.line}</span>, 
                        column <span class="column">${error.col}</span></div>`
            results += `<div class="error">${error.error}</div>`
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    resultModal.show()
}

async function getStatus(e){
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok){
        displayStatus(data);
    }else{
        displayException(data);
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


function displayException(data){
    document.getElementById("resultsModalTitle").innerText = "An Exception Occured"
    document.getElementById("results-content").innerHTML = `
    <div>The API retured status code ${data.status_code}<br>
    Error number: ${data.error_no}<br>
    Error text: ${data.error}</div>
    `

    resultModal.show()
}
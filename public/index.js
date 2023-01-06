console.log("hello")

let login = document.getElementById("login");
let dashboard = document.getElementById("dashboard");
let username = document.getElementById("username");
let password = document.getElementById("password");
let content = document.getElementById("content");

login.addEventListener("click", () => {
    console.log("Login is here");
    fetch('http://localhost:3300/api/v1/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            let { token } = data;
            localStorage.clear();
            localStorage.setItem("token", token);
        })

    username.value = "";
    password.value = "";
})

dashboard.addEventListener("click", () => {

    let tokenId = localStorage.getItem("token");
    
    fetch('http://localhost:3300/api/v1/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenId}`,
        }
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        content.innerText = data.msg;
    })
})


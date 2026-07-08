// 🌍 GLOBAL
let selectedLocation = "";
let map;
let marker;

// SAFE GET
function get(id) {
    return document.getElementById(id);
}

// 🔔 TOAST
function showToast(msg) {
    alert(msg);
}

// 🗺️ MAP (ONLY ONE INIT)
window.addEventListener("load", function () {

    const mapDiv = get("map");
    if (!mapDiv) return;

    map = L.map('map').setView([12.9716, 77.5946], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(map);

    const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });

    map.on("click", function (e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        selectedLocation = lat.toFixed(5) + "," + lng.toFixed(5);

        if (marker) map.removeLayer(marker);

        marker = L.marker([lat, lng], { icon }).addTo(map);

        get("output").innerText = "📍 " + selectedLocation;

        console.log("LOCATION:", selectedLocation);
    });
});

// 🔐 SIGNUP
// ================= AUTH SYSTEM =================

// 🔐 SIGN UP
function signup() {
    const user = get("newUser").value;
    const pass = get("newPass").value;

    if (!user || !pass) {
        alert("Fill all fields");
        return;
    }

    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: user,
            password: pass
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message || data.error);
        if (!data.error) showLogin();
    })
    .catch(err => {
        alert("Signup failed");
        console.log(err);
    });
}

// 🔐 LOGIN
function login() {
    const user = get("loginUser").value;
    const pass = get("loginPass").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: user,
            password: pass
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert("Login success");
            window.location.href = "main.html";
        }
    })
    .catch(err => {
        alert("Login failed");
        console.log(err);
    });
}

// 🔄 SWITCH UI
function showLogin() {
    document.getElementById("signupBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

function showSignup() {
    document.getElementById("signupBox").style.display = "block";
    document.getElementById("loginBox").style.display = "none";
}
// 🔥 REGISTER LAND (FIXED)
function registerLand() {
    const id = get("id").value;
    const owner = get("owner").value;

    if (!id || !owner || !selectedLocation) {
        alert("Fill all fields + click map");
        return;
    }

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id,
            owner,
            location: selectedLocation   // ✅ FIXED
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(JSON.stringify(data));
    });
}


// 🔍 QUERY
function queryLand() {
    const id = get("queryId").value;

    fetch(`http://localhost:3000/land/${id}`)
    .then(res => res.json())
    .then(data => {
        get("output").innerText =
            JSON.stringify(data, null, 2);
    });
}


// 🔄 TRANSFER (FIXED)
function transfer() {
    const id = get("tid").value;
    const newOwner = get("newOwner").value;

    if (!id || !newOwner) {
        alert("Fill all fields");
        return;
    }

    fetch("http://localhost:3000/transfer", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id,
            newOwner   // ✅ FIXED
        })
    })
    .then(res => res.json())
    .then(data => {
        get("output").innerText = data.message;
    });
}

function showSection(id) {

    document.getElementById("registerSection").style.display = "none";
    document.getElementById("searchSection").style.display = "none";
    document.getElementById("transferSection").style.display = "none";

    document.getElementById(id).style.display = "block";

    // 🔥 init map when opening register
    if (id === "registerSection") {
        setTimeout(initMap, 100);
    }
}


function goHome() {
    document.getElementById("home").style.display = "block";
    document.getElementById("registerSection").style.display = "none";
    document.getElementById("searchSection").style.display = "none";
    document.getElementById("transferSection").style.display = "none";
    document.getElementById("aboutSection").style.display = "none";
}

function showSection(id) {

    document.getElementById("home").style.display = "none";
    document.getElementById("registerSection").style.display = "none";
    document.getElementById("searchSection").style.display = "none";
    document.getElementById("transferSection").style.display = "none";
    document.getElementById("aboutSection").style.display = "none";

    document.getElementById(id).style.display = "block";
}
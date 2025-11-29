function login() {
    const email = document.getElementById("email").value;
    const password= document.getElementById("password").value;

    if(email === "admin@gmail.com" && password=== "admin1234") {
        alert("Login sucess");
        window.location.href="admin.html";
    }else {
        alert("Wrong email or password");
    }
}

let vehicles = [];

function addFleet() {
    const regNo =document.getElementById("regNo of vehicle").value;
    const category = document.getElementById("category").value;
    const driver =document.getElementById("driver").value;
    const available = document.getElementById("available").value;

    if (!regNo || !driver ) {
        alert("All fields are required");
        return;
    }

    vehicles.push({
        regNo: regNo,
        category: category,
        driver: driver,
        available: available
    });

    renderCards(vehicles);

    document.getElementById("regNo").value="";
    document.getElementById("driver").value="";

}

function renderCards(data) {
    const cards = document.getElementById("cards");
    cards.innerHTML="";
    data.forEach((v, index) => {
        const card =document.getElementById("div");
        card.style.border="1px solid black";
        card.style.padding="10px";
        card.style.margin="10px";

        card.innerHTML=`
          <p><b>Reg No:</b> $(v.regNo)</p>
          <p><b>Category:</b> $(v.category)</p>
          <p><b>Driver:</b> $(v.driver)</p>
          <p><b>Status:</b> $(v.available)</p>

          <button onclick="updateDriver(${index})">Update Driver</button>
          <button onclick="toggleAvailability(${index})">Change Availability</button>
          <button onclick="deleteVehicle(${index})">Delete</button>
          

        `;
        cards.appendChild(card);
        
        

    });

}

function updateDriver(index) {
    const newName = prompt("Enter new driver name");
    if(!newName || newName.trim()===""){
        alert("Driver name cannot be empty");
        return;
    }
    vehicle[index].driver =newName;
    renderCards(vehicles);
}

function toggleAvailability(index) {
    vehicles[index].available=vehicles[index].available=== "Available" ? "Unavailable": "Available";
    renderCards(vehicles);
}

function deleteVehicle(index){
    const confirmDelete=confirm("Are you sure?");
    if(confirmDelete) {
        vehicles.splice(index,1);
        renderCards(vehicles);
    }
}

function filterFleet(){
    const filterCategory =document.getElementById("filterCategory").value;
    const filterAvailability =document.getElementById("filterAvailabiltiy").value;

    let filtered =vehicles.filter(v =>{
        return(
            (filterCategory === "All" || v.category===filterCategory)&&(filterAvailability==="All"|| v.available===filterAvailability)
        );
    });
    renderCards(filtered)
}

function clearFilter() {
    document.getElementById("filterCategory").value="All";
    document.getElementById("filterAvailability").value="All";
    renderCards(vehicles);

}
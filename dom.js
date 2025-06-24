function addStationElement(station) {
    const list = document.getElementById("station-list");
    const div = document.createElement("div");
    div.className = "station";
    div.innerHTML = `
      <h3>${station.name}</h3>
      <p><strong>Location:</strong> ${station.location}</p>
      <p><strong>Type:</strong> ${station.type}</p>
    `;
    list.appendChild(div);
  }
  
// Initialize the map
var map = L.map('map').setView([13.7563, 100.5018], 12); // Set Bangkok coordinates as default

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Example markers
var condoIcon = L.icon({
    iconUrl: 'condo-icon.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38]
});

L.marker([13.7563, 100.5018], { icon: condoIcon })
    .addTo(map)
    .bindPopup("คอนโดใจกลางกรุงเทพ");

// Handle Floating Action Button (FAB) click
document.querySelector('.fab-button').addEventListener('click', function() {
    alert("เพิ่มทรัพย์สินใหม่!");
    // You can add more functionality here, such as opening a modal form
});

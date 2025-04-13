// script.js
// Initialize the map
var map = L.map('map').setView([13.7563, 100.5018], 12); // Center on Bangkok

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Sample properties (mock data)
var properties = [
    { lat: 13.7563, lng: 100.5018, title: "คอนโดใจกลางเมือง", type: "condo", price: "฿2,500,000" },
    { lat: 13.7600, lng: 100.5100, title: "บ้านเดี่ยวสไตล์โมเดิร์น", type: "house", price: "฿5,000,000" },
    { lat: 13.7400, lng: 100.5200, title: "ที่ดินพร้อมสร้าง", type: "land", price: "฿3,000,000" },
];

// Create markers and store them in an array
var markers = [];
properties.forEach(function(property) {
    var marker = L.marker([property.lat, property.lng])
        .bindPopup(`${property.title} (${property.price})`)
        .addTo(map);
    marker.type = property.type; // Add type to marker for filtering
    markers.push(marker);
});

// Filter function
document.getElementById('type-filter').addEventListener('change', function() {
    var selectedType = this.value;

    markers.forEach(function(marker) {
        if (selectedType === 'all' || marker.type === selectedType) {
            marker.addTo(map); // Show marker
        } else {
            map.removeLayer(marker); // Hide marker
        }
    });
});
// Initialize the map
var map = L.map('map').setView([13.7563, 100.5018], 12); // Set Bangkok coordinates as default

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Example markers
var properties = [
    { lat: 13.7563, lng: 100.5018, type: 'condo', title: 'คอนโดใจกลางกรุงเทพ' },
    { lat: 13.7600, lng: 100.5100, type: 'house', title: 'บ้านเดี่ยวสไตล์โมเดิร์น' },
    { lat: 13.7400, lng: 100.5200, type: 'land', title: 'ที่ดินพร้อมสร้าง' }
];

var markers = [];
properties.forEach(function(property) {
    var marker = L.marker([property.lat, property.lng])
        .bindPopup(property.title)
        .addTo(map);
    marker.type = property.type; // Add type to marker for filtering
    markers.push(marker);
});

// Filter function
document.getElementById('type-filter').addEventListener('change', function() {
    var selectedType = this.value;

    markers.forEach(function(marker) {
        if (selectedType === 'all' || marker.type === selectedType) {
            map.addLayer(marker); // Show marker
        } else {
            map.removeLayer(marker); // Hide marker
        }
    });
});

// Toggle sidebar
document.getElementById('menu-toggle').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
});

// Open property form when FAB is clicked
document.querySelector('.fab-button').addEventListener('click', function() {
    document.getElementById('property-form').style.display = 'block';
});

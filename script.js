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

// Open property form when FAB is clicked
document.querySelector('.fab-button').addEventListener('click', function() {
    document.getElementById('property-form').style.display = 'block';
});

// Handle form submission
document.getElementById('property-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    var title = document.getElementById('title').value.trim();
    var type = document.getElementById('type').value;
    var price = parseFloat(document.getElementById('price').value);
    var lat = parseFloat(document.getElementById('lat').value);
    var lng = parseFloat(document.getElementById('lng').value);

    // Validate inputs
    if (!title || !type || isNaN(price) || isNaN(lat) || isNaN(lng)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    // Add new property marker
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`${title} (${type}) - ${price.toLocaleString()} บาท`);

    // Reset form
    document.getElementById('property-form').reset();
    document.getElementById('property-form').style.display = 'none'; // Hide form after submission
});

// Remove property
function removeProperty(marker) {
    map.removeLayer(marker);
}

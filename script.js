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
});

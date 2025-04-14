// Initialize the map
var map = L.map('map').setView([13.7563, 100.5018], 12); // Set Bangkok coordinates as default

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load properties from LocalStorage
let properties = JSON.parse(localStorage.getItem('properties')) || [
    { lat: 13.7563, lng: 100.5018, type: 'condo', title: 'คอนโดใจกลางกรุงเทพ', price: 5000000, phone: '0123456789', showPhone: true, imageUrl: '' },
    { lat: 13.7600, lng: 100.5100, type: 'house', title: 'บ้านเดี่ยวสไตล์โมเดิร์น', price: 8000000, phone: '0987654321', showPhone: false, imageUrl: '' },
    { lat: 13.7400, lng: 100.5200, type: 'land', title: 'ที่ดินพร้อมสร้าง', price: 3000000, phone: '0812345678', showPhone: true, imageUrl: '' }
];

// Initialize markers
var markers = [];
properties.forEach(function (property) {
    var marker = L.marker([property.lat, property.lng])
        .bindPopup(`
            <div style="text-align: center;">
                ${property.imageUrl ? `<img src="${property.imageUrl}" alt="Property Image" width="100%">` : ''}
                <p>${property.title} (${property.type}) - ${property.price.toLocaleString()} บาท</p>
                ${property.showPhone && property.phone ? `<p>เบอร์ผู้ขาย: ${property.phone}</p>` : ''}
                <p>พิกัด: ${property.lat}, ${property.lng}</p>
            </div>
        `)
        .addTo(map);
    marker.type = property.type;
    markers.push(marker);
});

// Filter function
document.getElementById('type-filter').addEventListener('change', function () {
    var selectedType = this.value;

    markers.forEach(function (marker) {
        if (selectedType === 'all' || marker.type === selectedType) {
            map.addLayer(marker);
        } else {
            map.removeLayer(marker);
        }
    });
});

// Variables for geolocation
let currentLat = null;
let currentLng = null;

// Function to get current location
function getCurrentLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLat = position.coords.latitude;
                currentLng = position.coords.longitude;
                callback(true);
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("ไม่สามารถดึงตำแหน่งปัจจุบันได้ กรุณาเปิดการเข้าถึงตำแหน่งหรือเลือกโหมดระบุด้วยตัวเอง");
                callback(false);
            }
        );
    } else {
        alert("เบราว์เซอร์ของคุณไม่รองรับ Geolocation");
        callback(false);
    }
}

// Toggle location mode
document.getElementById('location-mode').addEventListener('change', function () {
    const manualLocationDiv = document.getElementById('manual-location');
    if (this.value === 'auto') {
        manualLocationDiv.style.display = 'none';
        getCurrentLocation((success) => {
            if (!success) {
                this.value = 'manual';
                manualLocationDiv.style.display = 'block';
            }
        });
    } else {
        manualLocationDiv.style.display = 'block';
        currentLat = null;
        currentLng = null;
    }
});

// Open property form when FAB is clicked
document.querySelector('.fab-button').addEventListener('click', function () {
    document.getElementById('property-form').style.display = 'block';
});

// Cancel form button
document.getElementById('cancel-form').addEventListener('click', function () {
    document.getElementById('property-form').reset();
    document.getElementById('property-form').style.display = 'none';
    currentLat = null;
    currentLng = null;
});

// Handle form submission
document.getElementById('property-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const type = document.getElementById('type').value;
    const price = parseFloat(document.getElementById('price').value);
    const phone = document.getElementById('phone').value.trim();
    const showPhone = document.getElementById('show-phone').checked;
    const locationMode = document.getElementById('location-mode').value;
    let lat, lng;

    if (locationMode === 'auto') {
        if (currentLat === null || currentLng === null) {
            alert("ไม่สามารถดึงตำแหน่งปัจจุบันได้ กรุณาเลือกโหมดระบุด้วยตัวเอง");
            return;
        }
        lat = currentLat;
        lng = currentLng;
    } else {
        lat = parseFloat(document.getElementById('lat').value);
        lng = parseFloat(document.getElementById('lng').value);
    }

    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    if (!title || !type || isNaN(price) || isNaN(lat) || isNaN(lng)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน (ยกเว้นเบอร์ผู้ขายที่สามารถเว้นว่างได้)");
        return;
    }

    // Compress and store image
    if (imageFile) {
        new Compressor(imageFile, {
            quality: 0.6,
            success(compressedResult) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageUrl = e.target.result;

                    // Add new property
                    const newProperty = { title, type, price, phone, showPhone, lat, lng, imageUrl };
                    properties.push(newProperty);
                    localStorage.setItem('properties', JSON.stringify(properties));

                    // Add marker to map
                    const marker = L.marker([lat, lng])
                        .bindPopup(`
                            <div style="text-align: center;">
                                <img src="${imageUrl}" alt="Property Image" width="100%">
                                <p>${title} (${type}) - ${price.toLocaleString()} บาท</p>
                                ${showPhone && phone ? `<p>เบอร์ผู้ขาย: ${phone}</p>` : ''}
                                <p>พิกัด: ${lat}, ${lng}</p>
                            </div>
                        `)
                        .addTo(map);
                    marker.type = type;
                    markers.push(marker);

                    // Reset form
                    document.getElementById('property-form').reset();
                    document.getElementById('property-form').style.display = 'none';
                    currentLat = null;
                    currentLng = null;
                };
                reader.readAsDataURL(compressedResult);
            },
            error(err) {
                console.error('Compression error:', err);
                alert("เกิดข้อผิดพลาดในการบีบอัดภาพ กรุณาลองใหม่อีกครั้ง");
            },
        });
    } else {
        // Add property without image
        const newProperty = { title, type, price, phone, showPhone, lat, lng, imageUrl: '' };
        properties.push(newProperty);
        localStorage.setItem('properties', JSON.stringify(properties));

        const marker = L.marker([lat, lng])
            .bindPopup(`
                <div style="text-align: center;">
                    <p>${title} (${type}) - ${price.toLocaleString()} บาท</p>
                    ${showPhone && phone ? `<p>เบอร์ผู้ขาย: ${phone}</p>` : ''}
                    <p>พิกัด: ${lat}, ${lng}</p>
                </div>
            `)
            .addTo(map);
        marker.type = type;
        markers.push(marker);

        document.getElementById('property-form').reset();
        document.getElementById('property-form').style.display = 'none';
        currentLat = null;
        currentLng = null;
    }
});

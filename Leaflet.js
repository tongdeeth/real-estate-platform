<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real Estate Platform</title>
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <style>
        /* Basic Styling */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        header {
            background: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px 0;
        }
        #filters {
            margin: 10px auto;
            width: 90%;
            text-align: center;
        }
        #map {
            height: 80vh; /* แผนที่ครอบคลุม 80% ของหน้าจอ */
            width: 100%;
        }
        footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 10px 0;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <h1>PropertyPin</h1>
        <p>Find your dream property on the map!</p>
    </header>

    <!-- Filter Section -->
    <div id="filters">
        <label for="type-filter">Filter by Type:</label>
        <select id="type-filter">
            <option value="all">All</option>
            <option value="condo">Condo</option>
            <option value="house">House</option>
            <option value="land">Land</option>
        </select>
    </div>

    <!-- Map Section -->
    <div id="map"></div>

    <!-- Footer -->
    <footer>
        <p>&copy; 2023 PropertyPin. All rights reserved.</p>
    </footer>

    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
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
    </script>
</body>
</html>
<!-- Property Listing Form -->
<form id="property-form" style="display: none;">
    <h2>ลงประกาศทรัพย์สิน</h2>
    <label for="title">
        <i class="fas fa-heading"></i> ชื่อทรัพย์สิน:
    </label>
    <input type="text" id="title" name="title" placeholder="ใส่ชื่อทรัพย์สิน">

    <label for="type">
        <i class="fas fa-tag"></i> ประเภท:
    </label>
    <select id="type" name="type">
        <option value="condo"><i class="fas fa-building"></i> คอนโด</option>
        <option value="house"><i class="fas fa-home"></i> บ้านเดี่ยว</option>
        <option value="land"><i class="fas fa-tree"></i> ที่ดิน</option>
    </select>

    <label for="price">
        <i class="fas fa-dollar-sign"></i> ราคา:
    </label>
    <input type="number" id="price" name="price" placeholder="ใส่ราคา">

    <label for="lat">
        <i class="fas fa-globe-asia"></i> Latitude:
    </label>
    <input type="number" step="any" id="lat" name="lat" placeholder="ใส่ละติจูด">

    <label for="lng">
        <i class="fas fa-map-marker-alt"></i> Longitude:
    </label>
    <input type="number" step="any" id="lng" name="lng" placeholder="ใส่ลองจิจูด">

    <button type="submit">
        <i class="fas fa-plus"></i> เพิ่มทรัพย์สิน
    </button>
</form>

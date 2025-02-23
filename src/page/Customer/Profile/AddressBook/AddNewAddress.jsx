import { useState, useEffect } from "react";

const AddNewAddress = ({ onClose, defaultValues }) => {
  const [form, setForm] = useState(
    defaultValues || {
      name: "",
      phone: "",
      city: "",
      district: "",
      ward: "",
      address: "",
      default: false,
    }
  );

  const [errors, setErrors] = useState({});

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setCities(sortLocations(data)));
  }, []);

  const sortLocations = (list) => {
    return list.sort((a, b) => a.name.localeCompare(b.name, 'vi', { numeric: true }));
  };

  const handleCityChange = (e) => {
    const cityCode = e.target.value;
    setForm((prev) => ({ ...prev, city: cityCode, district: "", ward: "" }));
    fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => setDistricts(sortLocations(data.districts || [])));
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setForm((prev) => ({ ...prev, district: districtCode, ward: "" }));
    fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => setWards(sortLocations(data.wards || [])));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.name || form.name.length < 2 || form.name.length > 50) {
      newErrors.name = "Độ dài phải từ 2 - 50 kí tự.";
    }
    if (!form.phone) {
      newErrors.phone = "Thông tin bắt buộc.";
    }
    if (!form.city) {
      newErrors.city = "Thông tin bắt buộc.";
    }
    if (!form.district) {
      newErrors.district = "Thông tin bắt buộc.";
    }
    if (!form.ward) {
      newErrors.ward = "Thông tin bắt buộc.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form hợp lệ, gửi dữ liệu...");
    }
  };

  useEffect(() => {
    if (form.city && form.district && form.ward && form.address) {
      const query = `${form.address}, ${form.ward}, ${form.district}, ${form.city}, Vietnam`;
      const encodedQuery = encodeURIComponent(query);
      setMapUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyC5A_iOQRQTz-XsPeqz0nQByVZCpGlG10o&q=${encodedQuery}`);
    }
  }, [form]);

  return (
    <div className="p-6 bg-white w-full max-w-full border rounded-md">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Tên:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Số điện thoại:</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Tỉnh/Thành phố:</label>
          <select
            name="city"
            value={form.city}
            onChange={handleCityChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Vui lòng chọn tỉnh/thành phố</option>
            {cities.map((city) => (
              <option key={city.code} value={city.code}>{city.name}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Quận/Huyện:</label>
          <select
            name="district"
            value={form.district}
            onChange={handleDistrictChange}
            className="w-full border p-2 rounded"
            disabled={!form.city}
          >
            <option value="">Vui lòng chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>{district.name}</option>
            ))}
          </select>
          {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Phường/Xã:</label>
          <select
            name="ward"
            value={form.ward}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            disabled={!form.district}
          >
            <option value="">Vui lòng chọn phường/xã</option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>{ward.name}</option>
            ))}
          </select>
          {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Địa chỉ nhận hàng:</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
       
      </div>
      {mapUrl && (
        <div className="mt-4">
          <iframe
            title="Google Map"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={mapUrl}
            allowFullScreen
          ></iframe>
        </div>
      )}
      
      <div className="mt-4">
            <div className="flex items-center gap-1"> 
            <input id="defaultAddress" type="checkbox" name="default" checked={form.default} onChange={handleChange} className="w-4 h-4"/>
            <label htmlFor="defaultAddress" className="text-sm cursor-pointer">Đặt làm địa chỉ mặc định</label>
            </div>
       <div className="flex justify-end space-x-2 mt-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            Hủy
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
            Cập nhật
            </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddress;

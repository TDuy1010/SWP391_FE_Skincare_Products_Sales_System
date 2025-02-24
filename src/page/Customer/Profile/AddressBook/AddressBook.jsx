import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react"; 
import AddNewAddress from "./AddNewAddress";

const AddressBook = () => {
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Tuấn Anh",
      phone: "123456789",
      city: "79",
      district: "769",
      ward: "26830",
      address: "Vinhomes Grand Park Origami S7.03",
      default: true,
    },
    {
      id: 2,
      name: "Tuấn Em",
      phone: "0123456789",
      city: "79",
      district: "769",
      ward: "26831",
      address: "Vinhomes Grand Park Origami S7.03",
      default: false,
    },
  ]);

  const [locationData, setLocationData] = useState({
    cities: [],
    districts: [],
    wards: [],
  });

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch("https://provinces.open-api.vn/api/p/");
      const data = await response.json();
      setLocationData((prev) => ({ ...prev, cities: data }));
    };
    fetchCities();
  }, []);

  const fetchDistricts = async (cityCode) => {
    if (!cityCode) return;
    const response = await fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`);
    const data = await response.json();
    setLocationData((prev) => ({ ...prev, districts: data.districts || [] }));
  };

  const fetchWards = async (districtCode) => {
    if (!districtCode) return;
    const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
    const data = await response.json();
    setLocationData((prev) => ({ ...prev, wards: data.wards || [] }));
  };

  const getCityName = (code) => {
    const city = locationData.cities.find(c => c.code.toString() === code);
    return city ? city.name : code;
  };

  const getDistrictName = (code) => {
    const district = locationData.districts.find(d => d.code.toString() === code);
    return district ? district.name : code;
  };

  const getWardName = (code) => {
    const ward = locationData.wards.find(w => w.code.toString() === code);
    return ward ? ward.name : code;
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleEdit = async (addr) => {
    setEditForm(addr);
    setShowForm(true);

    await fetchDistricts(addr.city); 
    await fetchWards(addr.district);  
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditForm(null);
  };

  const handleAddAddress = (newAddress) => {
    setAddresses((prevAddresses) => {
      const updatedAddresses = newAddress.default
        ? prevAddresses.map((addr) => ({ ...addr, default: false }))
        : prevAddresses;
      return [...updatedAddresses, { ...newAddress, id: prevAddresses.length + 1 }];
    });

    handleCloseForm();
  };

  const handleUpdateAddAddress = (updatedAddress) => {
    setAddresses((prevAddresses) => {
      return prevAddresses.map((addr) =>
        addr.id === updatedAddress.id
          ? { ...updatedAddress }
          : updatedAddress.default
          ? { ...addr, default: false }
          : addr
      );
    });

    handleCloseForm();
  };

  return (
    <div className="p-6 bg-white w-full max-w-full">
      {showForm ? (
        <AddNewAddress
          onClose={handleCloseForm}
          defaultValues={editForm}
          onAddAddress={editForm ? handleUpdateAddAddress : handleAddAddress}
          onCityChange={fetchDistricts}
          onDistrictChange={fetchWards}
        />
      ) : (
        <>
          <div className="border rounded-md p-4 bg-gray-50">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="border-b last:border-0 p-4 flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold text-green-800 flex items-center gap-1">
                    {addr.name} - {addr.phone}
                    {addr.default && (
                      <span className="text-yellow-500 font-medium"> - Địa chỉ mặc định</span>
                    )}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {addr.address}, {getWardName(addr.ward)}, {getDistrictName(addr.district)}, {getCityName(addr.city)}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    className="text-green-600 font-medium hover:underline"
                    onClick={() => handleEdit(addr)}
                  >
                    Chỉnh sửa
                  </button>
                  {addresses.length > 1 && (
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(addr.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
           {/* Thêm địa chỉ mới */}
          <div className="mt-6 px-0 flex items-center justify-end w-full">
            <p className="text-gray-700 px-2">Bạn muốn giao hàng đến địa chỉ khác?</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800"
            >
              Thêm địa chỉ mới
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressBook;

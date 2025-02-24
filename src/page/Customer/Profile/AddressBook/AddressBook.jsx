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
    districts: {},
    wards: {},
  });

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch("https://provinces.open-api.vn/api/p/");
      const data = await response.json();
      setLocationData((prev) => ({ ...prev, cities: data }));
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchAllDistrictsAndWards = async () => {
      let allDistricts = {};
      let allWards = {};

      const citiesResponse = await fetch("https://provinces.open-api.vn/api/p/");
      const citiesData = await citiesResponse.json();

      for (const city of citiesData) {
        const districtsResponse = await fetch(`https://provinces.open-api.vn/api/p/${city.code}?depth=2`);
        const districtsData = await districtsResponse.json();
        allDistricts[city.code] = districtsData.districts || [];

        for (const district of districtsData.districts || []) {
          const wardsResponse = await fetch(`https://provinces.open-api.vn/api/d/${district.code}?depth=2`);
          const wardsData = await wardsResponse.json();
          allWards[district.code] = wardsData.wards || [];
        }
      }

      setLocationData((prev) => ({ ...prev, districts: allDistricts, wards: allWards }));
    };

    fetchAllDistrictsAndWards();
  }, []);

  const getCityName = (code) => {
    const city = locationData.cities.find(c => c.code.toString() === code);
    return city ? city.name : code;
  };

  const getDistrictName = (cityCode, districtCode) => {
    const districts = locationData.districts[cityCode] || [];
    const district = districts.find(d => d.code.toString() === districtCode);
    return district ? district.name : districtCode;
  };

  const getWardName = (districtCode, wardCode) => {
    const wards = locationData.wards[districtCode] || [];
    const ward = wards.find(w => w.code.toString() === wardCode);
    return ward ? ward.name : wardCode;
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleEdit = (addr) => {
    setEditForm(addr);
    setShowForm(true);
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
        />
      ) : (
        <>
          <div className="border rounded-md p-4 bg-gray-50">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="border-b last:border-0 p-4 flex justify-between items-start"
              >
                <div className="w-full max-w-[80%]">
                  <p className="font-semibold text-green-800 flex items-center gap-1">
                    {addr.name} - {addr.phone}
                    {addr.default && (
                      <span className="text-yellow-500 font-medium"> - Địa chỉ mặc định</span>
                    )}
                  </p>
                  <p className="text-gray-700 text-sm ">
                    {addr.address}, {getWardName(addr.district, addr.ward)}, {getDistrictName(addr.city, addr.district)}, {getCityName(addr.city)}
                  </p>
                </div>

                <div className="flex items-center space-x-3 ">
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

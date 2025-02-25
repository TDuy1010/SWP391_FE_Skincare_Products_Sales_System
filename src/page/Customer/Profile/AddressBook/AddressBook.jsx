import { useState } from "react";
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
      city: "Hồ Chí Minh",
      district: "Quận 9",
      ward: "Phường Long Bình",
      address: "Vinhomes Grand Park Origami S7.03",
    },
    {
      id: 2,
      name: "Tuấn Em",
      phone: "0123456789",
      city: "Hồ Chí Minh",
      district: "Quận 9",
      ward: "Phường Long Bình",
      address: "Vinhomes Grand Park Origami S7.03",
    },
    {
      id: 3,
      name: "Tuấn Chị",
      phone: "0123456789",
      city: "Hồ Chí Minh",
      district: "Quận 9",
      ward: "Phường Long Bình",
      address: "Vinhomes Grand Park Origami S7.03",
    },
  ]);

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleEdit = (addr) => {
    setEditForm(addr);  // Gán dữ liệu địa chỉ cần chỉnh sửa
    setShowForm(true);  // Hiển thị form chỉnh sửa
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditForm(null);
  };

  return (
    <div className="p-6 bg-white w-full max-w-full">
      {showForm ? (
        <AddNewAddress onClose={handleCloseForm} defaultValues={editForm} />
      ) : (
        <>
          <div className="border rounded-md p-4 bg-gray-50">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="border-b last:border-0 p-4 flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold text-green-800">
                    {addr.name} - {addr.phone}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {addr.address}, {addr.ward}, {addr.district}, {addr.city}
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

          {/* thêm địa chỉ mới */}
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
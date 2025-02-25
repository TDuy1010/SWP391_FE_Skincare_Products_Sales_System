import React, { useEffect, useState } from "react";
import { Button, Tooltip, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllProducts, deleteProduct } from "../../../service/product/index";

const ProductManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      if (!response.error) {
        setProducts(response.result.productResponses);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showDeleteConfirm = (product) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      const response = await deleteProduct(productToDelete.id);
      if (!response.error) {
        message.success(response.message);
        fetchProducts();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to delete product");
    } finally {
      setDeleteModalVisible(false);
      setProductToDelete(null);
    }
  };

    return (
        <>
            <div>
                <h2 className="text-2xl text-white font-bold mb-4">Products</h2>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <input type="text" placeholder="Search user" className="bg-slate-800 text-white p-2 rounded-lg mr-2" />
                            <select className="bg-slate-800 text-white p-2 rounded-lg">
                                {types.map((type, index) => (
                                    <option key={index}>{type}</option>
                                ))}
                            </select>
                            {/*update15/02*/}
                        </div>
                        <button className="bg-purple-600 text-white p-2 rounded-lg" onClick={() => setShowAddProduct(true)}> + Add Product </button>
                    </div>
                    <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto min-w-full">
                        <thead>
                            <tr className="text-yellow-400">
                                <th className="p-2">ProductID</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Type</th>
                                <th className="p-2">Quantity</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Rating</th>
                                <th className="p-2">Image</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index} className="border-t border-white text-gray-200">
                                    <td className="py-4 px-2">{product.productId}</td>
                                    <td className="py-4 px-2">{product.name}</td>
                                    <td className="py-4 px-2">{product.type}</td>
                                    <td className="py-4 px-2">{product.quantity}</td>
                                    <td className="py-4 px-2">{product.price}</td>
                                    <td className="py-4 px-2">{product.rating}</td>
                                    <td className="py-4 px-2">
                                        <img src={product.image} alt="sữa rửa mặt" className="w-14 h-14"/>
                                    </td>
                                    <td className="py-4 px-2 flex items-center justify-start h-20">
                                        <FaRegEdit className="text-green-500 mr-3" size={20} />
                                        <FaRegTrashCan className='text-red-500' size={20} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            
      {showAddProduct && (
        <AddProduct onClose={() => setShowAddProduct(false)} onAddProduct={handleAddProduct} />
      )}
        </>
    )
}

export default ProductManagement;

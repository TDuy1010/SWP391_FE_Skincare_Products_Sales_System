import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import img5 from '../../../assets/img/product-1.png';

import AddProduct from './AddProduct';

const ProductManagement = () => {

    const [products, setProducts] = useState([
        { productId: '2003', name: 'tẩy da chết', type: 1, quantity: 25, price: '250.000', rating: 4.5, image: '' },
        { productId: '2003', name: 'sửa rửa mặt', type: 1, quantity: 25, price: '250.000', rating: 4.5, image: img5 }
    ]);

    const types = [1, 2, 3];

    const [showAddProduct, setShowAddProduct] = useState(false); 
    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
        setShowAddProduct(false); 
    };

    const [editingId, setEditingId] = useState(null);
    const [originalProduct, setOriginalProduct] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const isProductChanged = (current, original) => {
        return JSON.stringify(current) !== JSON.stringify(original);
    };

    const handleStartEdit = (index) => {
        setEditingId(index);
        setOriginalProduct({...products[index]});
    };

    const handleSaveEdit = (index, updatedProduct) => {
        const newProducts = [...products];
        newProducts[index] = updatedProduct;
        setProducts(newProducts);
        setEditingId(null);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    const handleDelete = (index) => {
        setDeleteIndex(index);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        const newProducts = products.filter((_, index) => index !== deleteIndex);
        setProducts(newProducts);
        setShowDeleteConfirm(false);
        setDeleteIndex(null);
    };

    return (
        <>
            <div>
                {showNotification && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-[#182237] p-6 rounded-lg shadow-xl">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-white mb-2">Notification</h3>
                                <p className="text-white">Product updated successfully!</p>
                            </div>
                        </div>
                    </div>
                )}
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
                        </div>
                        <button className="bg-purple-600 text-white p-2 rounded-lg" onClick={() => setShowAddProduct(true)}> + Add Product </button>
                    </div>
                    <table className="w-full text-left">
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
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <input
                                                type="text"
                                                className="bg-slate-800 text-white p-1 rounded"
                                                value={product.name}
                                                onChange={(e) => {
                                                    const newProducts = [...products];
                                                    newProducts[index] = { ...product, name: e.target.value };
                                                    setProducts(newProducts);
                                                }}
                                            />
                                        ) : (
                                            product.name
                                        )}
                                    </td>
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <select
                                                className="bg-slate-800 text-white p-1 rounded"
                                                value={product.type}
                                                onChange={(e) => {
                                                    const newProducts = [...products];
                                                    newProducts[index] = { ...product, type: parseInt(e.target.value) };
                                                    setProducts(newProducts);
                                                }}
                                            >
                                                {types.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            product.type
                                        )}
                                    </td>
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <input
                                                type="number"
                                                className="bg-slate-800 text-white p-1 rounded w-20"
                                                value={product.quantity}
                                                onChange={(e) => {
                                                    const newProducts = [...products];
                                                    newProducts[index] = { ...product, quantity: parseInt(e.target.value) };
                                                    setProducts(newProducts);
                                                }}
                                            />
                                        ) : (
                                            product.quantity
                                        )}
                                    </td>
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <input
                                                type="text"
                                                className="bg-slate-800 text-white p-1 rounded w-24"
                                                value={product.price}
                                                onChange={(e) => {
                                                    const newProducts = [...products];
                                                    newProducts[index] = { ...product, price: e.target.value };
                                                    setProducts(newProducts);
                                                }}
                                            />
                                        ) : (
                                            product.price
                                        )}
                                    </td>
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <input
                                                type="number"
                                                className="bg-slate-800 text-white p-1 rounded w-20"
                                                value={product.rating}
                                                min="0"
                                                max="5"
                                                step="0.1"
                                                onChange={(e) => {
                                                    const newProducts = [...products];
                                                    newProducts[index] = { ...product, rating: parseFloat(e.target.value) };
                                                    setProducts(newProducts);
                                                }}
                                            />
                                        ) : (
                                            product.rating
                                        )}
                                    </td>
                                    <td className="py-4 px-2">
                                        <img src={product.image} alt="sữa rửa mặt" className="w-14 h-14"/>
                                    </td>
                                    <td className="py-4 px-2 flex items-center justify-start h-20">
                                        {editingId === index ? (
                                            <>
                                                <button 
                                                    className={`flex items-center px-3 py-1 rounded-md mr-2 ${
                                                        isProductChanged(product, originalProduct)
                                                        ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                                                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                    }`}
                                                    onClick={() => {
                                                        if (isProductChanged(product, originalProduct)) {
                                                            handleSaveEdit(index, product);
                                                        }
                                                    }}
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Save
                                                </button>
                                                <button 
                                                    className="flex items-center px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
                                                    onClick={() => setEditingId(null)}
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button 
                                                    className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-all duration-200 mr-2 group"
                                                    onClick={() => handleStartEdit(index)}
                                                >
                                                    <FaRegEdit 
                                                        className="text-green-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200" 
                                                        size={18} 
                                                    />
                                                </button>
                                                <button 
                                                    className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-200 group"
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    <FaRegTrashCan 
                                                        className="text-red-500 group-hover:text-red-600 group-hover:scale-110 transition-all duration-200" 
                                                        size={18} 
                                                    />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {showAddProduct && (
                <AddProduct onClose={() => setShowAddProduct(false)} onAddProduct={handleAddProduct} />
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-[#182237] p-6 rounded-lg shadow-xl">
                        <h3 className="text-xl font-semibold text-white mb-4">Confirm Delete</h3>
                        <p className="text-gray-300 mb-6">Are you sure you want to delete this product?</p>
                        <div className="flex justify-end space-x-4">
                            <button 
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductManagement

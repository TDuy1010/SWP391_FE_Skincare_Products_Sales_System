import HeroSection from "../../../components/HeroSection/HeroSection";
import { Pagination } from "antd";
import { motion } from "framer-motion";
import ProductCardList from "../../../components/ProductCardList/ProductCardList";
import { getAllProduct } from "../../../service/getAllProduct/getAllProduct";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SiDeluge } from "react-icons/si";
const ShopPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  //product state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const { slug, type } = useParams(); // Thêm type vào params

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProduct = async () => {
    try {
      // Thay vì tạo URLSearchParams, tạo object params
      const params = {
        page: currentPage,
        size: pageSize,
      };

      if (slug) {
        if (window.location.pathname.includes("/brand/")) {
          params.brandSlug = slug;
        } else {
          params.categorySlug = slug;
        }
      }

      // Log để debug
      console.log("API Params:", params);

      const data = await getAllProduct(params);
      if (data.error) {
        setErrors(data.message);
      } else {
        setProducts(data.result.productResponses);
        setTotalItems(data.result.totalElements);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrors("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(slug);
    fetchProduct();
  }, [slug, currentPage, pageSize]); // Add currentPage and pageSize as dependencies

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Sửa lại hàm onShowSizeChange
  const onShowSizeChange = (current, size) => {
    console.log("Size changed to:", size); // Debug log
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <>
      <div>
        {/* Hero Section  */}
        <HeroSection />

        {/* Nav product */}
        <div className="flex gap-8 bg-amber-100 p-5 border-b-2 border-gray-200">
          <a className="text-black hover:underline cursor-pointer">Shop All</a>
          <a className="text-black hover:underline cursor-pointer">Toner</a>
          <a className="text-black hover:underline cursor-pointer">Moister</a>
          <a className="text-black hover:underline cursor-pointer">Serum</a>
        </div>

        {/* Header product */}
        <div className="p-8">
          <p className="pb-3 text-lg">Reverd Formulations</p>
          <h1 className="text-4xl ">Essentials For Every Skincare</h1>
        </div>

        {/* Items per page selector */}
        <div className="flex items-center justify-end px-8 mb-4">
          <select
            value={pageSize}
            onChange={(e) =>
              onShowSizeChange(currentPage, parseInt(e.target.value))
            }
            className="border rounded-md p-1 text-sm w-28"
          >
            {[4, 8, 12, 16].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Product List */}
        <div>
          {loading ? (
            <p className="flex justify-center alignitems-center">
              Loading products...
            </p>
          ) : errors ? (
            <p className="flex justify-center">{errors}</p>
          ) : products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <ProductCardList {...product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="flex justify-center">No products available.</p>
          )}
        </div>

        {/* Update Pagination component */}
        <div className="flex justify-center m-10">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={onPageChange}
            showSizeChanger={false}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </div>
      </div>
    </>
  );
};

export default ShopPage;

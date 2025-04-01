import { Pagination, Spin, Empty } from "antd";
import { motion } from "framer-motion";
import ProductCardList from "../../../components/ProductCardList/ProductCardList";
import { getAllProduct } from "../../../service/product/getAllProduct";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SiDeluge } from "react-icons/si";
import { FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";
import img3 from "../../../assets/img/Rectangle 24.png"; // Thêm import hình ảnh hero giống như BlogPage

const stripHtmlTags = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const ShopPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  //product state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const { slug, type } = useParams();

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalItems, setTotalItems] = useState(0);

  //search state
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  // Thêm state để lưu trữ categories
  const [categories, setCategories] = useState([]);

  // Thêm state để lưu trữ brands
  const [brands, setBrands] = useState([]);

  // Thêm state cho view mode (grid/list)
  const [viewMode, setViewMode] = useState("grid");

  // Thêm state cho filter sidebar
  const [showFilters, setShowFilters] = useState(false);

  // Thêm state cho filters và sorting
  const [filters, setFilters] = useState({
    categorySlug: "",
    brandSlug: "",
    sortBy: "",
    order: "",
    priceRange: "",
    minPrice: null,
    maxPrice: null,
  });

  // Thêm price ranges
  const priceRanges = [
    { label: "Dưới 200,000đ", value: "0-200000" },
    { label: "200,000đ - 500,000đ", value: "200000-500000" },
    { label: "500,000đ - 1,000,000đ", value: "500000-1000000" },
    { label: "1,000,000đ - 5,000,000đ", value: "1000000-5000000" },
    { label: "5,000,000đ - 10,000,000đ", value: "5000000-10000000" },
    { label: "Trên 10,000,000đ", value: "10000000-999999999" },
  ];

  // Thêm debounce effect để tránh gọi API quá nhiều
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  // Hàm để lấy unique categories và brands từ products
  const extractUniqueFilters = (products) => {
    const uniqueCategories = new Map();
    const uniqueBrands = new Map();

    products.forEach((product) => {
      if (product.category) {
        uniqueCategories.set(product.category.id, product.category);
      }
      if (product.brand) {
        uniqueBrands.set(product.brand.id, product.brand);
      }
    });

    setCategories(Array.from(uniqueCategories.values()));
    setBrands(Array.from(uniqueBrands.values()));
  };

  const fetchProduct = async () => {
    try {
      const params = {
        page: currentPage,
        size: pageSize,
        keyword: debouncedKeyword,
      };

      // Thêm các filter vào params (nhưng không thêm sort params)
      if (filters.categorySlug) {
        params.categorySlug = filters.categorySlug;
      }

      if (filters.brandSlug) {
        params.brandSlug = filters.brandSlug;
      }

      // Xử lý price range
      if (filters.priceRange && filters.priceRange !== "") {
        const [min, max] = filters.priceRange.split("-").map(Number);
        params.minPrice = min;
        params.maxPrice = max;
      }

      if (slug) {
        if (window.location.pathname.includes("/shop/brand/")) {
          params.brandSlug = slug;
        } else if (window.location.pathname.includes("/shop/category/")) {
          params.categorySlug = slug;
        }
      }

      const data = await getAllProduct(params);
      if (data.error) {
        setErrors(data.message);
      } else {
        let filteredProducts = data.result.productResponses;

        // Client-side price filtering if needed
        if (params.minPrice || params.maxPrice) {
          filteredProducts = filteredProducts.filter((product) => {
            const price = product.price || 0;
            const minPriceMatch = params.minPrice
              ? price >= params.minPrice
              : true;
            const maxPriceMatch = params.maxPrice
              ? price <= params.maxPrice
              : true;
            return minPriceMatch && maxPriceMatch;
          });
        }

        // Xử lý sort trên client-side
        if (filters.sortBy && filters.order) {
          filteredProducts = [...filteredProducts].sort((a, b) => {
            let valueA, valueB;

            // Lấy giá trị cần so sánh dựa trên sortBy
            if (filters.sortBy === "price") {
              valueA = a.price || 0;
              valueB = b.price || 0;
            } else if (filters.sortBy === "name") {
              valueA = a.name || "";
              valueB = b.name || "";
            } else if (filters.sortBy === "createdAt") {
              valueA = new Date(a.createdAt || 0).getTime();
              valueB = new Date(b.createdAt || 0).getTime();
            } else {
              valueA = a[filters.sortBy] || "";
              valueB = b[filters.sortBy] || "";
            }

            // So sánh dựa trên order
            if (filters.order === "asc") {
              if (typeof valueA === "string") {
                return valueA.localeCompare(valueB);
              }
              return valueA - valueB;
            } else {
              if (typeof valueA === "string") {
                return valueB.localeCompare(valueA);
              }
              return valueB - valueA;
            }
          });
        }

        setProducts(filteredProducts);
        setTotalItems(data.result.totalElements);
        // Cập nhật categories và brands
        extractUniqueFilters(data.result.productResponses);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrors("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Thay đổi useEffect để chỉ scroll to top khi thay đổi slug
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Tạo useEffect riêng cho việc fetch data
  useEffect(() => {
    fetchProduct();
  }, [slug, currentPage, pageSize, debouncedKeyword, filters]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Thêm hàm xử lý filter change
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setCurrentPage(1); // Reset về trang 1 khi thay đổi filter
  };

  // Thêm hàm xử lý price range
  const handlePriceRangeChange = (value) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
    setCurrentPage(1);
  };

  // Thêm hàm xử lý sort
  const handleSortChange = (value) => {
    let sortBy = "";
    let order = "";

    switch (value) {
      case "price_asc":
        sortBy = "price";
        order = "asc";
        break;
      case "price_desc":
        sortBy = "price";
        order = "desc";
        break;
      case "name_asc":
        sortBy = "name";
        order = "asc";
        break;
      case "name_desc":
        sortBy = "name";
        order = "desc";
        break;
      case "newest":
        sortBy = "createdAt";
        order = "desc";
        break;
      default:
        break;
    }

    setFilters((prev) => ({ ...prev, sortBy, order }));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Phong cách giống với BlogPage */}
      <div className="relative h-[500px] w-full">
        <img
          src={img3}
          alt="Sản Phẩm Chăm Sóc Da"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-white text-5xl font-light">
                Sản Phẩm Chăm Sóc Da
              </h1>
              <p className="text-white mt-4 max-w-xl">
                Khám phá bộ sưu tập các sản phẩm chăm sóc da cao cấp của chúng
                tôi, được thiết kế để nuôi dưỡng và làm đẹp làn da của bạn. Mỗi
                sản phẩm đều được nghiên cứu kỹ lưỡng để mang lại hiệu quả tối
                ưu cho mọi loại da.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-50 rounded-lg p-4 mb-8 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FiSearch className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Items per page selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Hiển thị:</span>
                <select
                  value={pageSize}
                  onChange={(e) =>
                    onShowSizeChange(currentPage, parseInt(e.target.value))
                  }
                  className="border rounded-md p-1 text-sm bg-white"
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="16">16</option>
                </select>
              </div>

              {/* View Mode Selector */}
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid" ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  <FiGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list" ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  <FiList className="h-4 w-4" />
                </button>
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                <FiFilter className="h-4 w-4" />
                <span>Bộ lọc</span>
              </button>
            </div>
          </div>

          {/* Filter Section (conditionally rendered) */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Khoảng Giá</h3>
                  <select
                    className="w-full border rounded-md p-2 text-sm bg-white"
                    onChange={(e) => handlePriceRangeChange(e.target.value)}
                    value={filters.priceRange}
                  >
                    <option value="">Tất cả giá</option>
                    {priceRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                {brands.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Thương Hiệu</h3>
                    <select
                      className="w-full border rounded-md p-2 text-sm bg-white"
                      onChange={(e) =>
                        handleFilterChange("brandSlug", e.target.value)
                      }
                      value={filters.brandSlug}
                    >
                      <option value="">Tất cả thương hiệu</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.slug}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Sort By */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Sắp Xếp Theo</h3>
                  <select
                    className="w-full border rounded-md p-2 text-sm bg-white"
                    onChange={(e) => handleSortChange(e.target.value)}
                    value={`${filters.sortBy}_${filters.order}`}
                  >
                    <option value="">Mặc định</option>
                    <option value="price_asc">Giá: Thấp đến cao</option>
                    <option value="price_desc">Giá: Cao đến thấp</option>
                    <option value="name_asc">Tên: A-Z</option>
                    <option value="name_desc">Tên: Z-A</option>
                    <option value="newest">Mới nhất</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Categories Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-2">
            <a
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                !slug
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                window.location.href = "/shop";
              }}
            >
              Tất cả sản phẩm
            </a>
            {categories.map((category) => (
              <a
                key={category.id}
                className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                  slug === category.slug
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => {
                  window.location.href = `/shop/category/${category.slug}`;
                }}
              >
                {category.name}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Product List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : errors ? (
          <div className="text-center py-20">
            <p className="text-red-500">{errors}</p>
          </div>
        ) : products?.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={
                  viewMode === "list"
                    ? "bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                    : ""
                }
              >
                {viewMode === "list" ? (
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <div className="aspect-square overflow-hidden rounded-md">
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          {stripHtmlTags(product.name)}
                        </h3>
                        <div className="text-gray-600 mb-4 line-clamp-3">
                          {stripHtmlTags(product.description)}
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          {product.category && (
                            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 mr-2">
                              {stripHtmlTags(product.category.name)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">
                          {product.price} VND
                        </span>
                        <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ProductCardList {...product} />
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-20">
            <Empty
              description="Không tìm thấy sản phẩm nào"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              onChange={onPageChange}
              showSizeChanger={false}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} trong ${total} sản phẩm`
              }
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;

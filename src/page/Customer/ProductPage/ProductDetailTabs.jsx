/* eslint-disable react/prop-types */

import FeedbackSection, { RatingStars } from "./FeedbackSection";

// TabButton component definition
const TabButton = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`pb-4 text-sm font-medium border-b-2 ${
      isActive
        ? "border-black text-black"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    {children}
  </button>
);

// Helper function to safely render HTML content
const createMarkup = (htmlContent) => {
  return { __html: htmlContent || "" };
};

// Main ProductDetailTabs component
const ProductDetailTabs = ({ 
  activeTab,
  setActiveTab,
  product,
  productSpecs,
  reviews,
  setReviews,
  handleLoginRequired,
  slug,
}) => {
  return (
    <div className="mt-6 pt-6">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-6 overflow-x-auto pb-px">
          <TabButton
            isActive={activeTab === "description"}
            onClick={() => setActiveTab("description")}
          >
            Mô tả
          </TabButton>
          <TabButton
            isActive={activeTab === "parameters"}
            onClick={() => setActiveTab("parameters")}
          >
            Thông số
          </TabButton>
          <TabButton
            isActive={activeTab === "usage"}
            onClick={() => setActiveTab("usage")}
          >
            Cách sử dụng
          </TabButton>
          <TabButton
            isActive={activeTab === "ingredients"}
            onClick={() => setActiveTab("ingredients")}
          >
            Thành phần
          </TabButton>
          <TabButton
            isActive={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          >
            Đánh giá ({reviews.length})
          </TabButton>
        </nav>
      </div>

      <div className="py-4">
        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="prose prose-sm max-w-none">
            <div
              dangerouslySetInnerHTML={createMarkup(product.description)}
            />
          </div>
        )}

        {/* Parameters Tab */}
        {activeTab === "parameters" && (
          <div className="overflow-hidden bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                {productSpecs.parameters.map((param, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 w-1/3">
                      {param.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {param.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Usage Tab */}
        {activeTab === "usage" && (
          <div className="space-y-4">
            <ol className="list-decimal pl-5 space-y-2">
              {productSpecs.usage.map((step, idx) => (
                <li key={idx} className="text-gray-600">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Ingredients Tab */}
        {activeTab === "ingredients" && (
          <div className="space-y-4">
            <p className="text-gray-600">{productSpecs.ingredients}</p>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <FeedbackSection 
            product={product}
            reviews={reviews}
            setReviews={setReviews}
            slug={slug}
            handleLoginRequired={handleLoginRequired}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailTabs;
export { TabButton };  // Export thêm các component con nếu cần
import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Tất cả đánh giá
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          Viết đánh giá của bạn
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Sản phẩm HOT🔥
        </div>
      </section>

      <section>
        {activeTab === 1 && (
          <>
            <div>
              {product.reviews.length === 0 && <p>Chưa có đánh giá nào</p>}
            </div>

            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-[#B0B0B0]">{review.name}</strong>
                    <p className="text-[#B0B0B0]">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>

                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <section>
        {activeTab === 2 && (
          <div className="mt-4">
            {userInfo ? (
              product.purchasedBy?.includes(userInfo._id) ? (
                <form onSubmit={submitHandler}>
                  <div className="my-2">
                    <label htmlFor="rating" className="block text-xl mb-2">
                      Đánh giá
                    </label>

                    <select
                      id="rating"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="p-2 border rounded-lg xl:w-[40rem] text-black"
                    >
                      <option value="">Chọn</option>
                      <option value="1">Kém</option>
                      <option value="2">Chấp nhận được</option>
                      <option value="3">Tốt</option>
                      <option value="4">Xuất sắc</option>
                      <option value="5">Tuyệt vời</option>
                    </select>
                  </div>

                  <div className="my-2">
                    <label htmlFor="comment" className="block text-xl mb-2">
                      Bình luận
                    </label>

                    <textarea
                      id="comment"
                      rows="3"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="p-2 border rounded-lg xl:w-[40rem] text-black"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loadingProductReview}
                    className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                  >
                    Gửi
                  </button>
                </form>
              ) : (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
                  <p className="font-medium">Bạn cần mua sản phẩm này trước khi đánh giá.</p>
                  <p className="text-sm mt-1">Vui lòng thêm sản phẩm vào giỏ hàng và hoàn tất đơn hàng.</p>
                </div>
              )
            ) : (
              <p>
                Vui lòng <Link to="/login">đăng nhập</Link> để viết đánh giá
              </p>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTab === 3 && (
          <section className="ml-[4rem] flex flex-wrap">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
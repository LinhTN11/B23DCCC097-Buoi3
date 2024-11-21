import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../redux/productsReducer";

const EditProductForm = ({ setVisibleForm, idSanPham }) => {
  const product = useSelector((state) =>
    state.products.find((product) => product.id === idSanPham)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Đặt giá trị ban đầu cho form khi có hàng hóa
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: product.id, name, price }));
    setVisibleForm(false);
    // navigate("/products"); // Quay lại danh sách hàng hóa
  };

  return (
    <div className="form-container">
      <h2>Chỉnh Sửa Hàng Hóa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên hàng hóa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Giá hàng hóa"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Lưu Thay Đổi</button>
      </form>
      <button
        className="back-btn"
        onClick={() => {
          setVisibleForm(false);
        }}
      >
        Quay Lại
      </button>
    </div>
  );
};

export default EditProductForm;

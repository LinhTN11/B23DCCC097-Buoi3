import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productsReducer";
import Select from "./Select";
import Notification from "./Notification";

const AddProductForm = ({ setVisibleForm }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type) => {
    const id = Math.random().toString(36).substring(2);
    setNotifications([...notifications, { id, message, type }]);
  };
  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };
  // const navigate = useNavigate();
  const options = [
    { label: "Văn phòng phẩm", value: "1" },
    { label: "Thực phẩm", value: "2" },
    { label: "Khác", value: "3" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
    };
    dispatch(addProduct(newProduct));
    // addNotification("Thêm hàng hóa thành công", "success");
    setVisibleForm(false);
    // navigate("/products"); // Chuyển hướng về danh sách hàng hóa sau khi thêm
  };

  return (
    <div className="form-container">
      <h2>Thêm Hàng Hóa</h2>
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
        <Select
          options={options}
          value={selectedOption}
          onChange={(value) => {
            setSelectedOption(value);
          }}
          placeholder="Loại hàng hóa"
        />
        {selectedOption === "1" && (
          <input
            type="text"
            placeholder="Hạn sử dụng"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        {/* <div className="notification-container">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </div> */}

        <button type="submit">Thêm hàng hóa</button>
      </form>
      <button className="back-btn" onClick={() => setVisibleForm(false)}>
        Đóng
      </button>
    </div>
  );
};

export default AddProductForm;

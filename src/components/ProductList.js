import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { deleteProduct } from "../redux/productsReducer";
import AddProductForm from "./AddProductForm";
import Button from "./Button";
import EditProductForm from "./EditProductForm";
import Tooltip from "./Tooltip";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSanPham, setIdSanPham] = useState();

  // Tính tổng giá trị của tất cả sản phẩm sử dụng useMemo
  const totalPrice = useMemo(() => {
    return products.reduce((total, product) => total + product.price, 0);
  }, [products]);

  const columns = [
    { label: "Tên", field: "name" },
    { label: "Giá", field: "price" },
    {
      label: "Thao tác",
      width: 130,
      render: (val, row) => (
        <>
          <Button
            onClick={() => {
              setVisibleForm(true);
              setIsEdit(true);
              setIdSanPham(row.id);
            }}
            size="small"
            className="primary"
          >
            Chỉnh sửa
          </Button>

          <DeleteActionButton row={row} dispatch={dispatch} />
        </>
      ),
    },
  ];

  const tableData = [
    ...products,
    {
      id: "total",
      name: <strong>Tổng số</strong>,
      price: <strong>{totalPrice}</strong>,
      isSummaryRow: true,
    },
  ];

  return (
    <div>
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditProductForm
            idSanPham={idSanPham}
            setVisibleForm={setVisibleForm}
          />
        ) : (
          <AddProductForm setVisibleForm={setVisibleForm} />
        )}
      </Modal>
      <h1>Bảng Thông Tin</h1>
      <Tooltip content="" position="right">
        <Button
          style={{ marginBottom: 8 }}
          size="medium"
          onClick={() => {
            setVisibleForm(true);
            setIsEdit(false);
          }}
        >
          Thêm Hàng Hóa
        </Button>
      </Tooltip>
      <Table columns={columns} data={tableData}></Table>
    </div>
  );
};

// Tái sử dụng một component cho hành động xóa
const DeleteActionButton = ({ row, dispatch }) => (
  <Tooltip content={"Sau khi xóa, dữ liệu sẽ không thể khôi phục lại được"} position="left">
    <Button
      onClick={() => dispatch(deleteProduct(row.id))}
      style={{ marginLeft: 8 }}
      size="small"
      className="danger"
    >
      Xóa
    </Button>
  </Tooltip>
);

export default ProductList;

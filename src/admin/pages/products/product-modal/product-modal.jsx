import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addNewProductThunk } from "../../../../store/features/admin/products/thunk";
import "./product-modal.css";

const ProductModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    brandName: 'TEA OF ASSAM',
    price: 0,
    category: '',
    stock: 0,
    image: null,
    desc: '',
    size: "10oz"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price' || name === 'stock') {
      const numericValue = value ? parseFloat(value) : 0;  // Convert to number or set to 0 if empty
      setFormData(prevData => ({ ...prevData, [name]: numericValue }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const readURL = (input) => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        let TYPED_ARRAY = new Uint8Array(event.target.result);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => data + String.fromCharCode(byte), '');
        let base64String = btoa(STRING_CHAR);
        setFormData({ ...formData, image: 'data:image/' + file.type.split('/')[1] + ';base64,' + base64String });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();
      const maxSizeInBytes = 1048576; // 1MB in bytes
      if (!['jpg', 'jpeg', 'png'].includes(extension)) {
        toast.warning('Please select a valid JPG, PNG, or JPEG file.');
        e.target.value = ''; // Clear the input if file is invalid
        return;
      }

      if (file.size > maxSizeInBytes) {
        toast.warning('File size exceeds the maximum limit of 1MB. Please choose a smaller file.');
        e.target.value = ''; // Clear the input if file is too large
        return;
      }

      readURL(e.target);
    }
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setFormData({
      name: '',
      brandName: '',
      price: 0,
      category: '',
      stock: 0,
      image: null,
      desc: '',
      size: "10oz"
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewProductThunk(formData)).then((res) => {
      toast.success('Product successfully added!');
      setIsOpen(false);
      setFormData({
        name: '',
        brandName: '',
        price: 0,
        category: '',
        stock: 0,
        image: null,
        desc: '',
        size: "10oz"
      });
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className={`product-modal-container ${isOpen ? "d-flex" : "d-none"}`}>
      <div className="add-product-form">
        <div className="modal-header">
          <h2 className="modal-header-title">Add New Product</h2>
          <button className="close-btn" onClick={closeModal}>x</button>
        </div>

        <div className="modal-content">
          <div className="col">
            <div className="w-100">
              <label className="modal-field-label" htmlFor="name">Name:</label>
              <input
                type="text"
                className="modal-field"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                minLength="2"
              />
            </div>
            <div className="w-100">
              <label className="modal-field-label" htmlFor="brandName">Brand Name:</label>
              <input
                type="text"
                className="modal-field"
                id="brandName"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                minLength="2"
              />
            </div>
          </div>

          <div className="col">
            <div className="w-100">
              <label className="modal-field-label" htmlFor="price">Price:</label>
              <input
                type="number"
                className="modal-field"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-100">
              <label className="modal-field-label" htmlFor="category">Category:</label>
              <select
                className="modal-field"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="tea">Tea</option>
                <option value="coffee">Coffee</option>
              </select>
            </div>
            <div className="w-100">
              <label className="modal-field-label" htmlFor="stock">Stock:</label>
              <input
                type="number"
                className="modal-field"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="modal-field-label" htmlFor="image">Choose an image:</label>
            <input
              type="file"
              className="modal-field"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label className="modal-field-label" htmlFor="desc">Description:</label>
            <textarea
              className="modal-field text-area"
              id="desc"
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              style={{
                maxWidth: "400px",
                maxHeight: "150px",
                width: "100%",
                height: "100px"
              }}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="back-btn" onClick={closeModal}>Back</button>
          <button className="add-btn" onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal;

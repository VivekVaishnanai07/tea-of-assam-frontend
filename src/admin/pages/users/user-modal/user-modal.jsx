import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addNewUserThunk } from "../../../../store/features/admin/users/thunk";
import "./user-modal.css";

const UserModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    gender: '',
    address: {
      street: '',
      landmark: '',
      locality: '',
      city: '',
      state: '',
      pinCode: '',
      type: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [field]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      gender: '',
      address: {
        street: '',
        landmark: '',
        locality: '',
        city: '',
        state: '',
        pinCode: '',
        type: '',
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewUserThunk(formData))
      .then(() => {
        toast.success('User successfully added!');
        setIsOpen(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          gender: '',
          address: {
            street: '',
            landmark: '',
            locality: '',
            city: '',
            state: '',
            pinCode: '',
            type: '',
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={`user-modal-container ${isOpen ? "d-flex" : "d-none"}`}>
      <div className="add-user-form">
        <div className="modal-header">
          <h2 className="modal-header-title">Add New User</h2>
          <button className="close-btn" onClick={closeModal}>x</button>
        </div>

        <div className="modal-content">
          <div className="col">
            <div className="w-100">
              <label className="modal-field-label" htmlFor="firstName">First Name:</label>
              <input
                type="text"
                className="modal-field"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                minLength="2"
              />
            </div>
            <div className="w-100">
              <label className="modal-field-label" htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                className="modal-field"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                minLength="2"
              />
            </div>
          </div>
          <div className="col">
            <div className="w-100">
              <label className="modal-field-label" htmlFor="email">Email:</label>
              <input
                type="email"
                className="modal-field"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-100">
              <label className="modal-field-label" htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="tel"
                className="modal-field"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
              />
            </div>
          </div>
          <div className="gender-section">
            <label className="modal-field-label">Gender:</label>
            <div className="radio-group">
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                checked={formData.gender === "male"}
                onChange={handleInputChange}
              />
              <label htmlFor="male" className="custom-radio"></label>
              <label>Male</label>
              <input
                type="radio"
                name="gender"
                value="female"
                id="female"
                checked={formData.gender === "female"}
                onChange={handleInputChange}
              />
              <label htmlFor="female" className="custom-radio"></label>
              <label>Female</label>
              <input
                type="radio"
                name="gender"
                value="other"
                id="other"
                checked={formData.gender === "other"}
                onChange={handleInputChange}
              />
              <label htmlFor="other" className="custom-radio"></label>
              <label>Other</label>
            </div>
          </div>
          <div className="w-100">
            <label className="modal-field-label" htmlFor="street">Street:</label>
            <input
              type="text"
              className="modal-field"
              id="street"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <div className="w-100">
              <label className="modal-field-label" htmlFor="landmark">Landmark:</label>
              <input
                type="text"
                className="modal-field"
                id="landmark"
                name="address.landmark"
                value={formData.address.landmark}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-100">
              <label className="modal-field-label" htmlFor="locality">Locality:</label>
              <input
                type="text"
                className="modal-field"
                id="locality"
                name="address.locality"
                value={formData.address.locality}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-100">
              <label className="modal-field-label" htmlFor="city">City:</label>
              <input
                type="text"
                className="modal-field"
                id="city"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="w-100">
              <label className="modal-field-label" htmlFor="state">State:</label>
              <input
                type="text"
                className="modal-field"
                id="state"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-100">
              <label className="modal-field-label" htmlFor="pinCode">Pin Code:</label>
              <input
                type="text"
                className="modal-field"
                id="pinCode"
                name="address.pinCode"
                value={formData.address.pinCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="gender-section">
              <label>Type:</label>
              <div className="radio-group">
                <input
                  type="radio"
                  name="address.type"
                  value="home"
                  id="home"
                  checked={formData.address.type === "home"}
                  onChange={handleInputChange}
                />
                <label htmlFor="home" className="custom-radio"></label>
                <label>Home</label>
                <input
                  type="radio"
                  name="address.type"
                  value="office"
                  id="office"
                  checked={formData.address.type === "office"}
                  onChange={handleInputChange}
                />
                <label htmlFor="office" className="custom-radio"></label>
                <label>Office</label>
              </div>
            </div>
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

export default UserModal;

import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user-context";
import "./account.css";

const Account = () => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    type: "",
    gender: "",
  });

  useEffect(() => {
    if (user && user._id) {
      setCustomerDetails({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.mobileNumber || "",
        pincode: user.pinCode || "",
        locality: user.locality || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        landmark: user.landmark || "",
        type: user.type || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  const handleSubmit = () => {
    if (isEditing) {
      console.log("Form Submitted:", customerDetails);
    }
    setIsEditing(!isEditing);
  }

  return (
    <div className="account-wrapper">
      <div className="account-details">
        <div className="account-title">Account Details</div>
        {isEditing ? (<div className="form-box">
          <div className="column-details">
            <input
              type="text"
              name="firstName"
              className="column-field"
              value={customerDetails.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />

            <input
              type="text"
              name="lastName"
              className="column-field"
              value={customerDetails.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          <input
            type="email"
            name="email"
            className="column-field"
            value={customerDetails.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phoneNumber"
            className="column-field"
            value={customerDetails.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <div className="column-details">
            <input
              type="text"
              name="pincode"
              className="column-field"
              value={customerDetails.pincode}
              onChange={handleChange}
              placeholder="Pincode"
            />

            <input
              type="text"
              name="locality"
              className="column-field"
              value={customerDetails.locality}
              onChange={handleChange}
              placeholder="Locality"
            />
          </div>
          <input
            type="text"
            name="address"
            className="column-field"
            value={customerDetails.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <div className="column-details">
            <input
              type="text"
              name="city"
              className="column-field"
              value={customerDetails.city}
              onChange={handleChange}
              placeholder="City/District/Town"
            />
            <input
              type="text"
              name="state"
              className="column-field"
              value={customerDetails.state}
              onChange={handleChange}
              placeholder="State"
            />
            <input
              type="text"
              name="landmark"
              className="column-field"
              value={customerDetails.landmark}
              onChange={handleChange}
              placeholder="Landmark"
            />
          </div>
          <div className="radio-group">
            <label>Type:</label>
            <input
              type="radio"
              name="type"
              value="home"
              id="type-home"
              checked={customerDetails.type === "home"}
              onChange={handleChange}
            />
            <label htmlFor="type-home" className="custom-radio"></label>
            <label>Home</label>
            <input
              type="radio"
              name="type"
              value="work"
              id="type-work"
              checked={customerDetails.type === "work"}
              onChange={handleChange}
            />
            <label htmlFor="type-work" className="custom-radio"></label>
            <label>Work</label>
          </div>
          <div className="radio-group">
            <label>Gender:</label>
            <input
              type="radio"
              name="gender"
              value="male"
              id="gender-male"
              checked={customerDetails.gender === "male"}
              onChange={handleChange}
            />
            <label htmlFor="gender-male" className="custom-radio"></label>
            <label>Male</label>
            <input
              type="radio"
              name="gender"
              value="female"
              id="gender-female"
              checked={customerDetails.gender === "female"}
              onChange={handleChange}
            />
            <label htmlFor="gender-female" className="custom-radio"></label>
            <label>Female</label>
            <input
              type="radio"
              name="gender"
              value="other"
              id="gender-other"
              checked={customerDetails.gender === "other"}
              onChange={handleChange}
            />
            <label htmlFor="gender-other" className="custom-radio"></label>
            <label>Other</label>
          </div>
        </div>) :
          (<div className="details-box">
            <div className="column-field">
              <div className="field-names">FullName:-</div>
              <div className="details-data">{customerDetails.firstName + " " + customerDetails.lastName}</div>
            </div>
            <div className="column-field">
              <div className="field-names">Email:-</div>
              <div className="details-data">{customerDetails.email}</div>
            </div>
            <div className="column-field">
              <div className="field-names">Mobile Number:-</div>
              <div className="details-data">{customerDetails.phoneNumber}</div>
            </div>
            <div className="column-field">
              <div className="field-names">Pin Code:-</div>
              <div className="details-data">3{customerDetails.pincode}</div>
            </div>
            <div className="column-field">
              <div className="field-names">Locality:-</div>
              <div className="details-data">{customerDetails.locality}</div>
            </div>
            <div className="column-field">
              <div className="field-names">Address:-</div>
              <div className="details-data">{customerDetails.address}</div>
            </div>
            <div className="column-field">
              <div className="field-names">City/District/Town:-</div>
              <div className="details-data">{customerDetails.city}</div>
            </div>
            <div className="column-field">
              <div className="field-names">State:-</div>
              <div className="details-data">{customerDetails.state}</div>
            </div>
            <div className="column-field">
              <div className="field-names">Landmark:-</div>
              <div className="details-data">{customerDetails.landmark}</div>
            </div>
            <div className="column-field">
              <div className="field-names">Type:-</div>
              <div className="details-data">{customerDetails.type}</div>
            </div>
          </div>)}
        <input className="edit-btn" type="button" value={isEditing ? "Update" : "Edit"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Account;

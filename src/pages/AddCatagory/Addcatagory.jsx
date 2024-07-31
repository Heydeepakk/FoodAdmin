import React, { useState } from "react";
import "./Addcatagory.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Addcatagory = ({ url }) => {
  const [image, setImage] = useState(false);
  const [catagoryname, setCatagoryName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("catagoryName", catagoryname);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${url}/api/catagory/addCatagory`,
        formData
      );

      if (response.data.success) {
        setCatagoryName("");
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const onChangeHandler = (event) => {
    setCatagoryName(event.target.value);
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Catagory name</p>
          <input
            onChange={onChangeHandler}
            value={catagoryname}
            type="text"
            name="name"
            placeholder="Type Here"
            required
          />
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Addcatagory;

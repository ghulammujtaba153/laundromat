import axios from "axios";
import React, { useState } from "react";
import upload from "../utils/UploadWidget";

const AddProduct = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");
  const [category, setCategory] = useState("Washing Machine");
  const [picture, setPicture] = useState(null);
  const [picLoading, setPicLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName || !price || !category || !picture) {
      alert("Please fill in all fields");
      return;
    }

    // Trim and capitalize the item name
    const trimmedAndCapitalizedItemName =
      itemName.trim().charAt(0).toUpperCase() + itemName.trim().slice(1);

    const formData = {
      itemName: trimmedAndCapitalizedItemName,
      price,
      status,
      category,
      picture,
    };

    try {
      setSubmitLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/additem",
        formData
      );

      if (!response.data) {
        throw new Error("Failed to add item");
      }

      console.log("Item added successfully:", response.data.item);
      setSubmitLoading(false);

      setItemName("");
      setPrice("");
      setStatus("Available");
      setCategory("Washing Machine");
      setPicture(null);
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };
  const handlePictureChange = async (e) => {
    try {
      setPicLoading(true);
      const url = await upload(e.target.files[0]);
      setPicture(url);
      console.log("image uploaded", url);
      setPicLoading(false);
    } catch (error) {
      console.log("image upload error");
    }
  };

  return (
    <div className="w-450 mx-auto mt-10 mb-6 p-[3rem] bg-primary-bg rounded-lg shadow-md font-mono">
      <h2 className="text-3xl font-railextra mb-5 text-primary-darkblue text-center">
        Add New Machine
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="itemName"
            className="block text-lg font-railmedium text-black"
          >
            Item Name:
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-lg font-railmedium text-black"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-lg font-railmedium text-black"
          >
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-lg font-railmedium text-black"
          >
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Washing Machine">Washing Machine</option>
            <option value="Dryer">Dryer</option>
          </select>
        </div>
        <div className="my-8">
          <label
            htmlFor="picture"
            className="block text-lg font-railmedium text-black"
          >
            Picture:
          </label>
          <input
            type="file"
            id="picture"
            accept="image/*"
            onChange={handlePictureChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {picLoading && <p className="text-green-500">pic uploading...</p>}
        </div>
        {!submitLoading && (
          <button type="submit" className="btn larger  ">
            Submit
          </button>
        )}

        {submitLoading && (
          <button
            disabled
            type="button"
            class="w-full bg-[#e1c0ac] text-[#323232]  hover:bg-[#ddb7a0] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline font-railextra"
          >
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProduct;

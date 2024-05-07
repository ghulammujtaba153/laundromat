import axios from "axios";
import React, { useEffect, useState } from "react";
import LogOut from "../components/LogOut";
import { IoTrashBin } from "react-icons/io5";

const ProductList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getitems");
        console.log(res.data.items);
        setItems(res.data.items);
      } catch (error) {
        console.log("Error while fetching items:", error.message);
      }
    };

    fetchItems();
  }, []);

  const handleChangeStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Available" ? "Not Available" : "Available";

    try {
      const res = await axios.put(
        `http://localhost:5000/api/${id}/change-status`,
        {
          newStatus: newStatus,
        }
      );

      if (res.data.success) {
        const updatedItems = items.map((item) => {
          if (item._id === id) {
            return { ...item, status: newStatus };
          }
          return item;
        });

        setItems(updatedItems);
      } else {
        console.log("Failed to update item status");
      }
    } catch (error) {
      console.log("Error while updating item status:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/item/${id}`);

      if (res.data.success) {
        const updatedItems = items.filter((item) => item._id !== id);
        setItems(updatedItems);
      } else {
        console.log("Failed to delete machine");
      }
    } catch (error) {
      console.log("Error while deleting machine:", error.message);
    }
  };

  return (
    <>
      <div className="container80 bg-primary-bg">
        <div className="relative w-50% overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Product name
                </th>
                <th scope="col" className="px-6 py-4">
                  Category
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Price
                </th>
                <th scope="col" className="px-6 py-4">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b bg-primary-darkblue dark:border-gray-700 ${"hover:bg-gray-50 dark:hover:bg-gray-400"}`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 bg-primary-darkblue whitespace-nowrap dark:text-white"
                  >
                    {item.itemName}
                  </th>
                  <td className="px-6 py-4 font-railmedium bg-primary-darkblue text-primary-bg">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 font-railmedium bg-primary-darkblue  text-primary-bg">
                    {item.status === "Available"
                      ? "Available"
                      : "Under Maintenance"}
                  </td>
                  <td className="px-6 py-4 font-railmedium bg-primary-darkblue  text-primary-bg">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 font-railmedium bg-primary-darkblue  text-primary-bg text-right">
                    <p
                      onClick={() => handleChangeStatus(item._id, item.status)}
                      className="font-medium text-blue-800 dark:text-blue-500 hover:underline cursor-pointer"
                    >
                      Change Status
                    </p>
                  </td>
                  <td className="px-6 py-4 font-railmedium bg-primary-darkblue  text-primary-bg text-right">
                    <IoTrashBin
                      size={20}
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <LogOut />
    </>
  );
};

export default ProductList;

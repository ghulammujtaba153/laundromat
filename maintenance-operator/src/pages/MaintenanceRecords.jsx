import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MaintenanceRecords = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <div className="w-full h-screen">
        <h1 className="text-5xl ml-14 my-4 font-bold font-railextra text-center text-primary-darkblue mt-16">
          Maintenance Dashboard
        </h1>

        {items.length === 0 ? (
          <p>No Maintenance yet</p>
        ) : (
          <div className="max-w-7xl m-2 mt-16 mx-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>

                    <th scope="col" className="px-10 py-3">
                      <span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items
                    .filter((item) => item.status === "Not Available")
                    .map((item, index) => (
                      <tr
                        key={index}
                        className={` border-b bg-primary-darkblue  text-primary-bg`}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.itemName}
                        </th>
                        <td className="px-6 py-4">{item.category}</td>
                        <td className="px-6 py-4">Need Maintenance</td>
                        <td className="px-6 py-4">{item.price}</td>
                        <td className="px-6 py-4 text-right">
                          <p
                            onClick={() =>
                              handleChangeStatus(item._id, item.status)
                            }
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          >
                            Update Task Status!
                          </p>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="w-full flex justify-center">
          <button onClick={handleLogout} className="logout my-3 w-250">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default MaintenanceRecords;

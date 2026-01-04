import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage, WarningMessage } from "./Utils/InfoMessage";

const ProductForm = () => {
  const [totalForm, setTotalForm] = useState([]);
  const [inputValue, setInputValue] = useState({
    name: "",
    price: "",
    stocks: "",
    category: "",
    description: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { name, price, stocks, category } = inputValue;
      if (!name || !price || !stocks || !category) {
        WarningMessage("All fields are required");
        return;
      }

      if (price <= 0) {
        return WarningMessage("Price can't be less or equal to zero");
      }

      if (stocks < 0) {
        return WarningMessage("Stock can't be less than zero");
      }

      setTotalForm((prev) => [...prev, inputValue]);
      setInputValue({
        name: "",
        price: "",
        stocks: "",
        category: "",
        description: "",
      });
    } catch (error) {
      return ErrorMessage("something went wrong");
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "price" && value !== "") {
      setInputValue((prev) => ({
        ...prev,
        price: Number(Number(value).toFixed(2)),
      }));
    }

    if(name === "stocks" && value !==""){
      setInputValue((prev) =>({
        ...prev,
        stocks : Number(Number(value).toFixed(0))
      }))
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 px-5 space-y-5">
      <h1 className="text-white text-3xl font-bold"> Enter Your Product</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl sm:max-w-md   w-full   rounded-md   bg-white px-5 py-3 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            onChange={handleInput}
            name="name"
            maxLength={50}
            className="border rounded-md px-3 py-2 outline-indigo-600"
            placeholder="Product name"
            value={inputValue.name}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            onChange={handleInput}
            name="price"
            className="border rounded-md px-3 py-2 outline-indigo-600"
            placeholder="0.00"
            value={inputValue.price}
            onBlur={handleBlur}
          />
        </div>

        {/* Stocks */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Stocks</label>
          <input
            type="number"
            onChange={handleInput}
            name="stocks"
            className="border rounded-md px-3 py-2 outline-indigo-600"
            placeholder="Available quantity"
            value={inputValue.stocks}
            onBlur={handleBlur}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            onChange={handleInput}
            className="border rounded-md px-3 py-2 outline-indigo-600"
            placeholder="Category"
            value={inputValue.category}
          />
        </div>

        {/* Description (full width) */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1">Description</label>
          <textarea
            className="border rounded-md px-3 py-2 h-32 resize-none outline-indigo-600"
            placeholder="Product description"
            name="description"
            onChange={handleInput}
            value={inputValue.description}
          />
        </div>

        {/* Button (aligned nicely) */}
        <div className="  md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="flex flex-col text-white  w-full space-y-6">
        <h2 className="text-xl font-bold ">All Form Data</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-5 items-center ">
          {totalForm.map((product, index) => (
            <div
              key={index}
              className="flex odd:bg-gray-900  even:bg-gray-800 space-y-2 border-2 border-gray-400 rounded-sm px-5 py-3 flex-col "
            >
              <p>
                <span className="font-bold">Name :</span> {product.name}
              </p>
              <p>
                <span className="font-bold">Price :</span> Rs. {product.price}
              </p>
              <p>
                <span className="font-bold">Category :</span> {product.category}
              </p>
              <p>
                <span className="font-bold">Stock :</span> {product.stocks}
              </p>
              <p>
                <span className="font-bold">Discription :</span>{" "}
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {
        totalForm.length === 0 && <p className="flex items-center justify-center text-white font-semibold">No item here</p>
      }
      <ToastContainer />
    </div>
  );
};

export default ProductForm;

import { useState, useEffect } from "react";
import products from "../products.json";

const MainList = () => {
  const [isListActive, setIsListActive] = useState(true);
  const [filterData, setFilterData] = useState(products);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filterWord = search.trim().toLowerCase();

      const filteredData = products.filter((item) =>
        item.name.toLowerCase().includes(filterWord)
      );

      setFilterData(filteredData);
      setPage(1)
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);


  const handlePage = (selectedPage) =>{
    if(selectedPage >= 1 && 
      selectedPage <= filterData.length/10){

        setPage(selectedPage)
      }

  }

  return (
    <div className="bg-gray-700 md:px-10 px-5  py-3">
      <div className="flex  items-center my-5 space-x-2 justify-between text-white ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search With name "
          className=" border-gray-500 px-3 py-2  focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full border"
        />

        <div className="flex items-center space-x-3 ">
          <p>Switch To : </p>
          <p
            className="font-bold cursor-pointer bg-blue-500 px-3 py-1 rounded-full"
            onClick={() => setIsListActive(!isListActive)}
          >
            {isListActive ? "Card" : "Table"}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 ">
        {isListActive ? (
          <>
            <h1 className="text-3xl font-bold text-white my-3">
              All Products{" "}
            </h1>
            <table className="min-w-full border border-gray-700 text-sm text-white">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 border border-gray-700 text-left">
                    Name
                  </th>
                  <th className="px-4 py-2 border border-gray-700 text-left">
                    Price
                  </th>
                  <th className="px-4 py-2 border border-gray-700 text-left">
                    Category
                  </th>
                  <th className="px-4 py-2 border border-gray-700 text-left">
                    Stock
                  </th>
                  <th className="px-4 py-2 border border-gray-700 text-left">
                    Description
                  </th>
                </tr>
              </thead>

              <tbody>
                {filterData.slice(page * 10 - 10 , page * 10).map((product, index) => (
                  <tr key={index} className="odd:bg-gray-900 even:bg-gray-800">
                    <td className="px-4 py-2 border border-gray-700">
                      {product.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      Rs. {product.price}
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      {product.category}
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      {product.stock}
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      {product.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="flex flex-col text-white space-y-5">
            <h1 className="text-3xl font-bold">All Products </h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-5 items-center ">
              {filterData.slice(page * 10 - 10 , page * 10).map((product, index) => (
                <div
                  key={index}
                  className="flex odd:bg-gray-900  even:bg-gray-800 space-y-2 border-2 border-gray-400 rounded-sm px-5 py-3 flex-col "
                >
                  <p>
                    <span className="font-bold">Name :</span> {product.name}
                  </p>
                  <p>
                    <span className="font-bold">Price :</span> Rs.{" "}
                    {product.price}
                  </p>
                  <p>
                    <span className="font-bold">Category :</span>{" "}
                    {product.category}
                  </p>
                  <p>
                    <span className="font-bold">Stock :</span> {product.stock}
                  </p>
                  <p>
                    <span className="font-bold">Discription :</span>{" "}
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {
      filterData.length > 0 && <div className="flex font-semibold items-center space-x-4 my-10 justify-center text-white">
        <button onClick={() => handlePage(page - 1)} 
        className={`px-3 py-1 rounded-full bg-blue-500 cursor-pointer `}>Prev</button>
        {
          [...Array(Math.ceil(filterData.length / 10))].map((_,index) =>{
            return <button onClick={() => handlePage(index + 1)} className={`px-3 py-1 border border-gray-300 hover:bg-white cursor-pointer active:bg-white active:text-gray-900 hover:text-gray-900 ${page === index + 1 ? "bg-blue-500 border-none" : ""}`}  key={index}>{index + 1} </button>
          })
        }
        <button onClick={() => handlePage(page + 1)}  className="px-3 py-1 rounded-full bg-blue-500  cursor-pointer">Next</button>
        </div>
        }
        {
          filterData.length === 0 && <p className="flex items-center justify-center font-semibold text-white">No item here</p>
        }
    </div>
  );
};

export default MainList;

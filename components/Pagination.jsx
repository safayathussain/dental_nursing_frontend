import React from "react";

const Pagination = ({
  data = [],
  itemsPerPage = 5,
  currentPage = 1,
  setCurrentPage = () => {},
  totalCount = data.length,
}) => {
  const totalPage = Math.ceil(totalCount / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPage) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row justify-between my-10 md:px-5">
        {/* Pagination */}
        <div className="flex justify-start md:justify-end items-center">
          <nav aria-label="Pagination">
            <ul className="inline-flex border rounded-lg divide-x">
              {/* Previous Button */}
              <li>
                <button
                  className={`py-3 px-4 text-primary rounded-l-lg text-xs sm:text-sm focus:outline-none ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.21091 11.925C5.91684 11.9249 5.63484 11.8021 5.42693 11.5836L0.991413 6.92261C0.78353 6.7041 0.666748 6.40777 0.666748 6.09879C0.666748 5.78981 0.78353 5.49349 0.991413 5.27497L5.42693 0.614033C5.52922 0.502742 5.65158 0.413971 5.78687 0.352903C5.92216 0.291834 6.06766 0.259689 6.2149 0.258345C6.36214 0.257 6.50815 0.286482 6.64443 0.345072C6.78071 0.403661 6.90451 0.490183 7.00863 0.59959C7.11275 0.708997 7.19508 0.839098 7.25084 0.982301C7.30659 1.1255 7.33465 1.27894 7.33337 1.43366C7.33209 1.58838 7.3015 1.74128 7.24339 1.88345C7.18527 2.02561 7.1008 2.15419 6.99489 2.26167L3.34335 6.09879L6.99489 9.93591C7.14992 10.0989 7.25549 10.3065 7.29826 10.5325C7.34102 10.7585 7.31907 10.9927 7.23516 11.2056C7.15125 11.4185 7.00916 11.6005 6.82684 11.7285C6.64453 11.8566 6.43019 11.9249 6.21091 11.925Z"
                      fill="#3C55A5"
                    />
                  </svg>
                </button>
              </li>
              {/* Page Numbers */}
              {currentPage > 1 && (
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="py-2 px-4 bg-white text-primary text-xs sm:text-sm hover:bg-gray-50 focus:outline-none"
                  >
                    {currentPage - 1}
                  </button>
                </li>
              )}
              <li>
                <button className="py-2 px-4 text-primary font-extrabold text-xs sm:text-sm focus:outline-none">
                  {currentPage}
                </button>
              </li>
              {currentPage < totalPage && (
                <li>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className="py-2 px-4 bg-white text-primary text-xs sm:text-sm hover:bg-gray-50 focus:outline-none"
                  >
                    {currentPage + 1}
                  </button>
                </li>
              )}
              {currentPage < totalPage - 1 && (
                <li className="py-1">
                  <span className=" px-4 bg-white text-primary text-xs sm:text-sm focus:outline-none cursor-not-allowed">
                    ...
                  </span>
                </li>
              )}
              {currentPage < totalPage - 1 && (
                <li>
                  <button
                    onClick={() => paginate(totalPage)}
                    className="py-2 px-4 bg-white text-primary text-xs sm:text-sm hover:bg-gray-50 focus:outline-none"
                  >
                    {totalPage}
                  </button>
                </li>
              )}
              {/* Next Button */}
              <li>
                <button
                  className={`py-3 px-4 text-primary rounded-r-lg text-xs sm:text-sm focus:outline-none ${
                    currentPage === totalPage
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPage}
                >
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.78925 11.925C1.56997 11.9249 1.35563 11.8566 1.17332 11.7285C0.991007 11.6005 0.848915 11.4185 0.765006 11.2056C0.681097 10.9927 0.659139 10.7585 0.701906 10.5325C0.744672 10.3065 0.850245 10.0989 1.00528 9.93591L4.65682 6.09879L1.00528 2.26167C0.899367 2.15419 0.81489 2.02561 0.756774 1.88345C0.698659 1.74128 0.668069 1.58838 0.66679 1.43366C0.66551 1.27894 0.693568 1.1255 0.749323 0.982301C0.805079 0.839098 0.887416 0.708997 0.991532 0.59959C1.09565 0.490183 1.21946 0.403661 1.35573 0.345072C1.49201 0.286482 1.63803 0.257 1.78526 0.258345C1.9325 0.259689 2.07801 0.291834 2.21329 0.352903C2.34858 0.413971 2.47094 0.502742 2.57323 0.614033L7.00875 5.27497C7.21663 5.49349 7.33341 5.78981 7.33341 6.09879C7.33341 6.40777 7.21663 6.7041 7.00875 6.92261L2.57323 11.5836C2.36532 11.8021 2.08332 11.9249 1.78925 11.925Z"
                      fill="#3C55A5"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

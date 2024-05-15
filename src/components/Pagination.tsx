"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  totalRows: number;
  offset: number;
  route: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRows,
  offset,
  route,
}) => {
  const itemsPerPage = 25;
  const currentPage = Math.floor(offset / itemsPerPage) + 1;
  const totalPages = Math.ceil(totalRows / itemsPerPage);
  const router = useRouter();

  const handlePageChange = (newOffset: number) => {
    router.push(`/${route}/?offset=${newOffset}`);
  };

  const paginationItems: (number | string)[] = [];

  // Determine which pages to display
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(i);
    }
  } else {
    if (currentPage > 2) {
      paginationItems.push(1);
      if (currentPage > 3) {
        paginationItems.push("...");
      }
    }

    if (currentPage > 1) {
      paginationItems.push(currentPage - 1);
    }

    paginationItems.push(currentPage);

    if (currentPage < totalPages) {
      paginationItems.push(currentPage + 1);
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        paginationItems.push("...");
      }
      paginationItems.push(totalPages);
    }
  }

  return (
    <div className="flex justify-center space-x-2">
      <button
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded"
        onClick={() => handlePageChange((currentPage - 2) * itemsPerPage)}
      >
        {"<"}
      </button>
      {paginationItems.map((item, index) => (
        <button
          key={index}
          className={`px-4 py-2 border rounded ${
            typeof item === "number" && item === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() =>
            typeof item === "number" &&
            handlePageChange((item - 1) * itemsPerPage)
          }
          disabled={typeof item !== "number"}
        >
          {item}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded"
        onClick={() => handlePageChange(currentPage * itemsPerPage)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;

const Pagination = ({ href, links }) => {
  return (
    <nav aria-label="">
      <ul className="flex items-center -space-x-px h-10 text-base mt-5 text-slate-800">
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight bg-white border-[1px] border-slate-300 rounded-l-lg"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={`${href}?page=${index}`}
              className={`flex items-center justify-center px-4 h-10 leading-tight ${
                link.active ? "bg-[#00f445] text-white" : "bg-white"
              } border-[1px] border-slate-300`}
            >
              {index + 1}
            </a>
          </li>
        ))}

        <li>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 leading-tight bg-white border-[1px] border-slate-300 rounded-r-lg"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

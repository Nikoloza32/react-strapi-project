import React, { useRef } from "react";
import { useGlobalContext } from "../context/context";
import sublinks from "../data";

const Submenu = () => {
  const { pageId, setPageId } = useGlobalContext();
  const currentPage = sublinks.find((item) => item.pageId === pageId);

  const submenuContainer = useRef(null);

  const handleMouseLeave = (event) => {
    const submenu = submenuContainer.current;
    const { left, right, bottom } = submenu.getBoundingClientRect();
    const { clientX, clientY } = event;

    if (clientX < left - 1 || clientY > right - 1 || clientY > bottom - 1) {
      setPageId(null);
    }
  };
  return (
    <div
      className={currentPage ? "submenu show-submenu" : "submenu"}
      ref={submenuContainer}
      onMouseLeave={handleMouseLeave}
    >
      <h5>{currentPage?.page}</h5>
      <div
        className="submenu-links"
        style={{
          gridAutoColumns: currentPage?.links?.length > 3 ? "1fr 1fr" : "1fr",
        }}
      >
        {currentPage?.links?.map((link) => {
          const { id, url, icon, label } = link;
          return (
            <a key={id} href={url}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Submenu;

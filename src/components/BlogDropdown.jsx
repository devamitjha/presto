import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import "./BlogDropdown.scss";

const BlogDropdown = ({ categories, currentPath, onSelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(categories[0].label);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Update selected label when path changes
    const activeCat = categories.find((c) => c.path === currentPath);
    if (activeCat) setSelected(activeCat.label);
  }, [currentPath, categories]);

  const toggleDropdown = () => setMenuOpen((prev) => !prev);

  const handleSelect = (cat) => {
    setSelected(cat.label);
    setMenuOpen(false);
    onSelect(cat.path);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="blog-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span>{selected}</span>
        <ChevronDown className={`chevron ${menuOpen ? "rotate" : ""}`} size={18} />
      </div>

      {menuOpen && (
        <div className="blog-dropdown-menu">
          {categories.map((cat) => (
            <div
              key={cat.path}
              className={`dropdown-item ${currentPath === cat.path ? "active" : ""}`}
              onClick={() => handleSelect(cat)}
            >
              {cat.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogDropdown;

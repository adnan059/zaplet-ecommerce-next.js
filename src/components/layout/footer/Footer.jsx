import { Facebook, Instagram, Phone } from "lucide-react";
import React from "react";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div>
          <h3 className="footerBrand">Zaplet</h3>
          <p className="footerDesc">
            Your favorite marketplace for awesome products.
          </p>
        </div>
        <div>
          <h4 className="footerSectionTitle">Explore</h4>
          <ul className="footerLinks">
            <li>
              <a href="/products">All Products</a>
            </li>
            <li>
              <a href="/categories">Categories</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/about">About Zaplet</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="footerSectionTitle">Stay Connected</h4>
          <div className="footerSocial">
            <a href="#" aria-label="Facebook">
              <Facebook />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="#" aria-label="Twitter">
              <Phone />
            </a>
          </div>
        </div>
      </div>
      <div className="footerCopyright">
        &copy; {new Date().getFullYear()} Zaplet. All rights reserved.
      </div>
    </footer>
  );
};

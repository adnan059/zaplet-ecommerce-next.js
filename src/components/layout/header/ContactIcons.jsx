import { Facebook, Instagram, Phone } from "lucide-react";
import React from "react";

const ContactIcons = () => {
  return (
    <div className=" headerContacts">
      <div className="headerContactContainer">
        <a href="#">
          <Facebook />
        </a>
        <a href="#">
          <Instagram />
        </a>
        <a href="#">
          <Phone />
        </a>
      </div>
    </div>
  );
};

export default ContactIcons;

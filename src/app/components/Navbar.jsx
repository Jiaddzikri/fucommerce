"use client";

import Cookies from "js-cookie";
import { apiGetSession } from "../lib/api-request";
import { useEffect, useState } from "react";
import CustomerNavbar from "./CustomerNavbar";
import GuestNavbar from "./GuestNavbar";

const Navbar = () => {
  const [navbar, setNavbar] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const token = Cookies.get("authsession");

  useEffect(() => {
    getUserSession();
  }, []);

  const getUserSession = async () => {
    setRequestLoading(true);
    try {
      const session = await apiGetSession(token);
      setNavbar(<CustomerNavbar user={session ?? {}} />);
    } catch (error) {
      setNavbar(<GuestNavbar />);
    } finally {
      setRequestLoading(false);
    }
  };

  return <div>{requestLoading ? "" : navbar}</div>;
};

export default Navbar;

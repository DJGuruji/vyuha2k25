import React, { useEffect, useState, useRef } from "react";
import axios from "../axios";
import Select from "react-select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "../css/Button.css";
import AOS from "aos";
import "aos/dist/aos.css";

const TicketAlumni = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const navigate = useNavigate();

  const options = [
    { value: "CSE", label: "CSE" },
    { value: "ECE", label: "ECE" },
    { value: "EEE", label: "EEE" },
    { value: "MECH", label: "MECH" },
    { value: "CIVIL", label: "CIVIL" },
  ];

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    collegeName: "",
    paymentProof: null,
    branch: "",
    passout: "",
  });

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  const resetValues = () => {
    setUser({
      name: "",
      email: "",
      mobileNumber: "",
      collegeName: "",
      paymentProof: null,
      branch: "",
      passout: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (fileInputRef2.current) {
      fileInputRef2.current.value = "";
    }
  };

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      setUser({ ...user, [e.target.name]: e.target.files[0] });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("mobileNumber", user.mobileNumber);
    formData.append("collegeName", user.collegeName);
    formData.append("branch", user.branch);
    formData.append("passout", user.passout);
    if (user.paymentProof) {
      formData.append("paymentProof", user.paymentProof);
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("/vyuha/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(
        "Registration Success! You will be redirected to home page within 2 seconds"
      );
      resetValues();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-5">
      <div
        className="w-full max-w-md p-8 backdrop-blur-lg text-white rounded-xl shadow-lg"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Ticket Rate: &#8377; &nbsp; 199 only
        </h2>
        <h2 className="text-lg font-semibold text-center text-white mb-6">
          Pay at UPI ID: example@oksbi
        </h2>
        <h2 className="text-lg font-semibold text-center text-white mb-6">
          Vyuha On Saturday, February 20 2025
        </h2>
        <p className="text-red-600 text-sm text-center mb-6">
          Every participant must bring their college ID card to participate in
          the Event
        </p>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Full Name */}
          <label htmlFor="name" className="block text-white font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-4"
          />

          <label
            htmlFor="mobileNumber"
            className="block text-white font-semibold mb-2"
          >
            Mobile Number
          </label>
          <input
            type="number"
            name="mobileNumber"
            value={user.mobileNumber}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-4"
          />

       
          <label htmlFor="email" className="block text-white font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-4"
          />

   
          <label
            htmlFor="collegeName"
            className="block text-white font-semibold mb-2"
          >
            College Name
          </label>
          <input
            type="text"
            name="collegeName"
            value={user.collegeName}
            onChange={handleInputChange}
            placeholder="College Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-4"
          />

      
          <label htmlFor="branch" className="block text-white font-semibold mb-2">
            Branch
          </label>
          <div className="mb-4">
            <Select
              options={options}
              onChange={(selectedOption) =>
                setUser({ ...user, branch: selectedOption.value })
              }
              placeholder="Select Branch"
            />
          </div>

    
          <label htmlFor="passout" className="block text-white font-semibold mb-2">
            Passout Year
          </label>
          <input
            type="text"
            name="passout"
            value={user.passout}
            onChange={handleInputChange}
            placeholder="YYYY"
            maxLength={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-4"
          />

      
          <label
            htmlFor="paymentProof"
            className="block text-white font-semibold mb-2"
          >
            Upload Payment Screenshot
          </label>
          <input
            type="file"
            name="paymentProof"
            onChange={handleInputChange}
            ref={fileInputRef2}
            className="w-full mb-4"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketAlumni;

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const NovaPoshtaForm = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const [cities, setCities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [suggestedCities, setSuggestedCities] = useState([]);
  const [suggestedDepartments, setSuggestedDepartments] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const handleFormSubmit = async (values) => {
    const requestBody = {
      ...values,
      itemName: nameOfItems,
      itemId: itemsId,
      itemSize: itemSize,
    };

    try {
      const response = await fetch("http://localhost:3001/users/delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      // Handle the response if needed
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    navigate(`succsess`);
  };

  const nameOfItems = cart.map((item) => item.name).join(" ,");
  const itemsId = cart.map((item) => item._id).join(" ,");
  const itemSize = cart.map((item) => item.sizes).join(" ,");

  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://api.novaposhta.ua/v2.0/json/Address/getCities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            modelName: "Address",
            calledMethod: "getCities",
            apiKey: "d6a803dc6d44fddcce6b67cd22c839cd",
            methodProperties: {},
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setCities(data.data);
      } else {
        console.error("Failed to fetch cities from Nova Poshta API");
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchDepartments = async (cities) => {
    try {
      const response = await fetch(
        "https://api.novaposhta.ua/v2.0/json/AddressGeneral/getWarehouses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            modelName: "AddressGeneral",
            calledMethod: "getWarehouses",
            apiKey: "d6a803dc6d44fddcce6b67cd22c839cd",
            methodProperties: {
              CityName: cities,
            },
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        return setDepartments(data.data);
      } else {
        console.error("Failed to fetch departments from Nova Poshta API");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleCityInputChange = (event, handleChange, setFieldValue) => {
    const input = event.target.value;
    handleChange("city")(event);

    // Filter cities based on the input value
    const filteredCities = cities.filter((city) =>
      city.Description.toLowerCase().includes(input.toLowerCase())
    );

    // Update the suggested cities based on the filter
    setSuggestedCities(filteredCities);
  };

  const handleDepartmentInputChange = (event, handleChange, setFieldValue) => {
    const input = event.target.value;
    handleChange("department")(event);

    // Filter departments based on the input value
    const filteredDepartments = departments.filter((department) =>
      department.Description.toLowerCase().includes(input.toLowerCase())
    );

    // Update the suggested departments based on the filter
    setSuggestedDepartments(filteredDepartments);
  };

  const handleCityClick = async (city, setFieldValue) => {
    setFieldValue("city", city.Description);
    setSuggestedCities([]); // Clear suggested cities

    // Fetch departments for the selected city
    try {
      const departmentsData = await fetchDepartments(city.Description);
      setSuggestedDepartments(departmentsData);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleDepartmentClick = (department, setFieldValue) => {
    console.log("Selected department:", department.Description);
    setFieldValue("department", department.Description);
    setSuggestedDepartments([]); // Clear suggested departments
  };

  return (
    <Box width="80%" m="100px auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="city">Населений пункт:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={values.city}
                onChange={(e) => {
                  handleCityInputChange(e, handleChange, setFieldValue);
                }}
                placeholder="Введіть назву населеного пункту"
              />
              {touched.city && errors.city && <div>{errors.city}</div>}
              {suggestedCities?.length > 0 && (
                <ul>
                  {suggestedCities.map((city) => (
                    <li
                      key={city.Ref}
                      onClick={() => handleCityClick(city, setFieldValue)}
                    >
                      {city.Description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <label htmlFor="department">Відділення Нової Пошти:</label>
              <input
                type="text"
                id="department"
                name="department"
                value={values.department}
                onChange={(e) => {
                  handleDepartmentInputChange(e, handleChange, setFieldValue);
                }}
                placeholder="Введіть відділення"
              />
              {touched.department && errors.department && (
                <div>{errors.department}</div>
              )}
              {suggestedDepartments?.length > 0 && (
                <ul>
                  {suggestedDepartments.map((department) => (
                    <li
                      key={department.Description}
                      onClick={() =>
                        handleDepartmentClick(department, setFieldValue)
                      }
                    >
                      {department.Description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <label htmlFor="name">Ім'я та Прізвище</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Введіть Ім'я та Прізвище"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && <div>{errors.name}</div>}
            </div>
            <div>
              <label htmlFor="phone">Телефон</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.phone && errors.phone && <div>{errors.phone}</div>}
            </div>
            <div>
              <button type="submit">Відправити</button>
            </div>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = Yup.object().shape({
  city: Yup.string().required("Населений пункт є обов'язковим"),
  department: Yup.string().required("Відділення є обов'язковим"),
  name: Yup.string().required("Ім'я та прізвище є обов'язковим"),
  phone: Yup.string().required("Телефон є обов'язковим"),
});

const initialValues = {
  city: "",
  department: "",
  name: "",
  phone: "",
};

export default NovaPoshtaForm;

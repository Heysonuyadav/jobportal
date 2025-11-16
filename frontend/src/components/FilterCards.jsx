import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Kolkata", "Jaipur", "Patna", "Noida", "Gurugram"],
  },
  {
    filterType: "Industry",
    array: ["IT", "Software Developer", "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    array: ["16.6 LPA", "To", "18.7 LPA"],
  },
];

const FilterCards = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full p-4 md:p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-3 text-center md:text-left">Filter Jobs</h2>
      <hr className="mb-4" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => {
          return (
            <div key={index} className="mb-6">
              <h1 className="font-semibold text-lg mb-2 text-gray-800">
                {data.filterType}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.array.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md shadow-sm hover:bg-gray-100 transition"
                    >
                      <RadioGroupItem
                        className="border-gray-500"
                        id={`${item}-${i}`}
                        value={item}
                      />
                      <Label htmlFor={`${item}-${i}`} className="cursor-pointer">
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FilterCards;

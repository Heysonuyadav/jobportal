import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup,RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'

const filterData = [
  {
    filterType: "location",
    array: ["Delhi", "Mumbai", "Kolkata", "Jaipur", "Patna", "Noida", "Gurugram"]

  },
  {
    filterType: "Industry",
    array: ["iT", "software developer", "full stack developer"]
  },
  {
    filterType: "salary",
    array: ["16.6 lpa", "to", "18.7 lpa"]
  }
]

const FilterCards = () => {
  const [selectedValue,setSelectedValue] = useState('');
  const dispatch = useDispatch()
  const changeHandler = (value) =>{
    setSelectedValue(value)
  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue))
  },[selectedValue]);
  return (
    <div>
      <h2>filterJobs</h2>
      <hr className='m-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index) => {
            return <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>

              {
                data.array.map((item, index) => {
                  const itemId = `id${index}`
                  return (
                    <div className='flex items-center space-x-2 mb-2'>
                      <RadioGroupItem className='border-gray-500' id={item} value={item} />
                      <Label htmlFor={item}>{item}</Label>
                    </div>

                  )
                })
              }
            </div>
          })
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCards

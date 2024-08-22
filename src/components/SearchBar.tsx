import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5';
import { useContext } from 'react';

import { AppContext } from '../context/GlobalContext';

const SearchBar = () => {

    const [input , setInput]=useState('');




    const inputContext = useContext(AppContext);

    if(inputContext===null) {
        throw new Error('Error Context not defined');
    } 

    const { data  , searchSetFilterData} = inputContext;


    const handleFilter = (e:any) => {
            e.preventDefault();
            const value = e.target.value
            console.log(input, "value is her ")
            setInput(e.target.value)
            const filteredData = data.filter (product => product.title.toLowerCase().includes(value.toLowerCase()))
            searchSetFilterData(filteredData);

    };

    
    

    return (

        <>
        <form className="flex items-center w-full  m-auto ">
            <input
                type="text"
                value={input}
                onChange={(e)=>handleFilter(e)}
                placeholder="Search products..."
                className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-[#2C3749] text-white p-4 h-[42px] rounded-tl-none rounded-br-[25px] rounded-tr-[25px] rounded-bl-none
              flex items-center justify-center rounded-r-md hover:bg-[#000] focus:outline-none focus:ring-2 focus:ring-blue-500">
                <IoSearch />
            </button>
        </form>

       
        </>
        
    )
}

export default SearchBar
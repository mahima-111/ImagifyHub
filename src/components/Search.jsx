import { useRef, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import {data} from "./data"
const BASE_URL="https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE=20;
const Search = () => {
    const inputRef=useRef("");
    const [images,setImages]=useState(data.results);
    
    const searchPics= async (inp)=>{
        try{
            const url=`${BASE_URL}?query=${inp}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_ACCESS_KEY}`
            const {data}=await axios.get(url);
            console.log(data);
            setImages(data.results);
        }
        catch(error){
            console.log(error);
        }
    }
    return (
    <div>
        <h1 className='text-center font-semibold text-4xl mb-2'>ImagifyHub</h1>
        <div className='flex justify-center mb-8'>
        <div className='border-2 border-black rounded-l-md bg-white'>
        <input ref={inputRef} type='text' placeholder='search for images..' className='w-[40vw] rounded-l-md focus:outline-none py-1 px-4'/>
        <button className=" py-2 px-2 text-black" onClick={()=>{
            inputRef.current.value="";
        }}><RxCross1/></button>
        </div>
        <button className="flex bg-blue-800 rounded-r-md py-2 px-8 text-white font-medium items-center" onClick={()=>{
            searchPics(inputRef.current.value)
        }}>Search</button>
        </div>
        {inputRef.current.value?<h1 className='text-center font-semibold text-3xl mb-4'>Images for {inputRef.current.value}</h1>:<h1 className='text-center font-semibold text-3xl mb-4'>Images for cats</h1>}
        <div className='grid grid-cols-4 gap-x-8 gap-y-12 justify-items-center'>
            {images.map((elem)=>{
                return <img className='object-cover rounded-md h-[15rem] w-[15rem]' key={elem.id} src={elem.urls.small} alt={elem.alt_desciption} />
            })}
        </div>
    </div>
    )
}

export default Search

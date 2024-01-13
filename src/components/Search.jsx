import { useRef, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from "axios";

const BASE_URL="https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE=80;

const Search = () => {
    const inputRef=useRef("");
    const [page,setPage]=useState(1);
    const [totalPages,setTotalPages]=useState(1);
    const [images,setImages]=useState([]);
    const [queryData,setQueryData]=useState("Search for any image !");

    const searchPics= async (inp)=>{
        try{
            setQueryData("Loading...");
            const url=`${BASE_URL}?query=${inp}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_ACCESS_KEY}`
            const {data}=await axios.get(url);
            setImages(data.results);
            setTotalPages(data.total_pages);
            if(data.total_pages===0){
                setQueryData("No images found! Search for something else..")
            }
        }
        catch(error){
            console.log(error);
            setImages([]);
            setQueryData(error.message);
        }
    }
    return (
    <div>
        <h1 className='text-center font-semibold text-4xl mb-2'>ImagifyHub</h1>
        <div className='flex w-full justify-center'>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-0 justify-center mb-16 w-[70vw] md:w-[60vw] lg:w-[50vw]'>
            <div className='border-2 border-black rounded-md sm:rounded-r-none bg-white flex justify-between basis-3/4' >
                <input ref={inputRef} type='text' placeholder='search for images..' className='rounded-md sm:rounded-r-none focus:outline-none py-1 px-4 w-full '/>
                <button className=" py-2 px-2 text-black" onClick={()=>{
                    inputRef.current.value="";
                }}><RxCross1 size={20}/></button>
            </div>
            <button className="flex bg-blue-700 rounded-md sm:rounded-l-none py-2 px-8 text-white font-medium  justify-center basis-1/4" onClick={()=>{
                setPage(1);
                setImages([]);
                searchPics(inputRef.current.value);
            }}>Search</button>
        </div>
        </div>
        
        {images.length===0 ? <div className='text-center text-2xl font-semibold '>{queryData}</div> : <div>
            <h1 className='text-center font-semibold text-3xl mb-4'>Images for {inputRef.current.value}</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 justify-items-center'>
                {images.map((elem)=>{
                    return <LazyLoadImage className='object-cover rounded-md h-[15rem] w-[15rem]' effect='blur' key={elem.id}  src={elem.urls.small} alt={elem.alt_desciption} />
                })}
            </div>
            <div className='flex justify-center mt-6'>
                <button className='px-6 py-1 rounded-md bg-blue-700 text-white font-semibold text-md sm:text-xl lg:py-2' onClick={()=>{
                    page===1 ? setPage(totalPages) : setPage(page-1);
                    searchPics(inputRef.current.value);
                }}>Prev</button>
                <h2 className='font-medium px-6 text-md sm:text-xl lg:2xl lg:py-2'>{`page ${page} of ${totalPages}`}</h2>
                <button className='px-6 rounded-md lg:py-2 bg-blue-700 text-white font-semibold text-md sm:text-xl' onClick={()=>{
                    page===totalPages ? setPage(1): setPage(page+1);
                    searchPics(inputRef.current.value);
                }}>Next</button>
            </div>
        </div>}
    </div>
    )
}

export default Search

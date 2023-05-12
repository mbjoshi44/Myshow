import React, {useEffect, useState} from 'react'
import "./heraBanner.scss";
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyloadimage/Img';

const HeroBanner = () => {
  const[background, setBackground] = useState("")
  const[query,setQuery] = useState("")
  const navigate = useNavigate();
  const {url} = useSelector((state) => state.home); 
  const{data , loading} = useFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path
          setBackground(bg);
          console.log(background);  
    // question? mark useing for optional chainig
    // we use if data is empty or undefined so its not generate error
  },[data]) // to getting background image from api calling and random images 
  //so use math objects
  const searchQueryHandler =(e) =>{
    //if user press enter then api call and string not empty both 
    //condition must check
    if(e.key === "Enter"  && query.length >0){
       navigate(`/search/${query}`)  //to navigate searchResurlt
       // with dynamic id or data
    }
  }
  return (
    <div className='heroBanner'>
   {!loading && <div className="backdrop-img">
      <Img src={background}/>
    </div>
   }

   <div className="opacity-layer"> </div>
  
         
          <div className='heroBannerContent'>
            <span className='title'>Welcome</span>
            <span className='subTitle'>
              Millions of movies, TV shows and people
              to discover.
              Explore now.
            </span>
            <div className='searchInput'>
              <input type='text'
              placeholder='Search for a movie or tv show....'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              />
              <button>Search</button>
            </div>
          </div>
          
         

    </div>
  )
}

export default HeroBanner
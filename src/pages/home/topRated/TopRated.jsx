import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContectWrapper'
 import SwtichTabs from '../../../components/switchTabs/SwtichTabs'
 import useFetch from '../../../hooks/useFetch'
 import Carousel from '../../../components/carousal/Carousel'
function TopRated() {
     const[endpoint,setEndPoint] = useState("movie"); 
     const{data,loading} = useFetch(`/${endpoint}/top_rated`);
    const onTabChange = (tab) =>{
        setEndPoint(tab === "Movies"?"movie":"tv");
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Top Rated</span>
            <SwtichTabs data = {["Movies","TV Shows"]}  onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data = {data?.results} loading ={loading} 
            endpoint ={endpoint}
        />
    </div>
  )
}

export default TopRated
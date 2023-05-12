import {useEffect } from 'react'
import {fetchDataFromApi} from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguretion, getGenres } from './store/homeSlice'
import { BrowserRouter,Route,Routes } from 'react-router-dom'


import Home from './pages/home/home';
import Footer from './components/footer/footer'
import Header from './components/header/header'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/searchResult'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'



function App() {
  const dispatch = useDispatch();
  const{ url } = useSelector((state) =>state.home);
    useEffect(()=>{
      fetchApiConfig();
      genresCall();
    },[])
    const fetchApiConfig = ()=>{
      fetchDataFromApi("/configuration").then((res) =>{
        console.log(res);

        const url ={
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        dispatch(getApiConfiguretion(url));
      });

    }

    const genresCall = async() =>{
      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {}

      endPoints.forEach((url) =>{
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
      });

      const data = await Promise.all(promises);
      console.log(data);
      data.map(({ genres }) =>{
        return genres.map((item) =>(allGenres[item.id] = item))
      })
      console.log(allGenres)
      dispatch(getGenres(allGenres));
    }
  return (
    <>
     <BrowserRouter>
     <Header/>
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/:mediaType/:id' element ={<Details/>}/>
        <Route path='/explore/:mediaType' element ={<Explore/>}/>
        <Route path='/*' element ={<PageNotFound/>}/>
        <Route path='/search/:query' element ={<SearchResult/>}/>
      </Routes>
      <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App

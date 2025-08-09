import "./ThemesList.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 6,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};


export const ThemesList = () => {
  return (
  <div style={{width: "95%", margin: "auto"}}>
    <Carousel 
    showDots={false} 
    responsive={responsive} 
    partialVisible={true} 
    slidesToSlide={1}
    swipeable
    draggable
    >
      {[1,1,1,1,1,1,1,1,1,1,1,1].map((index)=>(
        <div className="theme-container">
          <img className="image-circle" src="https://casablancaparis.com/cdn/shop/files/MF23-JTS-001-40_02_fe8fccb2-4e10-41d4-9be5-0f3ab2ebdb67.webp?v=1725408459" alt="theme"/>
          <h1>Anime</h1>
          <img style={{marginTop:"30px"}} className="image-circle" src="https://casablancaparis.com/cdn/shop/files/MF23-JTS-001-40_02_fe8fccb2-4e10-41d4-9be5-0f3ab2ebdb67.webp?v=1725408459" alt="theme"/>
          <h1>Anime</h1>
        </div>
      ))}
    </Carousel>
  </div>
  )
}



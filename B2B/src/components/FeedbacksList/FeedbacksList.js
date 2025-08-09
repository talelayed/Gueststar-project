import "./FeedbacksList.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Feedback } from "../Feedback/Feedback";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const FeedbacksList = () => {
  return (
    <div className="feedbacks">
        <Carousel 
        showDots={false} 
        responsive={responsive} 
        partialVisible={true} 
        slidesToSlide={1}
        swipeable
        draggable
        >
        {[1,1,1,1,1,1,1,1,1,1,1,1].map((index)=>(
            <Feedback />
        ))}
        </Carousel>
    </div>
  )
}

export default FeedbacksList

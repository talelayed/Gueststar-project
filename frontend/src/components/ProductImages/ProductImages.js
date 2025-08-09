import { useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./ProductImages.css"

export const ProductImages = (props) => {
  const [open, setOpen] = useState(false);
  const [mainImage, setMainImage] = useState("https://casablancaparis.com/cdn/shop/files/MF23-JTS-001-40_02_fe8fccb2-4e10-41d4-9be5-0f3ab2ebdb67.webp?v=1725408459");
  // ENSURES THAT IMAGE IN FOCUS WILL BE FIRST SHOWN IN LIGHTBOX
  const [imageIndex, setImageIndex] = useState(0);

  const handleThumbnailClick = (e) => {
    setMainImage(() => e.target.dataset.url);
    setImageIndex(() => Number(e.target.dataset.index));
  };

  return (
    <div className="gallery">
      <div className="img-wrapper">
        <div className="main-img">
          <img src={mainImage} alt="shoes" onClick={() => setOpen(true)} />
        </div>

        <div className="thumbnails">
          <img
            onClick={handleThumbnailClick}
            src="https://casablancaparis.com/cdn/shop/files/MF23-JTS-001-40_02_fe8fccb2-4e10-41d4-9be5-0f3ab2ebdb67.webp?v=1725408459"
            data-url="https://casablancaparis.com/cdn/shop/files/MF23-JTS-001-40_02_fe8fccb2-4e10-41d4-9be5-0f3ab2ebdb67.webp?v=1725408459"
            data-index="0"
            alt="shoes"
            className={
              mainImage === "https://casablancaparis.com/cdn/shop/files/MF23-JTS-001-40_02_fe8fccb2-4e10-41d4-9be5-0f3ab2ebdb67.webp?v=1725408459" ? "active-thumb" : ""
            }
          />
          <img
            onClick={handleThumbnailClick}
            src="/assets/images/tshirt png.png"
            data-url="/assets/images/tshirt png.png"
            data-index="1"
            alt="shoes"
            className={
              mainImage === "/assets/images/tshirt png.png" ? "active-thumb" : ""
            }
          />
          <img
            onClick={handleThumbnailClick}
            src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRRw5hIXhdasgejGnY6h2jqtQ4S9rWRmptYXcyW6fgpTM7AB5DElXsJOXdgRnUPD8anjxdyciBgMuIPLG3jfJD9YFQK13NXsqrmj_MFkup7JUuxAhoOTYS4SsI"
            data-url="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRRw5hIXhdasgejGnY6h2jqtQ4S9rWRmptYXcyW6fgpTM7AB5DElXsJOXdgRnUPD8anjxdyciBgMuIPLG3jfJD9YFQK13NXsqrmj_MFkup7JUuxAhoOTYS4SsI"
            data-index="2"
            alt="shoes"
            className={
              mainImage === "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRRw5hIXhdasgejGnY6h2jqtQ4S9rWRmptYXcyW6fgpTM7AB5DElXsJOXdgRnUPD8anjxdyciBgMuIPLG3jfJD9YFQK13NXsqrmj_MFkup7JUuxAhoOTYS4SsI" ? "active-thumb" : ""
            }
          />
          <img
            onClick={handleThumbnailClick}
            src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRRw5hIXhdasgejGnY6h2jqtQ4S9rWRmptYXcyW6fgpTM7AB5DElXsJOXdgRnUPD8anjxdyciBgMuIPLG3jfJD9YFQK13NXsqrmj_MFkup7JUuxAhoOTYS4SsI"
            data-url="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRRw5hIXhdasgejGnY6h2jqtQ4S9rWRmptYXcyW6fgpTM7AB5DElXsJOXdgRnUPD8anjxdyciBgMuIPLG3jfJD9YFQK13NXsqrmj_MFkup7JUuxAhoOTYS4SsI"
            data-index="3"
            alt="shoes"
            className={
              mainImage === "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRRw5hIXhdasgejGnY6h2jqtQ4S9rWRmptYXcyW6fgpTM7AB5DElXsJOXdgRnUPD8anjxdyciBgMuIPLG3jfJD9YFQK13NXsqrmj_MFkup7JUuxAhoOTYS4SsI" ? "active-thumb" : ""
            }
          />
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={imageIndex}
        slides={[
          {
            src: "https://casablancaparis.com/cdn/shop/files/MF23-JTS-001-40_02_fe8fccb2-4e10-41d4-9be5-0f3ab2ebdb67.webp?v=1725408459",
            alt: "image 1",
            width: 500,
            height: "auto",
          },
          {
            src: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRRw5hIXhdasgejGnY6h2jqtQ4S9rWRmptYXcyW6fgpTM7AB5DElXsJOXdgRnUPD8anjxdyciBgMuIPLG3jfJD9YFQK13NXsqrmj_MFkup7JUuxAhoOTYS4SsI",
            alt: "image 1",
            width: 500,
            height: "auto",
          },
          {
            src: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRRw5hIXhdasgejGnY6h2jqtQ4S9rWRmptYXcyW6fgpTM7AB5DElXsJOXdgRnUPD8anjxdyciBgMuIPLG3jfJD9YFQK13NXsqrmj_MFkup7JUuxAhoOTYS4SsI",
            alt: "image 1",
            width: 500,
            height: "auto",
          },
          {
            src: "https://casablancaparis.com/cdn/shop/files/MF23-JTS-001-40_02_fe8fccb2-4e10-41d4-9be5-0f3ab2ebdb67.webp?v=1725408459",
            alt: "image 1",
            width: 500,
            height: "auto",
          },
        ]}
      />
    </div>
  );
};
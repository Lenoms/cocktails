import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "./ImageSlider.css";
import { useState } from "react";

function ImageSlider({ versions }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const resetZoom = () => {
    const viewport = document.querySelector("meta[name=viewport]");
    if (viewport) {
      const originalContent = viewport.getAttribute("content");
      viewport.setAttribute("content", "width=device-width, initial-scale=1");
      setTimeout(() => {
        viewport.setAttribute("content", originalContent);
      }, 100);
    }
  };

  const closeModal = () => {
    setSelectedImageUrl(null);
    resetZoom();
  };

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const showArrowsAndDots = () => {
    const versionsWithImages = versions.filter(
      (version) => version.imgUrl,
    ).length;
    return loaded && instanceRef.current && versionsWithImages > 1;
  };

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {versions
            .filter((version) => version.imgUrl)
            .map((version, i) => {
              return (
                <img
                  key={version.imgUrl}
                  className={`keen-slider__slide numberslide${i} cocktail-info-image`}
                  src={version.imgUrl}
                  onClick={() => setSelectedImageUrl(version.imgUrl)}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
        </div>
        {showArrowsAndDots() && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {showArrowsAndDots() && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
      {selectedImageUrl && (
        <div className="image-zoom-modal" onClick={closeModal}>
          <div className="image-zoom-container">
            <img
              src={selectedImageUrl}
              alt="Zoomed cocktail"
              className="image-zoom-fullscreen"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="image-zoom-close"
              onClick={closeModal}
              aria-label="Close zoom"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default ImageSlider;

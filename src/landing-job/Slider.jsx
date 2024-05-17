import React from 'react';
import Slider from 'react-slick';
import './CourseCard.css';

const CourseSlider = ({ popular }) => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="course-slider">
      <Slider {...settings} className="pb-sm-5 mb-5 slick-slider-wrapper">
        {popular.map((course, index) => (
          <div className="item px-md-1" key={index}>
            <div className="course-card-inner course-cards">
              <div className="course-card-content">
                <h2 className="course-card-title">{course.title}</h2>
                <p className="course-card-description">{course.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CourseSlider;

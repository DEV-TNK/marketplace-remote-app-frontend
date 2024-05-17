import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import axios from "axios";
import CourseCard from "./CourseCard";
import { useGlobalContext } from "../../context/AuthContext";
import "./CourseCard.css"

const CourseSlider = ({ recommended, popular, trending, category }) => {
  const [jobs, setJobs] = useState([]);
  const { userId } = useGlobalContext();

  useEffect(() => {
    if (userId && (recommended)) {
      fetchData();
    }
  }, [userId, recommended]);

  // Fetch data from the API endpoint
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://unleashified-backend.azurewebsites.net/api/v1/seeker-recommendation/${userId}`
      );
      const data = response.data;

      // Update state with the fetched courses based on the type (recommended, popular, trending)
      if (recommended) {
        setJobs(data.recommendedJobs);
      }
      //  else if (popular) {
      //   setCourses(data.mostPopularCourses);
      // }
      //  else if (trending) {
      //   setCourses(data.trendingCourses);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    <Fragment>
      <Slider {...settings} className="pb-sm-5 mb-5 slick-slider-wrapper">
        {jobs.map((item, index) => (
          <div className="item px-md-1 course-card" key={item._id}>
            <CourseCard
              key={index}
              item={item}
              free={true}
              viewby="grid"
              showprogressbar={false}
              extraclass="mx-2"
              link={`/jobs/listing/?id=${item._id}`} // Adjust the link to match your routing
            />
          </div>
        ))}
      </Slider>
    </Fragment>
  );
};

CourseSlider.defaultProps = {
  recommended: false,
  popular: false,
  trending: false,
  category: null,
};

CourseSlider.propTypes = {
  recommended: PropTypes.bool,
  popular: PropTypes.bool,
  trending: PropTypes.bool,
  category: PropTypes.string,
};

export default CourseSlider;

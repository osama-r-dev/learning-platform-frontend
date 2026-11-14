import axios from "axios";
import React, { useEffect, useState } from "react";

function Rating({ course_id }) {
  const [rating, setRating] = useState(0);
  async function getRating() {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `http://127.0.0.1:8000/api/courses/${course_id}/rating/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response.data);
    setRating(response.data);
  }
  useEffect(() => {
    getRating();
  }, []);
  return (
    <div className=" flex gap-2 text-[18px] ">
      <span>{!rating ? 0 : rating}</span>
      <span>
        {Array.from({ length: 5 }, (_, i) => {
          return <Star key={i} rating={rating} i={i}></Star>;
        })}
      </span>
    </div>
  );
}

function Star({ i, rating }) {
  return (
    <span>
      {rating > i ? (
        <ion-icon
          style={{ color: "#fbbf24", fontSize: "20px" }}
          name="star"
        ></ion-icon>
      ) : (
        <ion-icon name="star-outline"></ion-icon>
      )}
    </span>
  );
}

export default Rating;

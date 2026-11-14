import React, { useEffect, useState } from "react";
import CourseDetails from "../CourseDetails/CourseDetails";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router";
import CourseListHam from "../CourseListHam/CourseListHam";
import VideoItem from "../VideoItem/VideoItem";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

function CourseViewer() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [course, setCourse] = useState({});
  const { course_Id } = useParams();
  async function getCourseContent() {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `http://127.0.0.1:8000/api/courses/${course_Id}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setVideoList(response.data.videos);
    setCourse(response.data);
    console.log(response.data.videos);
    if (response.data.videos.length > 0 && !currentVideo) {
      setCurrentVideo(`http://127.0.0.1:8000${response.data.videos[0].video}`);
    }
  }

  useEffect(() => {
    getCourseContent();
  }, []);

  function handleSetCurrentVideo(nextVideo) {
    setCurrentVideo(`http://127.0.0.1:8000${nextVideo}`);
  }

  return videoList.length > 0 ? (
    <div className="course-viwer">
      <CourseDetails course={course} />
      <VideoPlayer currentVideo={currentVideo}></VideoPlayer>

      <CourseListHam
        handleSetCurrentVideo={handleSetCurrentVideo}
        videoList={videoList}
        course={course}
      />
    </div>
  ) : (
    <div className="flex justify-center items-center ">
      <p>This course has no content</p>
    </div>
  );
}

export default CourseViewer;

// previous code
// import React, { useEffect, useState } from "react";
// import CourseDetails from "../CourseDetails/CourseDetails";
// import axios from "axios";
// import { useParams, useNavigate, Link } from "react-router";
// import CourseListHam from "../CourseListHam/CourseListHam";
// import VideoItem from "../VideoItem/VideoItem";

// function CourseViewer() {
//   const [currentVideo, setCurrentVideo] = useState("NO VIDEO");
//   const [videoList, setVideoList] = useState([]);
//   const [course, setCourse] = useState({});
//   const { course_Id } = useParams();
//   async function getCourseContent() {
//     const token = localStorage.getItem("accessToken");
//     const response = await axios.get(
//       `http://127.0.0.1:8000/api/courses/${course_Id}/`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     setVideoList(response.data.videos);
//     setCourse(response.data);
//     console.log(response.data.videos);
//   }
//   useEffect(() => {
//     getCourseContent();
//   }, []);

//   return (
//     <div className="course-viwer">
//       {videoList.map((video) => {
//         return (
//           <>
//             <video width="100%" controls>
//               <source
//                 src={`http://127.0.0.1:8000${video.video}`}
//                 type="video/mp4"
//               />
//             </video>
//             <p>{video.title}</p>
//             <CourseDetails course={course} />
//           </>
//         );
//       })}

//       <CourseListHam videoList={videoList} />
//     </div>
//   );
// }

// export default CourseViewer;

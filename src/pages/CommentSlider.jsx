
import React from "react";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import axios from "axios";


export default function CommentsSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:3001/comments");
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);


  return (
    <div className="w-full max-w-5xl mx-auto my-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-900 border-b-4 border-sky-300 inline-block pb-2">
          What Our Coustomers Say
        </h2>
      </div>

      <Slider {...settings} className="pb-12">
        {comments.map((comment, index) => (
          <div key={index} className="px-3 py-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 mx-auto max-w-2xl flex flex-col items-center text-center border-t-4 border-blue-400 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">

              {/* Background Wave Element */}
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50 to-transparent z-0"></div>

              <div className="relative mb-6 z-10 group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-30 transform scale-110"></div>
                <img
                  src={comment.image}
                  alt={comment.name}
                  className="relative w-24 h-24 rounded-full object-cover border-[3px] border-white shadow-lg mx-auto"
                />
                <div className="absolute bottom-0 right-0 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow border border-white">
                  {comment.rating}.0
                </div>
              </div>

              <div className="space-y-1 mb-6 z-10">
                <h3 className="text-xl font-bold text-blue-900">{comment.name}</h3>
                <div className="flex justify-center text-yellow-400 text-lg gap-0.5">
                  {"★".repeat(comment.rating)}
                  <span className="text-gray-200">
                    {"★".repeat(5 - comment.rating)}
                  </span>
                </div>
              </div>

              <div className="relative bg-blue-50/50 rounded-2xl p-6 w-full border border-blue-100/50 z-10">
                <span className="absolute top-2 left-3 text-5xl text-blue-200 opacity-60 font-serif leading-none">"</span>
                <p className="text-slate-600 italic leading-relaxed relative z-10 px-4 pt-2">
                  {comment.message}
                </p>
                <div className="w-full flex justify-end mt-2">
                  <div className="h-1 w-12 bg-blue-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

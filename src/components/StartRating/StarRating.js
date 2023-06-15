import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function StarRating({setRating,rating}){    
    const [hoverRating, setHoverRating] = useState(0);

    const getColor = (index) => {
      if (hoverRating >= index) {
        return "yellow";
      } else if (!hoverRating && rating >= index) {
        return "yellow";
      }

      return "gray";
    };

  const starRating =  Array(5).fill(0).map((_, i) => i + 1);

  return <div>
    {starRating.map((idx) => (
        <FontAwesomeIcon
          key={idx}
          className="cursor-pointer"
          icon={faStar}
          onClick={() => setRating(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />))}
    </div>;
};
    
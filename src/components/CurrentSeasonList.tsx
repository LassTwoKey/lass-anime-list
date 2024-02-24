import { FC } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";
import 'swiper/css';

interface CurrentSeasonItem {
  id: string | number
  title: {
    romaji: string
    native: string
  }
  coverImage: {
    large: string
  }
  meanScore: number
}

interface CurrentSeasonListProps {
  list: CurrentSeasonItem[]
}

export const CurrentSeasonList:FC<CurrentSeasonListProps> = (props) => {
  const { list } = props
  
  return (
    <div>
      <Swiper
        spaceBetween={32}
        slidesPerView='auto'
      >
        {list.map(item => (
        <SwiperSlide key={item.id} style={{width: 210}}>
          <Link to={`anime/${item.id}`} className="flex flex-col gap-4">
            <img src={item.coverImage.large} className="max-h-72" alt="" />
            <h3 className="whitespace-nowrap overflow-hidden text-ellipsis text-green-500 text-xl">{item.title.romaji}</h3>
          </Link>
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  )
}
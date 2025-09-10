import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "@/assets/styles/about.module.scss";
import { IAboutPageData } from "@/utils/api/types/screenTypes/aboutScreen.interface";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
type props = {
	data: IAboutPageData;
};

export const TeamSwiper = ({ data }: props) => {
	return (
		<Swiper
			onSwiper={(swiper) => {}}
			navigation={false}
			spaceBetween={30}
			slidesPerView={"auto"}
			className={styles.teamSec__swiper}
		>
			{data.TeamSection.Team.map((member, index) => (
				<SwiperSlide
					style={{ width: "300px" }}
					className={styles.teamSec__slide}
					key={member.id || `review-${index}`}
				>
					<>
						<Image
							src={process.env.NEXT_PUBLIC_URL + member.Image.url}
							alt={member.Image.alternativeText}
							width={member.Image.width}
							height={member.Image.height}
						/>
						<p className="itemTitle">{member.Name}</p>
						<p className={styles.teamSec__mainCardPost}>{member.Post}</p>
					</>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

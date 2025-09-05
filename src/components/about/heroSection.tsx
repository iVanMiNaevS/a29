import Image from "next/image";
import React, { useRef } from "react";
import styles from "@/assets/styles/about.module.scss";
import { IAboutPageData } from "@/utils/api/types/screenTypes/aboutScreen.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useCursorHover } from "@/hooks/useCursorHover";
type props = {
	data: IAboutPageData;
};

export const HeroSection = ({ data }: props) => {
	const hoverProps = useCursorHover(20);

	const swiperRef = useRef<SwiperType | null>(null);
	const goNext = () => {
		if (swiperRef.current) {
			swiperRef.current.slideNext();
		}
	};

	const goPrev = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev();
		}
	};
	return (
		<section className={styles.heroSection}>
			<div className={styles.heroSection__header}>
				<h1 className="sectionTitle">О нас</h1>
				<p className="h1">{data.HeroSection.Title}</p>
			</div>
			<div className={styles.heroSection__sliderSecWrapp}>
				<Image
					className={styles.heroSection__img}
					src={process.env.NEXT_PUBLIC_URL + data.HeroSection.Poster.url}
					placeholder="blur"
					blurDataURL={data.HeroSection.Poster.blurHash}
					width={data.HeroSection.Poster.width}
					height={data.HeroSection.Poster.height}
					alt={data.HeroSection.Poster.alternativeText}
				/>
				<div className={styles.heroSection__sliderWrapp}>
					<Swiper
						onSwiper={(swiper) => {
							swiperRef.current = swiper;
						}}
						navigation={false}
						modules={[Pagination, Autoplay]}
						spaceBetween={30}
						slidesPerView={1}
						loop
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
						className={styles.heroSection__swiper}
					>
						{data.HeroSection.Principles.map((principle, index) => (
							<SwiperSlide key={principle.id || `review-${index}`}>
								<div className={styles.heroSection__slideWrapp}>
									<p className={styles.heroSection__slideTitle + " itemTitle"}>
										{principle.Text}
									</p>
									<div className={styles.heroSection__personWrapp}>
										<Image
											src={
												process.env.NEXT_PUBLIC_URL + principle.Author.Image.url
											}
											width={principle.Author.Image.width}
											height={principle.Author.Image.height}
											alt={principle.Author.Image.alternativeText}
										/>
										<div className={styles.heroSection__personInfo}>
											<p className="itemTitle">{principle.Author.Name}</p>
											<pre>{principle.Author.Post}</pre>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className={styles.heroSection__navigation}>
						<div
							{...hoverProps}
							onClick={() => {
								goPrev();
							}}
						>
							<svg
								width="30"
								height="30"
								viewBox="0 0 30 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M22.1119 14.0627H4.6875C4.43886 14.0627 4.2004 14.1615 4.02459 14.3373C3.84877 14.5131 3.75 14.7516 3.75 15.0002C3.75 15.2488 3.84877 15.4873 4.02459 15.6631C4.2004 15.8389 4.43886 15.9377 4.6875 15.9377H22.1119L15.2737 22.774C15.0977 22.95 14.9988 23.1888 14.9988 23.4377C14.9988 23.6867 15.0977 23.9254 15.2737 24.1015C15.4498 24.2775 15.6885 24.3764 15.9375 24.3764C16.1865 24.3764 16.4252 24.2775 16.6012 24.1015L25.0387 15.664C25.1261 15.5769 25.1953 15.4734 25.2426 15.3595C25.2898 15.2456 25.3142 15.1235 25.3142 15.0002C25.3142 14.8769 25.2898 14.7548 25.2426 14.6409C25.1953 14.527 25.1261 14.4235 25.0387 14.3365L16.6012 5.89896C16.4252 5.72292 16.1865 5.62402 15.9375 5.62402C15.6885 5.62402 15.4498 5.72292 15.2737 5.89896C15.0977 6.07499 14.9988 6.31375 14.9988 6.56271C14.9988 6.81166 15.0977 7.05042 15.2737 7.22646L22.1119 14.0627Z"
									fill="#8e9194"
								></path>
							</svg>
						</div>
						<div
							{...hoverProps}
							onClick={() => {
								goNext();
							}}
						>
							<svg
								width="30"
								height="30"
								viewBox="0 0 30 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M22.1119 14.0627H4.6875C4.43886 14.0627 4.2004 14.1615 4.02459 14.3373C3.84877 14.5131 3.75 14.7516 3.75 15.0002C3.75 15.2488 3.84877 15.4873 4.02459 15.6631C4.2004 15.8389 4.43886 15.9377 4.6875 15.9377H22.1119L15.2737 22.774C15.0977 22.95 14.9988 23.1888 14.9988 23.4377C14.9988 23.6867 15.0977 23.9254 15.2737 24.1015C15.4498 24.2775 15.6885 24.3764 15.9375 24.3764C16.1865 24.3764 16.4252 24.2775 16.6012 24.1015L25.0387 15.664C25.1261 15.5769 25.1953 15.4734 25.2426 15.3595C25.2898 15.2456 25.3142 15.1235 25.3142 15.0002C25.3142 14.8769 25.2898 14.7548 25.2426 14.6409C25.1953 14.527 25.1261 14.4235 25.0387 14.3365L16.6012 5.89896C16.4252 5.72292 16.1865 5.62402 15.9375 5.62402C15.6885 5.62402 15.4498 5.72292 15.2737 5.89896C15.0977 6.07499 14.9988 6.31375 14.9988 6.56271C14.9988 6.81166 15.0977 7.05042 15.2737 7.22646L22.1119 14.0627Z"
									fill={"#8e9194"}
								></path>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

import React, { useRef, useState } from "react";
import { IReview } from "@/utils/api/types/review.interface";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";
import Image from "next/image";
import styles from "@/assets/styles/Home.module.scss";

import arrow from "@/assets/icons/review_arrow.1721e813.svg";
import { useCursorHover } from "@/hooks/useCursorHover";

type props = {
	reviews: IReview[];
};

export const ReviewsSection = ({ reviews }: props) => {
	const [activeReviewIndex, setActiveReviewIndex] = useState(0);
	const [activeReview, setActiveReview] = useState<IReview>();
	const swiperRef = useRef<SwiperType | null>(null);

	const hoverProps = useCursorHover(20);

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
		<section className={styles.reviewsSection}>
			<h2>Отзывы наших клиентов</h2>
			<div className={styles.reviewsSection__reviewsWrapp}>
				<div className={styles.reviewsSection__swiperWrapp}>
					<Swiper
						onSwiper={(swiper) => {
							setActiveReviewIndex(swiper.activeIndex);
							setActiveReview(reviews[swiper.activeIndex]);
							swiperRef.current = swiper;
						}}
						navigation={false}
						modules={[Pagination, Autoplay]}
						spaceBetween={30}
						slidesPerView={1}
						onSlideChange={(swiper) => {
							setActiveReviewIndex(swiper.activeIndex);
							setActiveReview(reviews[swiper.activeIndex]);
						}}
						onInit={(swiper) => {
							setActiveReviewIndex(swiper.activeIndex);
							setActiveReview(reviews[swiper.activeIndex]);
						}}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
						className={styles.reviewsSection__swiper}
					>
						{reviews.map((review, index) => (
							<SwiperSlide
								className={styles.reviewsSection__slide}
								key={review.id || `review-${index}`}
							>
								<h3>{review.Project.Title}</h3>
								<div className={styles.reviewsSection__info}>
									<p>{review.Text}</p>
									<div className={styles.reviewsSection__infoFooter}>
										<p>{review.Author}</p>
										<Link href={review.YandexHref}>
											Отзыв на яндекс{" "}
											<Image alt="стрелка" src={arrow} width={10} height={10} />
										</Link>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className={styles.reviewsSection__reviewsWrappFooter}>
						<Link href={"/" + activeReview?.Project.Slug}>Смотреть проект</Link>
						<div className={styles.reviewsSection__navigation}>
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
										fill={activeReviewIndex === 0 ? "#8e9194" : "#252324"}
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
										fill={
											activeReviewIndex === reviews.length - 1
												? "#8e9194"
												: "#252324"
										}
									></path>
								</svg>
							</div>
						</div>
					</div>
				</div>
				{activeReview?.Project?.Poster ? (
					<Image
						className={styles.reviewsSection__img}
						src={process.env.NEXT_PUBLIC_URL + activeReview.Project.Poster.url}
						width={activeReview.Project.Poster.width}
						height={activeReview.Project.Poster.height}
						alt={activeReview.Project.Poster.alternativeText}
						placeholder="blur"
						blurDataURL={activeReview.Project.Poster.blurHash}
					/>
				) : (
					""
				)}
			</div>
		</section>
	);
};

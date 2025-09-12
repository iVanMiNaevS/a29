import { useCursorHover } from "@/hooks/useCursorHover";
import { IImageFormat } from "@/utils/api/types/image.interface";
import React, { useRef } from "react";
import styles from "@/assets/styles/shared/modalGallery.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
type props = {
	imgs: IImageFormat[];
	onClose: () => void;
	isOpen: boolean;
	initialSlide: number;
};

export const ModalGallery = ({
	imgs,
	onClose,
	isOpen,
	initialSlide,
}: props) => {
	if (!isOpen) return null;
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
	const handleOutsideClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};
	return (
		<div
			className={
				styles.modalGallery__container + " " + `${isOpen ? styles.open : ""}`
			}
			onClick={handleOutsideClick}
		>
			<div className={styles.modalGallery} onClick={handleOutsideClick}>
				<button
					onClick={onClose}
					{...hoverProps}
					className={styles.modalGallery__closeBtn}
				>
					<svg
						width="30"
						height="30"
						viewBox="0 0 30 30"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8 23.75L6.25 22L13.25 15L6.25 8L8 6.25L15 13.25L22 6.25L23.75 8L16.75 15L23.75 22L22 23.75L15 16.75L8 23.75Z"
							fill="#252324"
						></path>
					</svg>
				</button>
				<div
					className=""
					style={{
						position: "relative",
						width: "fit-content",
					}}
				>
					<Swiper
						onSwiper={(swiper) => {
							swiperRef.current = swiper;
						}}
						spaceBetween={30}
						initialSlide={initialSlide}
						slidesPerView={"auto"}
						className={styles.modalGallery__swiper}
					>
						{imgs.map((img, index) => (
							<SwiperSlide
								style={{ width: "100%", maxWidth: "600px" }}
								className={styles.modalGallery__slide}
								key={img.id || `img-${index}`}
							>
								<Image
									src={process.env.NEXT_PUBLIC_URL + img.url}
									alt={img.alternativeText}
									width={img.width}
									height={img.height}
									blurDataURL={img.blurHash}
									placeholder="blur"
								/>
							</SwiperSlide>
						))}
					</Swiper>
					<button
						onClick={() => {
							goPrev();
						}}
						{...hoverProps}
						className={
							styles.modalGallery__row + " " + styles.modalGallery__rowLeft
						}
					>
						<svg
							width="12"
							height="14"
							viewBox="0 0 12 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.45199 1.57999L3.51299 0.519991L9.29199 6.29699C9.38514 6.38956 9.45907 6.49963 9.50952 6.62088C9.55997 6.74213 9.58594 6.87216 9.58594 7.00349C9.58594 7.13482 9.55997 7.26485 9.50952 7.3861C9.45907 7.50735 9.38514 7.61742 9.29199 7.70999L3.51299 13.49L2.45299 12.43L7.87699 7.00499L2.45199 1.57999Z"
								fill="white"
							></path>
						</svg>
					</button>
					<button
						onClick={() => {
							goNext();
						}}
						{...hoverProps}
						className={
							styles.modalGallery__row + " " + styles.modalGallery__rowRight
						}
					>
						<svg
							width="12"
							height="14"
							viewBox="0 0 12 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.45199 1.57999L3.51299 0.519991L9.29199 6.29699C9.38514 6.38956 9.45907 6.49963 9.50952 6.62088C9.55997 6.74213 9.58594 6.87216 9.58594 7.00349C9.58594 7.13482 9.55997 7.26485 9.50952 7.3861C9.45907 7.50735 9.38514 7.61742 9.29199 7.70999L3.51299 13.49L2.45299 12.43L7.87699 7.00499L2.45199 1.57999Z"
								fill="white"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

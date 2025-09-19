import React, { useRef, useState } from "react";
import styles from "@/assets/css/shared/modal.module.scss";
import Image from "next/image";
import closeIcon from "@/assets/images/icons/close.svg";
import { useCursorHover } from "@/hooks/useCursorHover";
import tel from "@/assets/images/icons/phone.svg";
import email from "@/assets/images/icons/email.svg";
import copy from "@/assets/images/icons/copy.svg";

import activeCheckbox from "@/assets/images/icons/check_active.svg";
import checkbox from "@/assets/images/icons/check.svg";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	closeOnOutsideClick: boolean;
};

export const Modal = ({ isOpen, onClose, closeOnOutsideClick }: ModalProps) => {
	const hoverProps = useCursorHover(20);
	const [openCopy, setOpenCopy] = useState(false);
	const [phone, setPhone] = useState("+");
	const emailText = "a29studio@yandex.ru";
	const [isChecked, setIsChecked] = useState(false);
	const handleOutsideClick = (e: React.MouseEvent) => {
		if (closeOnOutsideClick && e.target === e.currentTarget) {
			onClose();
		}
	};
	const formatPhoneNumber = (value: string): string => {
		const numbers = value.replace(/[^\d+]/g, "");

		if (!numbers.startsWith("+")) {
			return phone;
		}

		const digits = numbers.substring(2);

		let formatted = "+7 (";

		if (digits.length > 0) {
			formatted += digits.substring(0, 3);
		}
		if (digits.length > 3) {
			formatted += ") " + digits.substring(3, 6);
		}
		if (digits.length > 6) {
			formatted += "-" + digits.substring(6, 8);
		}
		if (digits.length > 8) {
			formatted += "-" + digits.substring(8, 10);
		}

		return formatted;
	};
	const validatePhone = (phoneNumber: string) => {
		const digitsOnly = phoneNumber.replace(/\D/g, "");

		if (digitsOnly.length !== 11) return false;

		if (!digitsOnly.startsWith("7") && !digitsOnly.startsWith("8"))
			return false;

		return true;
	};
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const input = e.target.value;

		const formattedPhone = formatPhoneNumber(input);
		setPhone(formattedPhone);
	};
	return (
		<div
			className={styles.modal__container + " " + `${isOpen ? styles.open : ""}`}
			onClick={handleOutsideClick}
		>
			<div className={styles.modal}>
				<button
					onClick={onClose}
					{...hoverProps}
					className={styles.modal__closeBtn}
				>
					<Image src={closeIcon} width={20} height={20} alt="Закрыть" />
				</button>
				<div className={styles.modal__header}>
					<p className={styles.modal__headerTitle}>
						Узнать подробности разработки вашего индивидуального проекта или
						назначить встречу для личного знакомства
					</p>
					<div className={styles.modal__contactDataWrapp}>
						<a
							{...hoverProps}
							target="_blank"
							href="tel:+79290672929"
							className={styles.modal__contactData}
						>
							<Image src={tel} width={25} height={25} alt="телефон" />
							+7 (929) 067-29-29
						</a>
						<div {...hoverProps} className={styles.modal__contactData}>
							<Image src={email} width={25} height={25} alt="почта" />
							<p
								onClick={() => {
									navigator.clipboard.writeText(emailText).then(() => {
										setOpenCopy(true);

										setTimeout(() => {
											setOpenCopy(false);
										}, 1500);
									});
								}}
								className={styles.modal__email}
							>
								<span
									style={{ opacity: openCopy ? "1" : "0" }}
									className={styles.modal__copy + " textSmall"}
								>
									Скопировано
								</span>
								{emailText}{" "}
								<Image src={copy} width={13} height={13} alt="скопировать" />
							</p>
						</div>
					</div>
				</div>
				<div className={styles.modal__body}>
					<p>
						Или оставьте номер телефона/WhatsApp/Telegram и мы свяжемся с вами в
						ближайшее время
					</p>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (!validatePhone(phone)) alert("укажите верный номер телефона");
						}}
					>
						<div className={styles.modal__inputWrapp}>
							<input
								value={phone}
								onChange={handlePhoneChange}
								type="tel"
								placeholder="+7 (999) 999-1234"
								required
								autoComplete="tel"
								inputMode="tel"
								min="17"
								max="17"
								name="phone"
							/>
							<Image src={tel} alt="Phone" width={20} height={20} />
						</div>
						<textarea
							style={{ resize: "none" }}
							name="comment"
							placeholder="Задать вопрос"
							required
						></textarea>
						<div className={styles.modal__checkBoxContainer}>
							<input type="checkbox" id="access" />
							<Image
								width={20}
								height={20}
								className={styles.customCheckbox}
								onClick={() => setIsChecked((prev) => !prev)}
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										setIsChecked((prev) => !prev);
									}
								}}
								{...hoverProps}
								alt={isChecked ? "согласен" : "не согласен"}
								src={isChecked ? activeCheckbox.src : checkbox.src}
							/>
							<label htmlFor={"access"}>
								<div className={styles.modal__checkBoxContainerText}>
									Даю{" "}
									<span {...hoverProps}>
										<a
											download
											href={"/documents/polzovatelskoe-soglashenie.docx"}
										>
											согласие
										</a>
									</span>{" "}
									на обработку персональных данных в соответсвии с{" "}
									<span {...hoverProps}>
										<a
											download
											href={"/documents/politika-konfidenczialnosti.docx"}
										>
											политикой конфиденциальности
										</a>
									</span>
								</div>
							</label>
						</div>
						<button
							{...hoverProps}
							disabled={!isChecked}
							className={
								styles.modal__btn + ` ${isChecked ? styles.active : ""}`
							}
						>
							Отправить
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

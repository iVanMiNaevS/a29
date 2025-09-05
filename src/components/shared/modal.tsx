import React, { useRef, useState } from "react";
import styles from "@/assets/styles/shared/modal.module.scss";
import Image from "next/image";
import closeIcon from "@/assets/icons/close.d31d0f2a.svg";
import { useCursorHover } from "@/hooks/useCursorHover";
import tel from "@/assets/icons/phone.5f08591e.svg";
import email from "@/assets/icons/email.387c482c.svg";
import copy from "@/assets/icons/copy.a16bb489.svg";
type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	closeOnOutsideClick: boolean;
};

export const Modal = ({ isOpen, onClose, closeOnOutsideClick }: ModalProps) => {
	const hoverProps = useCursorHover(20);
	const [openCopy, setOpenCopy] = useState(false);
	const [phone, setPhone] = useState("+");
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

		// Извлекаем цифры после +7
		const digits = numbers.substring(2);

		// Форматируем номер
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
						Узнать подробности разработки проекта или назначить встречу для
						личного знакомства
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
									navigator.clipboard
										.writeText("pa29studio@yandex.ru")
										.then(() => {
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
								pa29studio@yandex.ru{" "}
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
					<form>
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
						<textarea name="comment" placeholder="Задать вопрос"></textarea>
						<div className={styles.modal__checkBoxContainer}>
							<input
								type="checkbox"
								id="access"
								checked={isChecked}
								onChange={() => {
									setIsChecked((prev) => !prev);
								}}
							/>
							<label htmlFor={"access"}>
								<div className="">
									Даю <span>согласие</span> на обработку персональных данных в
									соответсвии с <span>политикой конфиденциальности</span>
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

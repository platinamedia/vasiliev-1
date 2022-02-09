import { BodyNormal, GreenButtonMedium, Title, WhiteButtonMedium, } from '../..'
import React, { useState } from 'react'

import Modal from '@mui/material/Modal'
import styles from './ModalWindowSuccess.module.scss'

const ModalWindowSuccess = ({ stateModal = false, newTariff }) => {
    const [open, setOpen] = useState(stateModal);
    const handleClose = () => setOpen(false);
    const handleClick = () => { window.open(`https://t.me/prclub_pro`) }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={styles.ModalWindowSuccess__box}>
                    <div className={styles.ModalWindowSuccess__message}>
                        <div className={styles.ModalWindowSuccess__message_warning}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.8886 3.37061C12.1776 1.17298 16.0444 0 20 0C25.3043 0 30.3914 
                                        2.10714 34.1421 5.85786C37.8929 9.60859 40 14.6957 40 20C40 23.9556 38.827 27.8224 36.6294 31.1114C34.4318 34.4004 
                                        31.3082 36.9638 27.6537 38.4776C23.9992 39.9913 19.9778 40.3874 16.0982 39.6157C12.2186 38.844 8.65492 36.9392 5.85787 
                                        34.1421C3.06082 31.3451 1.15601 27.7814 0.384303 23.9018C-0.387401 20.0222 0.00866591 16.0009 1.52242 12.3463C3.03617 
                                        8.69181 5.59962 5.56823 8.8886 3.37061ZM10.4212 34.3357C13.2565 36.2302 16.59 37.2414 20 37.2414C22.2642 37.2414 24.5062 
                                        36.7954 26.598 35.929C28.6898 35.0625 30.5905 33.7925 32.1915 32.1915C33.7925 30.5905 35.0625 28.6898 35.929 26.598C36.7954 
                                        24.5062 37.2414 22.2642 37.2414 20C37.2414 16.59 36.2302 13.2565 34.3357 10.4212C32.4412 7.58587 29.7484 5.376 26.598 
                                        4.07104C23.4475 2.76608 19.9809 2.42465 16.6364 3.08991C13.2919 3.75517 10.2198 5.39725 7.80851 7.8085C5.39726 10.2198 
                                        3.75518 13.2919 3.08992 16.6364C2.42466 19.9809 2.76609 23.4475 4.07105 26.598C5.37601 29.7484 7.58588 32.4412 10.4212 
                                        34.3357ZM17.534 23.3379L27.134 13.7447V13.7378C27.3928 13.479 27.7438 13.3336 28.1099 13.3336C28.4759 13.3336 28.8269 
                                        13.479 29.0857 13.7378C29.3445 13.9967 29.4899 14.3477 29.4899 14.7137C29.4899 15.0797 29.3445 15.4308 29.0857 15.6896L18.5133 
                                        26.2965C18.3852 26.4247 18.2331 26.5265 18.0656 26.5959C17.8982 26.6653 17.7187 26.701 17.5374 26.701C17.3562 26.701 
                                        17.1767 26.6653 17.0093 26.5959C16.8418 26.5265 16.6897 26.4247 16.5616 26.2965L10.8375 20.5723C10.5786 20.3135 10.4332 
                                        19.9625 10.4332 19.5965C10.4332 19.2305 10.5786 18.8794 10.8375 18.6206C11.0963 18.3618 11.4473 18.2164 11.8133 18.2164C12.1793 
                                        18.2164 12.5304 18.3618 12.7892 18.6206L17.534 23.3379Z" fill="white" />
                            </svg>
                        </div>
                        <div className={styles.ModalWindowSuccess__message_title}>
                            <Title>{newTariff} оплачен!</Title>
                        </div>
                        <div className={styles.ModalWindowSuccess__message_text}>
                            <BodyNormal>Подпишись на Телеграм-канал, <br /> чтобы не пропускать новости</BodyNormal>
                        </div>
                        <div className={styles.ModalWindowSuccess__buttons}>
                            <div onClick={handleClose}>
                                <GreenButtonMedium flyImg={false} className={styles.ModalWindowSuccess__close}>Закрыть</GreenButtonMedium>
                            </div>
                            <div onClick={handleClick}>
                                    <WhiteButtonMedium flyImg={false} className={styles.ModalWindowSuccess__next}>Подписаться</WhiteButtonMedium>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ModalWindowSuccess
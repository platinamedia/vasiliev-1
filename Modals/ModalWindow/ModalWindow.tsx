import React, { useState } from 'react'

import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import { Title } from '../..'
import classNames from 'classnames'
import styles from './ModalWindow.module.scss'

const ModalWindow = ({ videoURL, header, className, openContent, openState=false }: any) => {
    const [open, setOpen] = useState(false || openState)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <div onClick={handleOpen}>{openContent}</div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <div className={classNames(styles['ModalWindow'], className)}>
                    <div className={styles.ModalWindow__position_x}>
                        <div onClick={handleClose} className={styles.ModalWindow__close}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.32191 14.1276C-0.106452 14.556 -0.106386 15.2504 0.322042 15.6788C0.75047 16.1071 1.44502 16.1071 1.87337 15.6787L8.00014 9.55129L14.1274 15.6781C14.5558 16.1064 15.2504 16.1064 15.6787 15.6781C16.1071 15.2498 16.1071 14.5552 15.6787 14.1269L9.55135 7.99998L15.6783 1.87242C16.1065 1.44402 16.1065 0.749525 15.6781 0.321206C15.2497 -0.107123 14.5551 -0.107058 14.1268 0.321338L7.99992 6.44878L1.87262 0.321864C1.44424 -0.106487 0.74968 -0.106487 0.321296 0.321864C-0.107099 0.750227 -0.107099 1.44472 0.321296 1.87309L6.44882 8.00009L0.32191 14.1276Z" fill="#8B97AE" />
                            </svg>
                        </div>
                    </div>
                    <div className={styles.VideoWindow}>
                        <div className={styles.VideoWindow__container}>
                            <div className={styles.VideoWindow__container_head}>
                                <Title>
                                    <span className={styles.VideoWindow__container_head_dark} >{header}</span>
                                </Title>
                            </div>
                            <div className={styles.VideoWindow__container_video}>
                                <iframe width="100%" height="100%"
                                    src={videoURL}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                >
                                </iframe>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default ModalWindow
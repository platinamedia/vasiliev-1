import { Button, Title } from "../../components";
import { ImgLoader, TimerAllDays } from "../../modules";

import Image from "next/image";
import styles from "./ListGrid.module.scss";

const ListGrid: React.FC = () => {
  const List = [
    {
      time: "February, 21, 2022 00:00:00",
      text: "Получи 100 подписчиков в свой Instagram",
      status: false,
      link: "",
    },
    {
      time: "February, 01, 2022 00:00:00",
      text: "Получи +3 месяца подписки в подарок",
      status: true,
      link: "",
    },
    {
      time: "February, 02, 2022 00:00:00",
      text: "Получи 100 подписчиков в свой Instagram",
      status: false,
      link: "",
    },
  ];

  return (
    <div className={styles.ListGrid}>
      <div className={styles.ListGrid__container}>
        <div className={styles.Cards}>
          {List.map((item: any, i: number) => {
            return (
              <div key={i} className={styles.Card}>
                <div className={styles.Card__container}>
                  <div className={styles.Card__time}>
                    <div>
                      <Image
                        loader={ImgLoader}
                        src={"/images/svg/promo/time.svg"}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <Title>
                        Осталось{" "}
                        <TimerAllDays Secounds={true} DayZ={item.time} />
                      </Title>
                    </div>
                  </div>
                  <div className={styles.Card__text}>
                    <Title>{item.text}</Title>
                  </div>
                  <div>
                    <div className={styles.Card__about}>
                      <Button
                        color={"pink"}
                        flyImg={true}
                        className={styles.Btn_middle}
                      >
                        Узнать подробнее
                      </Button>
                      <>
                        {item.status && (
                          <div className={styles.Card__actual}>
                            <div>
                              <Image
                                loader={ImgLoader}
                                src={"/images/svg/promo/done.svg"}
                                width={22}
                                height={22}
                              />
                            </div>
                            <div>
                              <Title>Уже активно</Title>
                            </div>
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListGrid;

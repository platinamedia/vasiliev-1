import { BodyBold, Button, Headline, Title } from "../../components";
import { useEffect, useState } from "react";

import Image from "next/image";
import { ImgLoader } from "../../modules";
import Link from "next/link";
import { countPromo } from "../../api/countPromo";
import styles from "./ListHorizontal.module.scss";
import { typeAccount } from "../../lib/typeAccount.hook";

const ListHorizontal: React.FC = () => {
  const [count] = countPromo();
  const { checkTarrifs } = typeAccount();

  const List = [
    {
      header: "Предложение дня!",
      actual: `Осталось ${count?.count} из 1100 мест!`,
      text: "Получи на свой личный Instagram 10 000 и более ЖИВЫХ подписчиков за счёт технологии «РЕВОЛЬВЕР» по цене ужина в ресторане",
      about: "1 подписчик = 1 рубль",
      status: true,
      link: "/promo-offer/promo-day",
    },
  ];
  return (
    <>
      {count &&
        List.map((item: any, i: number) => {
          return (
            <div key={i}>
              <div className={styles.ListHorizontal}>
                <div className={styles.ListHorizontal__container}>
                  <div className={styles.ListHorizontal__header}>
                    <Headline>{item.header}</Headline>
                  </div>
                  <div className={styles.ListHorizontal__actual}>
                    <Title className={styles.Pink_text}>{item.actual}</Title>
                  </div>
                  <div className={styles.ListHorizontal__text}>
                    <Title>{item.text}</Title>
                  </div>
                  <div className={styles.ListHorizontal__about}>
                    <BodyBold>{item.about}</BodyBold>
                  </div>
                  <div className={styles.ListHorizontal__status}>
                    <div className={styles.ListHorizontal__next}>
                      <Link href="/promo-offer/promo-day">
                        <a>
                          <Button color={"pink"} flyImg={true}>
                            Узнать подробнее
                          </Button>
                        </a>
                      </Link>
                    </div>
                    {item.status && (
                      <div className={styles.ListHorizontal__done}>
                        {checkTarrifs && (
                          <>
                            <Image
                              loader={ImgLoader}
                              src={"/images/svg/promo/done.svg"}
                              width={40}
                              height={40}
                            />
                            <div>
                              <Title>Уже активно</Title>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ListHorizontal;

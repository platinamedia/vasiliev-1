import { BodyNormal, Button, CopyText } from "../../components";
import { useEffect, useState } from "react";

import ChangeReferral from "./ChangeReferral";
import { linkRef } from "../../api/linkRef";
import styles from "./UserLink.module.scss";

const UserLink = () => {
  const [referr] = linkRef();
  const [link, setLink] = useState<string>("");
  const [changeToggle, setChangeToggle] = useState<boolean>(false);

  useEffect(() => {
    if (!referr) {
      return null;
    }
    setLink(referr?.key);
  }, [referr]);

  const onChangeHandler = (onSave: boolean) => setChangeToggle(onSave);

  return (
    <>
      <div className={styles.UserLink}>
        <div className={styles.UserLink__header}>
          <BodyNormal>
            Это твоя реферальная ссылка для приглашения друзей
          </BodyNormal>
        </div>
        <div className={styles.UserLink__wrapper}>
          <div className={styles.UserLink__container}>
            <div className={styles.UserLink__path_one}>
              <div className={styles.UserLink__copy}>
                {!changeToggle && (
                  <CopyText
                    copyString={`${process.env.WEB_URL}/sign-up/${referr?.key}`}
                    notification={"Ссылка скопирована"}
                    imgCopy={true}
                  />
                )}
              </div>
              <div className={styles.Link}>
                <BodyNormal className={styles.UserLink__text}>
                  https://web.prclub.pro/sign-up/
                </BodyNormal>
              </div>
            </div>
            <div className={styles.UserLink__path_two}>
              {changeToggle ? (
                <>
                  <ChangeReferral
                    link={link}
                    onChangeHandler={onChangeHandler}
                  />
                </>
              ) : (
                <>
                  <div className={styles.Link_change}>
                    <BodyNormal>{referr?.key}</BodyNormal>
                  </div>
                  <div className={styles.UserLink__button}>
                    <Button
                      color={"dark"}
                      className={styles.Button_options}
                      onClick={(e) => setChangeToggle((prev) => !prev)}
                    >
                      Изменить
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserLink;

import { BodyNormal, Button, InfoMiniIcon } from "../../../components";
import React, { useEffect, useState } from "react";

import { ChangeInstagram } from "./";
import Image from "next/image";
import { ImgLoader } from "../../../modules";
import styles from "./UserAccount.module.scss";
import { useUserContext } from "../../../context/userContext";

const UserAccount: React.FC = () => {
  const { userState } = useUserContext();
  const [instagram, setInstagram] = useState<string>("");
  const [changeToggle, setChangeToggle] = useState<boolean>(false);

  useEffect(() => {
    if (!userState) return null;

    try {
      setInstagram(userState?.profile?.insta_link || "");
    } catch (e) {
      console.log(e);
    }
  }, [userState]);

  const onChangeHandler = (onSave: boolean) => setChangeToggle(onSave);

  return (
    <>
      <div className={styles.UserAccount}>
        <div className={styles.Instagram}>
          <div className={styles.Instagram__IMG}>
            {userState?.profile?.user_image ? (
              <Image
                loader={ImgLoader}
                src={`data:image/jpeg;base64,${userState?.profile?.user_image}`}
                width={32}
                height={32}
                alt="my photo"
              />
            ) : (
              <Image
                loader={ImgLoader}
                src={"/images/svg/default/user.svg"}
                width={32}
                height={32}
                alt="default photo"
              />
            )}
          </div>
          {changeToggle ? (
            <>
              <ChangeInstagram
                linkInstagram={instagram}
                onChangeHandler={onChangeHandler}
              />
            </>
          ) : (
            <div className={styles.Wrapper_instagram}>
              <div className={styles.Instagram__text}>
                <BodyNormal>{instagram}</BodyNormal>
              </div>
              <div className={styles.Instagram__btn}>
                <Button
                  color={"dark"}
                  className={styles.Button_options}
                  onClick={() => setChangeToggle((prev) => !prev)}
                >
                  Изменить
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.Attention}>
          <InfoMiniIcon />
          <div className={styles.Attention__messages}>
            <BodyNormal>
              Выполняй задания только с личного аккаунта, с личными фото. Иначе
              придётся закрыть тебе доступ к этому разделу
            </BodyNormal>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccount;

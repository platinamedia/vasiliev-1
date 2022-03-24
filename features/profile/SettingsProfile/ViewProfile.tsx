import { BodyBold, BodyNormal, Subheader } from "../../../components";

import Image from "next/image";
import { ImgLoader } from "../../../modules";
import { RadioButton } from "../../../components";
import pen from "/public/images/svg/pen.svg";
import styles from "./ViewProfile.module.scss";
import { useEffect } from "react";
import { useUserContext } from "../../../context/userContext";

type ViewProfileProps = {
  offDisabledHandle: (off: boolean) => void;
};

const ViewProfile: React.FC<ViewProfileProps> = ({
  offDisabledHandle,
}) => {
  const { userState } = useUserContext();
  const onChangeHandler = () => offDisabledHandle(false);

  useEffect(() => {
    if (!userState) return null;
  }, [userState]);

  return (
    <div className={styles.SettingsProfile}>
      <div className={styles.SettingsProfile__first}>
        <div className={styles.SettingsProfile__photo}>
          {userState?.profile?.user_image ? (
            <Image
              loader={ImgLoader}
              src={`data:image/jpeg;base64,${userState?.profile?.user_image}`}
              width={64}
              height={64}
              alt="my photo"
            />
          ) : (
            <Image
              loader={ImgLoader}
              src={"/images/svg/default/user.svg"}
              width={64}
              height={64}
              alt="user"
            />
          )}
        </div>
        <div
          className={styles.SettingsProfile__changed}
          onClick={onChangeHandler}
        >
          <Image
            loader={ImgLoader}
            src={pen}
            alt="play"
            height={18}
            width={18}
          />
          <div>
            <BodyNormal>Изменить</BodyNormal>
          </div>
        </div>
      </div>
      <section className={styles.SettingsProfile__solo}>
        <div className={styles.SettingsProfile__form}>
          <div className={styles.SettingsProfile__form_user}>
            <div className={styles.ChoiceGender}>
              <div className={styles.ChoiceGender__item}>
                <RadioButton
                  name={"letter"}
                  value="male"
                  checked={userState?.profile?.gender === "male"}
                  label={"Мужчина"}
                  className={styles.RadioButton_options}
                  disabled={true}
                  onChange={() => null}
                />
              </div>
              <div className={styles.ChoiceGender__item}>
                <RadioButton
                  name={"letter"}
                  value="female"
                  checked={userState?.profile?.gender === "female"}
                  label={"Женщина"}
                  className={styles.RadioButton_options}
                  disabled={true}
                  onChange={() => null}
                />
              </div>
            </div>
            <div className={styles.SettingsProfile__mean}>
              <BodyNormal className={styles.SettingsProfile__mean_text}>
                {userState?.profile?.name === ""
                  ? "Имя"
                  : userState?.profile?.name}
              </BodyNormal>
            </div>
            <div className={styles.SettingsProfile__mean}>
              <BodyNormal className={styles.SettingsProfile__mean_text}>
                {userState?.profile?.surname === ""
                  ? "Фамилия"
                  : userState?.profile?.surname}
              </BodyNormal>
            </div>
            <div className={styles.SettingsProfile__mean}>
              <BodyNormal className={styles.SettingsProfile__mean_text}>
                {userState?.email === "" ? "Эл. почта" : userState?.email}
              </BodyNormal>
            </div>
            <div>
              {false && (
                <div className={styles.SettingsProfile__long}>
                  <div className={styles.SettingsProfile__confirm}>
                    <div className={styles.SettingsProfile__confirm_wrapper}>
                      <div className={styles.SettingsProfile__confirm_text}>
                        <Image
                          loader={ImgLoader}
                          src={"/images/svg/attention.svg"}
                          alt={"Attention!"}
                          height={20}
                          width={20}
                        />
                        <div>
                          <BodyNormal>Почта не подтверждена</BodyNormal>
                        </div>
                      </div>
                      <div className={styles.SettingsProfile__confirm_btn}>
                        <BodyNormal>Подтвердить</BodyNormal>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.SettingsProfile__mean}>
              <BodyNormal className={styles.SettingsProfile__mean_text}>
                {userState?.profile?.cell_number === ""
                  ? "(999) 123 4567"
                  : userState?.profile?.cell_number}
              </BodyNormal>
            </div>
            <div className={styles.SettingsProfile__mean}>
              <BodyNormal className={styles.SettingsProfile__mean_text}>
                {userState?.profile?.country === ""
                  ? "Страна"
                  : userState?.profile?.country}
              </BodyNormal>
            </div>
            <div className={styles.SettingsProfile__mean}>
              <BodyNormal className={styles.SettingsProfile__mean_text}>
                {userState?.profile?.city === ""
                  ? "Город"
                  : userState?.profile?.city}
              </BodyNormal>
            </div>
          </div>
          <div className={styles.SettingsProfile__form_contacts}>
            <div>
              <Subheader>Мессенджеры</Subheader>
            </div>
            <div>
              <BodyNormal>Будут отображаться у других участников</BodyNormal>
            </div>
            <div className={styles.SettingsProfile__wee}>
              <BodyNormal className={styles.SettingsProfile__mean_text}>
                {userState?.profile?.telegram === ""
                  ? "Telegram"
                  : userState?.profile?.telegram}
              </BodyNormal>
            </div>
            <div className={styles.SettingsProfile__wee}>
              <BodyNormal className={styles.SettingsProfile__mean_text}>
                {userState?.profile?.whatsapp === ""
                  ? "WhatsApp"
                  : userState?.profile?.whatsapp}
              </BodyNormal>
            </div>
          </div>
        </div>
        <div className={styles.SettingsProfile__about}>
          <div className={styles.SettingsProfile__about_wrapper}>
            <div>
              <BodyBold className={styles.SettingsProfile__about_text}>
                Пара слов о себе:
              </BodyBold>
            </div>
            <div className={styles.SettingsProfile__about_disabled}>
              <BodyNormal className={styles.SettingsProfile__about_text}>
                {userState?.profile?.about}
              </BodyNormal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewProfile;

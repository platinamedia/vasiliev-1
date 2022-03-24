import {
  BodyNormal,
  Button,
  Input,
  RadioButton,
  Subheader,
  Textarea,
} from "../../../components";
import { DropArea, ImgLoader } from "../../../modules";
import { createRef, useEffect, useState } from "react";

import Image from "next/image";
import InputMask from "react-input-mask";
import styles from "./ChangeProfile.module.scss";
import { useAuth } from "../../../lib/auth.hook";
import { useUserContext } from "../../../context/userContext";

type ChangeProfileProps = {
  onDisabledHandle: (on: boolean) => void;
};

const ChangeProfile: React.FC<ChangeProfileProps> = ({ onDisabledHandle }) => {
  const { token } = useAuth();
  const { setUserState, userState } = useUserContext();
  const InputRef = createRef();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>(
    userState?.profile?.user_image || ""
  );
  const [nameInput, setNameInput] = useState<string>(
    userState?.profile?.name || ""
  );
  const [genderInput, setGenderInput] = useState<string>(
    userState?.profile?.gender || ""
  );
  const [surnameInput, setSurnameInput] = useState<string>(
    userState?.profile?.surname || ""
  );
  const [phoneInput, setPhoneInput] = useState<string>(
    userState?.profile?.cell_number || ""
  );
  const [countryInput, setCountryInput] = useState<string>(
    userState?.profile?.country || ""
  );
  const [cityInput, setCityInput] = useState<string>(
    userState?.profile?.city || ""
  );
  const [telegramInput, setTelegramInput] = useState<string>(
    userState?.profile?.telegram || ""
  );
  const [whatsAppInput, setWhatsAppInput] = useState<string>(
    userState?.profile?.whatsapp || ""
  );
  const [yourHistoryInput, setYourHistoryInput] = useState<string>(
    userState?.profile?.about || ""
  );
  const loadImageHandler = (value: string) => setPhoto(value);
  const genderHadler = (event) => {
    setGenderInput(event.target.defaultValue);
  };
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (disabled) onDisabledHandle(true);
  }, [disabled]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!userState) return null;

    const data = userState;
    data.profile.user_image = photo;
    data.profile.name = nameInput;
    data.profile.city = cityInput;
    data.profile.gender = genderInput;
    data.profile.country = countryInput;
    data.profile.surname = surnameInput;
    data.profile.cell_number =
      phoneInput !== "" && phoneInput !== "+"
        ? "+" + phoneInput.replace(/[^0-9]+/g, "")
        : "";
    data.profile.telegram = telegramInput;
    data.profile.whatsapp =
      whatsAppInput !== "" && whatsAppInput !== "+"
        ? "+" + whatsAppInput.replace(/[^0-9]+/g, "")
        : "";
    data.profile.about = yourHistoryInput;

    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(data),
      };

      setLoaded(true);
      const res = await fetch(
        `${process.env.API_URL}/api/v1/rest-auth/user/`,
        requestOptions
      );
      if (res.ok) {
        setUserState({ ...userState, data });
        setDisabled(true);
      }
      setLoaded(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.SettingsProfile}>
      <div className={styles.SettingsProfile__first}>
        <DropArea loadImageHandler={loadImageHandler} />
      </div>
      <section className={styles.SettingsProfile__solo}>
        <div className={styles.SettingsProfile__form}>
          <div className={styles.SettingsProfile__form_user}>
            <div className={styles.ChoiceGender}>
              <div className={styles.ChoiceGender__item}>
                <RadioButton
                  name={"gender"}
                  value="male"
                  checked={genderInput === "male"}
                  onChange={genderHadler}
                  label={"Мужчина"}
                  className={styles.RadioButton_options}
                  disabled={loaded}
                />
              </div>
              <div className={styles.ChoiceGender__item}>
                <RadioButton
                  name={"gender"}
                  value="female"
                  checked={genderInput === "female"}
                  onChange={genderHadler}
                  label={"Женщина"}
                  className={styles.RadioButton_options}
                  disabled={loaded}
                />
              </div>
            </div>
            <Input
              autoComplete="off"
              maxLength={100}
              type="text"
              name="name"
              defaultValue={userState?.profile?.name || ""}
              className={styles.SettingsProfile__mean}
              disabled={loaded}
              placeholder="Имя"
              onChange={(e) => {
                e.preventDefault(), setNameInput(e.target.value);
              }}
            />
            <Input
              autoComplete="off"
              maxLength={100}
              type="text"
              name="surname"
              defaultValue={userState?.profile?.surname || ""}
              className={styles.SettingsProfile__mean}
              disabled={loaded}
              placeholder="Фамилия"
              onChange={(e) => {
                e.preventDefault(), setSurnameInput(e.target.value);
              }}
            />
            <Textarea
              autoComplete="off"
              maxLength={100}
              cols="30"
              rows="5"
              name="your_history"
              defaultValue={userState?.profile?.about || ""}
              className={styles.SettingsProfile__area}
              disabled={loaded}
              placeholder="Пару слов о себе: 24 года, web дизайнер, в свободное время занимаюсь серфингом"
              onChange={(e) => {
                e.preventDefault(), setYourHistoryInput(e.target.value);
              }}
            />
            <div className={styles.SettingsProfile__mean}>
              {userState?.email !== "" && (
                <Input
                  autoComplete="off"
                  maxLength={100}
                  type="text"
                  name="Show_email"
                  defaultValue={userState?.email}
                  className={styles.SettingsProfile__long}
                  disabled={true}
                  placeholder="Эл. почта"
                />
              )}
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
            <InputMask
              mask="+9 (999) 999-9999"
              ref={InputRef}
              defaultValue={userState?.profile?.cell_number || ""}
              onChange={(e) => {
                e.preventDefault(), setPhoneInput(e.target.value);
              }}
            >
              {() => (
                <Input
                  autoComplete="off"
                  maxLength={100}
                  type="tel"
                  name="phone"
                  placeholder="+7 (999) 123 4567"
                  className={styles.SettingsProfile__mean}
                />
              )}
            </InputMask>
            <Input
              autoComplete="off"
              maxLength={100}
              type="text"
              name="country"
              defaultValue={userState?.profile?.country || ""}
              className={styles.SettingsProfile__mean}
              disabled={loaded}
              placeholder="Страна"
              onChange={(e) => {
                e.preventDefault(), setCountryInput(e.target.value);
              }}
            />
            <Input
              autoComplete="off"
              maxLength={100}
              type="text"
              name="city"
              defaultValue={userState?.profile?.city || ""}
              className={styles.SettingsProfile__mean}
              disabled={loaded}
              placeholder="Город"
              onChange={(e) => {
                e.preventDefault(), setCityInput(e.target.value);
              }}
            />
          </div>
          <div className={styles.SettingsProfile__form_contacts}>
            <div>
              <Subheader>Мессенджеры</Subheader>
            </div>
            <div>
              <BodyNormal>Будут отображаться у других участников</BodyNormal>
            </div>
            <Input
              autoComplete="off"
              maxLength={100}
              type="text"
              name="telegram"
              defaultValue={userState?.profile?.telegram || ""}
              className={styles.SettingsProfile__wee}
              disabled={loaded}
              placeholder="Telegram"
              onChange={(e) => {
                e.preventDefault(), setTelegramInput(e.target.value);
              }}
            />
            <InputMask
              mask="+9 (999) 999-9999"
              ref={InputRef}
              defaultValue={userState?.profile?.whatsapp || ""}
              onChange={(e) => {
                e.preventDefault(), setWhatsAppInput(e.target.value);
              }}
              disabled={loaded}
            >
              {() => (
                <Input
                  autoComplete="off"
                  maxLength={100}
                  type="tel"
                  name="whats_app"
                  placeholder="WhatsApp"
                  className={styles.SettingsProfile__wee}
                />
              )}
            </InputMask>
          </div>
          <div className={styles.SettingsProfile__change}>
            <div className={styles.SettingsProfile__save}>
              <Button
                color={"pink"}
                size={15}
                loader={loaded}
                disabled={loaded}
                onClick={onSubmit}
                flyImg={true}
                className={styles.Button_options}
              >
                Сохранить
              </Button>
            </div>
            <div className={styles.SettingsProfile__save}>
              <Button
                color={"dark"}
                onClick={() => setDisabled(true)}
                className={styles.Button_options}
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangeProfile;

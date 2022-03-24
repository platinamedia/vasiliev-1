import { Button, Input } from "../../components";
import { useEffect, useState } from "react";

import { linkRef } from "../../api/linkRef";
import styles from "./ChangeReferral.module.scss";
import { usePopup } from "../../lib/popup.hook";
import { useRoot } from "../../lib/root.hook";

type ChangeReferralProps = {
  link: string;
  onChangeHandler: (save: boolean) => void;
};

const ChangeReferral: React.FC<ChangeReferralProps> = ({
  link,
  onChangeHandler,
}) => {
  const { createSnack } = usePopup();
  const [referr, { mutate }] = linkRef();
  const { loading, request, error, success } = useRoot();
  const [inputLink, setInputLink] = useState<string>(link);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleChangeReferralLink = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    setInputLink(newValue.toLocaleLowerCase().replace(/[^a-z0-9]/g, ""));
  };

  const handleVerifyLink = (event) => {
    event.preventDefault();
    if (event.target.value.length === 0) setInputLink(referr?.key);
  };

  const handleClearLink = (event) => {
    event.preventDefault();
    if (event.target.value === referr?.key) setInputLink("");
  };

  const onSubmitUserLink = async (e) => {
    e.preventDefault();

    if (inputLink === link || inputLink === "") {
      onChangeHandler(false);
      return null;
    }

    setLoaded(true);
    if (inputLink) {
      try {
        const body = {
          alias: inputLink,
        };
        const res = await request(
          `${process.env.API_URL}/api/v1/invite/add-alias/`,
          "PATCH",
          body
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (error) {
      setLoaded(false);
      if (error?.detail) {
        createSnack(error?.detail, "warning");
      }
      if (error?.info) {
        createSnack(error?.info, "warning");
      }
    }

    if (success) {
      console.log(success);
      onChangeHandler(false);
      setLoaded(false);
      if (success?.info) {
        mutate(inputLink);
        createSnack(success?.info, "success");
      }
    }
  }, [error, success]);

  useEffect(() => setDisabled(loaded), [loaded]);

  return (
    <div className={styles.ChangeReferral}>
      <div className={styles.ChangeReferral__input}>
        <Input
          className={styles.Input_options}
          value={inputLink}
          autoComplete={"off"}
          type={"text"}
          maxLength={12}
          disabled={loaded}
          onBlur={handleVerifyLink}
          onFocus={handleClearLink}
          onChange={handleChangeReferralLink}
        />
      </div>
      <div className={styles.ChangeReferral__button}>
        <Button
          color={"dark"}
          onClick={onSubmitUserLink}
          className={styles.Button_options}
          size={15}
          disabled={disabled}
          loader={loaded}
        >
          {inputLink === link || inputLink === "" ? "Отмена" : "Сохранить"}
        </Button>
      </div>
    </div>
  );
};

export default ChangeReferral;

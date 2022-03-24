import { BodyNormal, Input } from "../../../components";

import Image from "next/image";
import { ImgLoader } from "../../../modules";
import pen from "/public/images/svg/pen.svg";
import styles from "./OldPassword.module.scss";

type OldPasswordProps = {
  offDisabledHandle: (on: boolean) => void;
};

const OldPassword: React.FC<OldPasswordProps> = ({ offDisabledHandle }) => {
  const handleChengePass = () => offDisabledHandle(false);

  return (
    <div className={styles.OldPassword}>
      <div className={styles.OldPassword__first}>
        <div className={styles.OldPassword__changed} onClick={handleChengePass}>
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
      <div className={styles.OldPassword__label}>
        <BodyNormal>Текущий пароль</BodyNormal>
      </div>
      <div className={styles.OldPassword__mean}>
        <BodyNormal className={styles.OldPassword__mean_text}>
          ●●●●●●●●
        </BodyNormal>
      </div>
    </div>
  );
};

export default OldPassword;

import { useEffect, useState } from "react";

import { RadioButton } from "../../../components";
import styles from "./ChoiceWindow.module.scss";

type ChoiceWindowProps = {
  checked?: number;
  handleChangeWindow?: (value: string) => void;
};

const ChoiceWindow: React.FC<ChoiceWindowProps> = ({ handleChangeWindow }) => {
  const [value, setValue] = useState("a");
  const handleChange = (event) => {
    setValue(event.target.defaultValue);
  };

  useEffect(() => {
    handleChangeWindow(value);
  }, [value]);

  return (
    <div className={styles.ChoiceWindow}>
      <div className={styles.ChoiceWindow__item}>
        <RadioButton
          name={"letter"}
          value="a"
          checked={value === "a"}
          onChange={handleChange}
          label={"Вывод средств"}
          className={styles.RadioButton__options_left}
        />
      </div>
      <div className={styles.ChoiceWindow__item}>
        <RadioButton
          name={"letter"}
          value="b"
          checked={value === "b"}
          onChange={handleChange}
          label={"Перевод другому пользователю"}
          className={styles.RadioButton__options_right}
        />
      </div>
    </div>
  );
};

export default ChoiceWindow;

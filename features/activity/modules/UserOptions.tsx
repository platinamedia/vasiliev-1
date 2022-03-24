import { BodyNormal, Button, Rotate } from "../../../components";
import React, { useState } from "react";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import styles from "./UserOptions.module.scss";

const UserOptions: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => setToggle((prev) => !prev);

  return (
    <div className={styles.UserOptions}>
      <br />
      <div className={styles.UserOptions__Instagram_btn}>
        <div>
          <Button
            color={"dark"}
            className={styles.Button_options}
            onClick={handleToggle}
          >
            <div className={styles.Button_text}>
              <BodyNormal>Как выполнить задания</BodyNormal>
              <Rotate rotate={toggle}>
                <ExpandLess />
              </Rotate>
            </div>
          </Button>
        </div>
      </div>

      <Collapse in={toggle}>
        <div className={styles.Options}>
          <div className={styles.Options__item}>
            <div className={styles.Options__item_num}>
              <BodyNormal>1</BodyNormal>
            </div>
            <div className={styles.Options__item_text}>
              <>
                <BodyNormal>
                  Нажми на кнопку “Выполнить” и перейдёшь в Instagram на нужный
                  аккаунт участника. Подпишись на выбранного участника PR Club и
                  возвращайся сюда. Если аккаунт недоступен или закрыт, то нажми
                  кнопку “Сменить” и повтори действие.{" "}
                </BodyNormal>
              </>
              <br />
              <br />
              <>
                <BodyNormal>
                  Убедись, что сам выполняешь задания со своего аккаунта,
                  который ты привязал в профиле!
                </BodyNormal>
              </>
            </div>
          </div>
          <div className={styles.Options__item}>
            <div className={styles.Options__item_num}>
              <BodyNormal>2</BodyNormal>
            </div>
            <div className={styles.Options__item_text}>
              <BodyNormal>
                После выполнения заданий, нажми кнопку “Проверить выполнение”.
                Если некоторые задания остались — значит они не выполнены (или
                не проверились). Выполни их и проверь
              </BodyNormal>
            </div>
          </div>
          <div className={styles.Options__item}>
            <div className={styles.Options__item_num}>
              <BodyNormal>3</BodyNormal>
            </div>
            <div className={styles.Options__item_text}>
              <BodyNormal>
                Если отписаться от предложенных аккаунтов, то система исключит
                твой аккаунт из распределения, и ты не сможешь получать новых
                подписчиков
              </BodyNormal>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default UserOptions;

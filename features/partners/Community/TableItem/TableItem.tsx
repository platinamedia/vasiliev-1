import { BodyNormal, Rotate } from "../../../../components";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Image from "next/image";
import Link from "next/link";
import TableAllItems from "../TableAllItems/TableAllItems";
import ViewBox from "./ViewBox";
import classNames from "classnames";
import styles from "./TableItem.module.scss";
import { useState } from "react";

type TableItemProps = {
  user: any;
  level: number;
};

const TableItem: React.FC<TableItemProps> = ({ user, level }) => {
  const [isOpenClients, setIsOpenClients] = useState<boolean>(false);
  const [loadNewListID, setLoadNewListID] = useState<number>();

  const toggleToltip = (value) => {
    setLoadNewListID(value);
    setIsOpenClients((prev) => !prev);
  };

  return (
    <div className={styles.Table__List}>
      <div className={styles.User}>
        <div
          className={styles.User__level}
          onClick={() => toggleToltip(user?.profile?.user_id)}
        >
          <TableCell>
            <div className={styles.Lavel}>
              <BodyNormal className={styles.MiniText}>+{level}</BodyNormal>
              <Rotate rotate={isOpenClients}>
                <ExpandLess fontSize="small" />
              </Rotate>
            </div>
          </TableCell>
        </div>
        <div className={styles.User__progress}>
          <TableCell>
            <BodyNormal
              className={classNames(styles.User__userId_conf, styles.MiniText)}
            >
              ID:{user?.profile?.user_id}
            </BodyNormal>
          </TableCell>
        </div>
        <div className={styles.User__userName}>
          <TableCell>
            {user?.profile?.name ? (
              <p>{user?.profile?.name}</p>
            ) : (
              <p>Не заполнено</p>
            )}
          </TableCell>
        </div>
        <div className={styles.User__tariff}>
          <TableCell> {user?.tariff}</TableCell>
        </div>
        <div className={styles.User__contacts}>
          <TableCell>
            <div className={styles.Social}>
              <div className={styles.Social__item}>
                {user?.profile?.insta_link ? (
                  <Link
                    href={`https://www.instagram.com/${user?.profile?.insta_link}`}
                  >
                    <a target="_blank">
                      <Image
                        src="/images/svg/social/insta_white.svg"
                        width={16}
                        height={16}
                      />
                    </a>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.Social__item}>
                {user?.profile?.telegram ? (
                  <Link
                    href={`https://t.me/${(user?.profile?.telegram).replace(
                      /^@+/gm,
                      ""
                    )}`}
                  >
                    <a target="_blank">
                      <Image
                        src="/images/svg/social/telegramm_white.svg"
                        width={16}
                        height={16}
                      />
                    </a>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.Social__item}>
                {user?.profile?.whatsapp ? (
                  <Link
                    href={`https://api.whatsapp.com/send?phone=${(user?.profile?.whatsapp).replaceAll(
                      "\\D+",
                      ""
                    )}`}
                  >
                    <a target="_blank">
                      <Image
                        src="/images/svg/social/whatsapp_white.svg"
                        width={16}
                        height={16}
                      />
                    </a>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </TableCell>
        </div>
        <div className={styles.User__subscribe}>
          <TableCell>
            <p>
              <BodyNormal className={styles.MiniText}>
                {user?.date_joined}
              </BodyNormal>
            </p>
          </TableCell>
        </div>
        {/* <div className={styles.User__many}>
          <TableCell>
            <BodyNormal className={styles.MiniText}></BodyNormal>
          </TableCell>
        </div> */}
      </div>
      <Collapse in={!!isOpenClients}>
        <ViewBox
          photo={user?.profile?.image}
          date_joined={user?.profile?.date_joined}
          email={user?.email}
        />
      </Collapse>
      {isOpenClients && (
        <div className={styles.Table__content}>
          <TableAllItems ids={loadNewListID} level={level + 1} />
        </div>
      )}
    </div>
  );
};

const TableCell: React.FC<{ [key: string]: any }> = (props) => (
  <div {...props} className={classNames(styles.Table__cell, props.className)}>
    <BodyNormal className={styles.MiniText}>{props.children}</BodyNormal>
  </div>
);

export default TableItem;

import {
  BlockImgContainSvg,
  BlockRows,
  BlockToolipMsg,
  BodyNormal,
  Title,
  TooltipBox,
  TooltipContainer,
  TooltipMessage,
} from "../../components";
import {
  FacebookShareButton,
  VKShareButton,
  WhatsappShareButton,
} from "next-share";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Image from "next/image";
import { ImgLoader } from "../../modules";
import copy from "/public/images/svg/copy.svg";
import facebook_wite from "/public/images/svg/social/facebook_wite.svg";
import { linkRef } from "../../api/linkRef";
import share from "/public/images/svg/social/share.svg";
import styles from "./Links.module.scss";
import vk_white from "/public/images/svg/social/vk_white.svg";
import whatsapp_white from "/public/images/svg/social/whatsapp_white.svg";

type ReferralData = {
  title: string;
  page_img: string;
  link_refrral: string;
  link_page: string;
};

const Links: React.FC = () => {
  const [referr] = linkRef();

  const Specialist = [
    {
      title: "Головной сайт (позиционирование, дорожная карта)",
      page_img: "lend_header",
      link_refrral: referr?.key || "",
      link_page: `https://prclub.pro/?ref=${referr?.key || ""}`,
    },
    {
      title: "Активность Instagram",
      page_img: "lend_bloger",
      link_refrral: referr?.key || "",
      link_page: `https://instagram.prclub.pro/?ref=${referr?.key || ""}`,
    },
    {
      title: "ПРОМО 10 тыс. подписчиков",
      page_img: "lend_promo",
      link_refrral: referr?.key || "",
      link_page: `https://promo.prclub.pro/?ref=${referr?.key || ""}&is_promo=false`,
    },
    {
      title: "Получи 1 000 000 подписчиков в Instagram",
      page_img: "lend_million",
      link_refrral: referr?.key || "",
      link_page: `https://million.prclub.pro/?ref=${referr?.key || ""}`,
    },
    {
      title: "МЛМ",
      page_img: "lend_mlm",
      link_refrral: referr?.key,
      link_page: `https://mlm.prclub.pro/?ref=${referr?.key || ""}`,
    },
  ];

  return (
    <>
      <div className={styles.Grid}>
        {referr &&
          Specialist.map((content: ReferralData, i: number) => {
            return (
              <div key={i} className={styles.Card}>
                <div className={styles.Head}>
                  <Title>{content.title}</Title>
                </div>
                <TooltipMessage
                  message={<BlockToolipMsg>Ссылка скопирована</BlockToolipMsg>}
                >
                  <CopyToClipboard text={content.link_page}>
                    <div className={styles.Copy}>
                      <div className={styles.LinkConainer}>
                        <div className={styles.Links}>{content.link_page}</div>
                      </div>
                      <Image
                        loader={ImgLoader}
                        src={copy}
                        width={20}
                        height={20}
                        alt="copy"
                      />
                    </div>
                  </CopyToClipboard>
                </TooltipMessage>
                <div
                  className={styles.Constainer_Images}
                  onClick={() => window.open(content.link_page)}
                >
                  <div className={styles.Constainer_Images_position}>
                    <Image
                      loader={ImgLoader}
                      src={`/images/png/lending/${content.page_img}.png`}
                      alt={content.page_img}
                      className={styles.Image}
                      layout="fill"
                      quality={50}
                      priority
                    />
                  </div>
                </div>
                <section>
                  <TooltipContainer
                    divs={
                      <TooltipBox>
                        <VKShareButton
                          url={content.link_page}
                          title={content.link_page}
                        >
                          <BlockRows>
                            <BlockImgContainSvg>
                              <Image
                                loader={ImgLoader}
                                src={vk_white}
                                width={21}
                                height={12}
                                alt="VK"
                              />
                            </BlockImgContainSvg>
                            <span>VK</span>
                          </BlockRows>
                        </VKShareButton>
                        <FacebookShareButton
                          url={content.link_page}
                          title={content.link_page}
                        >
                          <BlockRows>
                            <BlockImgContainSvg>
                              <Image
                                loader={ImgLoader}
                                src={facebook_wite}
                                width={11}
                                height={22}
                                alt="facebook"
                                priority
                              />
                            </BlockImgContainSvg>
                            <span>facebook</span>
                          </BlockRows>
                        </FacebookShareButton>
                        <WhatsappShareButton
                          url={content.link_page}
                          title={content.link_page}
                        >
                          <BlockRows>
                            <BlockImgContainSvg>
                              <Image
                                loader={ImgLoader}
                                src={whatsapp_white}
                                width={21}
                                height={21}
                                alt="WhatsApp"
                                priority
                              />
                            </BlockImgContainSvg>
                            <span>WhatsApp</span>
                          </BlockRows>
                        </WhatsappShareButton>
                      </TooltipBox>
                    }
                  >
                    <div className={styles.ShareLink}>
                      <div className={styles.ContainImg}>
                        <Image
                          loader={ImgLoader}
                          src={share}
                          width={12}
                          height={12}
                          alt="share"
                          priority
                        />
                      </div>
                      <BodyNormal>Поделиться ссылкой</BodyNormal>
                    </div>
                  </TooltipContainer>
                </section>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Links;

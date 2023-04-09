import {
  MouseEventHandler,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";
import { FixBoxVertical, IconContainer, MarkerCount, ShareBox } from "./style";
import { BsShareFill, BsBookmarkFill } from "react-icons/bs";
import { MdEditNote as NoteIcon } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { RiKakaoTalkFill as KakaoIcon } from "react-icons/ri";
import { AiFillFacebook as FacebookIcon } from "react-icons/ai";
import { AiOutlineTwitter as TwitterIcon } from "react-icons/ai";
import { BsLink45Deg as ShareAddressIcon } from "react-icons/bs";
import { getCurrentCount } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginState } from "../../recoil/state";
import {
  BookmarkSavesState,
  LikesState,
  AttractionDataState,
} from "../../recoil/PlaceDetailState";
import axios from "../../utils/axiosinstance";
import useClickDetect from "../../hooks/useClickDetect";

interface ShareProps {
  inverted: boolean;
  handlePostButtonClick: MouseEventHandler<HTMLElement>;
  onModalVisible: Dispatch<SetStateAction<boolean>>;
}

const FloatingMenu = ({
  inverted,
  handlePostButtonClick,
  onModalVisible,
}: ShareProps) => {
  const [bookmarkSaves, setBookmarkSaves] = useRecoilState(BookmarkSavesState); //로컬 북마트 상태 저장
  const [likes, setLikes] = useRecoilState(LikesState);
  const attractionData = useRecoilValue(AttractionDataState);
  const [isLogin] = useRecoilState(LoginState);
  const {
    ref,
    isVisible: showSharebox,
    setIsVisible: setShowSharebox,
  } = useClickDetect();

  const { id } = useParams();
  const URL_FOR_SAVES = `/attractions/saves/${id}`;
  const URL_FOR_LIKES = `/attractions/likes/${id}`;

  useLayoutEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  }, []);
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("url이 성공적으로 복사되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickBookmark = () => {
    if (!isLogin) {
      onModalVisible(true);
      return;
    }
    axios.post(URL_FOR_SAVES).then((res) => {
      setBookmarkSaves(res.data.data.isSaved);
    });
  };

  const handleClickLikes = () => {
    if (!isLogin) {
      onModalVisible(true);
      return;
    }
    axios.post(URL_FOR_LIKES).then((res) => {
      setLikes(res.data.data.isVoted);
    });
  };
  return (
    <>
      <FixBoxVertical inverted={inverted}>
        <IconContainer
          ref={ref as React.RefObject<HTMLDivElement>}
          className="icon"
          isSelected={showSharebox}
        >
          <BsShareFill
            className="share-icon"
            onClick={() => {
              setShowSharebox((p) => !p);
              // handleCopyClipBoard(document.location.href);
            }}
          />
          <ShareBox isVisible={showSharebox}>
            <ShareAddressIcon
              className="shareAddress-icon"
              onClick={() => handleCopyClipBoard(document.location.href)}
            />
            <FacebookIcon
              className="facebook-icon"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/sharer/sharer.php?u=" +
                    encodeURIComponent(window.location.href)
                )
              }
            />
            <TwitterIcon
              className="twitter-icon"
              onClick={() =>
                window.open(
                  "https://twitter.com/intent/tweet?url=" +
                    encodeURIComponent(window.location.href)
                )
              }
            />
            <KakaoIcon
              className="kakao-icon"
              onClick={() => {
                if (window.Kakao) {
                  window.Kakao.Share.sendScrap({
                    requestUrl: document.location.href,
                  });
                }
              }}
            />
          </ShareBox>
        </IconContainer>{" "}
        <IconContainer onClick={handlePostButtonClick}>
          {" "}
          <NoteIcon className="post-icon" />
        </IconContainer>
        <IconContainer onClick={() => handleClickBookmark()}>
          <BsBookmarkFill
            className="bookmark-icon"
            fill={bookmarkSaves ? "var(--black-800)" : "var(--black-400)"}
          />
          <MarkerCount>
            {getCurrentCount(
              attractionData.saves,
              attractionData.isSaved,
              bookmarkSaves
            )}
          </MarkerCount>
        </IconContainer>
        <IconContainer onClick={() => handleClickLikes()}>
          <AiFillHeart
            className="heart-icon"
            color={likes === true ? "var(--pink-heart)" : "var(--black-400)"}
          />
          <MarkerCount>
            {getCurrentCount(
              attractionData.likes,
              attractionData.isVoted,
              likes
            )}
          </MarkerCount>
        </IconContainer>
      </FixBoxVertical>
    </>
  );
};
export default FloatingMenu;

import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  AlertQueueState,
  reportChatDataState,
  showReportModalState,
} from "../../../recoil/ChatState";
import { DividerLine } from "../ChatStyled";
import {
  ReportModalWrapper,
  ReportModalDiv,
  ReportLabel,
  ReportForm,
  CheckboxContainer,
} from "./ModalStyled";
import { RiAlarmWarningFill as AlarmIcon } from "react-icons/ri";
import { chatDatatype } from "../Chat";

interface ReportModalProps {
  setChatData: React.Dispatch<React.SetStateAction<chatDatatype[]>>;
}
const ReportModal = ({ setChatData }: ReportModalProps) => {
  const setShowReportModal = useSetRecoilState(showReportModalState);
  const [reportChatData, setReportChatData] =
    useRecoilState(reportChatDataState);
  const setAlertQueue = useSetRecoilState(AlertQueueState);
  const handleCancelClick = () => {
    setReportChatData(null);
    setShowReportModal(false);
  };
  const handleConfirmClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!reportChatData) return;

    axios
      .post(
        `https://pikcha36.o-r.kr:8080/app/report/${reportChatData.chatId}`,
        {},
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      )
      .then((res) => {
        setChatData((p) => {
          const index = p.findIndex(
            (el) => el.verifyKey === reportChatData.verifyKey
          );
          return [
            ...p.slice(0, index),
            { ...p[index], isReported: true },
            ...p.slice(index + 1),
          ];
        });
        setAlertQueue((p) => [
          {
            id: Math.random(),
            message: "REPORT_COMPLETE",
          },
          ...p,
        ]);
      })
      .catch((err) => console.log("이미 신고한 메시지입니다"));

    setReportChatData(null);
    setShowReportModal(false);
  };
  return (
    <ReportModalWrapper>
      <ReportModalDiv>
        <div className="report-user">
          {reportChatData?.username}&nbsp;님의 게시글
        </div>
        <div className="report-content">{reportChatData?.content}</div>
        <DividerLine width="100%" margin="5px" />
        <ReportLabel>
          <AlarmIcon />
          신고
        </ReportLabel>
        <ReportForm id="report">
          <div>신고 사유를 선택해주세요</div>
          <div className="radio-box">
            <CheckboxContainer>
              <input type="checkbox" id="report1" />
              <label htmlFor="report1"></label>
              광고성 게시물
            </CheckboxContainer>
            <CheckboxContainer>
              <input type="checkbox" id="report2" />
              <label htmlFor="report2"></label>
              음란성 게시물
            </CheckboxContainer>
            <CheckboxContainer>
              <input type="checkbox" id="report3" />
              <label htmlFor="report3"></label>
              욕설, 부적절한 언어
            </CheckboxContainer>
            <CheckboxContainer>
              <input type="checkbox" id="report4" defaultChecked />
              <label htmlFor="report4"></label>
              기타
            </CheckboxContainer>
          </div>
          <textarea
            form="report"
            rows={3}
            placeholder="상세내용(선택)"
          ></textarea>
          <div className="modal-buttonBox">
            <button className="cancel-button" onClick={handleCancelClick}>
              취소
            </button>
            <button
              className="confirm-button"
              onClick={(e) => handleConfirmClick(e)}
            >
              확인
            </button>
          </div>
        </ReportForm>
      </ReportModalDiv>
    </ReportModalWrapper>
  );
};
export default ReportModal;

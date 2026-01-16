import { Button, Icon } from "semantic-ui-react";
import ExportButton from "./ExportButton"; // 引入剛才寫好的按鈕

export default function SwitchBtn({ setCurrentDate, year, month, targetRef }) {
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const thisMonth = () => setCurrentDate(new Date());
  return (
    <div className="test-switch-btn">
      <div className="test-switch-btn-left-side">
        <Button circular icon onClick={prevMonth}>
          <Icon name="chevron left" />
        </Button>

        <Button icon onClick={thisMonth}>
          <Icon name="home" />
        </Button>

        <Button circular icon onClick={nextMonth}>
          <Icon name="chevron right" />
        </Button>
      </div>
      <div className="test-switch-btn-right-side">
        <ExportButton
          targetRef={targetRef}
          fileName={`${year}_${month+1}月曆.pdf`}
          label="點我匯出月曆"
        />
        {/* <Button basic  icon onClick={print}>
          <Icon name="print" />
        </Button> */}
      </div>
    </div>
  );
}

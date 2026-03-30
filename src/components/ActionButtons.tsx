interface ActionButtonsProps {
  onClearCompleted: () => void;
  onClearAll: () => void;
}

export default function ActionButtons({ onClearCompleted, onClearAll }: ActionButtonsProps) {
  return (
    <div className="actions">
      <button className="clear-btn" onClick={onClearCompleted}>
        清除已完成
      </button>
      <button className="clear-btn danger" onClick={onClearAll}>
        清除全部
      </button>
    </div>
  );
}

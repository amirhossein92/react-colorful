import React from "react";
import { formatClassName } from "../../utils/format";

interface Props {
  className?: string;
  top?: number;
  left: number;
  color: string;
  onClickStarted?: () => void;
  onClickEnded?: () => void;

  isSelected?: boolean;
  onRemove?: () => void;
}

export const Pointer = ({
  onClickStarted,
  onClickEnded,
  className,
  color,
  left,
  top = 0.5,
  isSelected,
  onRemove,
}: Props): JSX.Element => {
  const nodeClassName = formatClassName(["react-colorful__pointer", className]);

  const style = {
    top: `${top * 100}%`,
    left: `${left * 100}%`,
  };

  return (
    <div
      className={nodeClassName}
      style={style}
      onPointerDown={(event) => {
        if (!onClickStarted) return;
        (event.target as HTMLDivElement).setPointerCapture(event.pointerId);
        onClickStarted();
      }}
      onPointerUp={(event) => {
        if (!onClickEnded) return;
        (event.target as HTMLDivElement).releasePointerCapture(event.pointerId);
        onClickEnded();
      }}
    >
      {isSelected && (
        <div className="react-colorful__pointer-remove" onClick={() => onRemove && onRemove()}>
          &times;
        </div>
      )}
      <div className="react-colorful__pointer-fill" style={{ backgroundColor: color }} />
    </div>
  );
};

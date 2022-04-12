import React, { useState } from "react";

import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";

import { hsvaGradientToString, hsvaToRgbaString } from "../../utils/convert";
import { formatClassName } from "../../utils/format";
import { StopColor } from "../../types";

interface Props {
  className?: string;
  stopColors: StopColor[];
  onChange: (newStopColors: StopColor[]) => void;
  onSelectedStopColor: (selectedStopColor: StopColor) => void;
  onDeselect?: () => void;
}

const StopColorsBase = ({
  className,
  stopColors,
  onChange,
  onSelectedStopColor,
  onDeselect,
}: Props) => {
  const [selectedStopColor, setSelectedStopColor] = useState<StopColor | null>(null);
  const [lastSelectedStopColor, setLastSelectedStopColor] = useState<StopColor | null>(null);

  const handleMove = (interaction: Interaction) => {
    if (!selectedStopColor) return;

    selectedStopColor.offset = interaction.left;
    onChange([...stopColors]);
  };

  const handleKey = (offset: Interaction) => {
    // Hue measured in degrees of the color circle ranging from 0 to 360
    // onChange([]);
  };

  const nodeClassName = formatClassName(["react-colorful__stop-colors", className]);

  const onRemovePoint = (stopColor: StopColor | null) => {
    if (!stopColor) return;

    onDeselect && onDeselect();
    onChange([
      ...stopColors.filter((q) => q.hsva !== stopColor.hsva && q.offset !== stopColor.offset),
    ]);
  };

  const onAdd = () => {
    onChange([...stopColors, { hsva: { h: 30, s: 0, v: 0, a: 1 }, offset: 0.5 }]);
  };

  return (
    <div
      className={nodeClassName}
      style={{
        background: hsvaGradientToString({ stopColors, type: "linear", direction: "to right" }),
      }}
    >
      <Interactive onMove={handleMove} onKey={handleKey} aria-label="Stop Colors">
        {stopColors.map(({ hsva, offset }, index) => (
          <Pointer
            key={index}
            className={formatClassName(["react-colorful__stop-colors-pointer"])}
            isSelected={lastSelectedStopColor ? lastSelectedStopColor.hsva === hsva : false}
            left={offset}
            color={hsvaToRgbaString(hsva)}
            onClickStarted={() => {
              setSelectedStopColor(stopColors[index]);
              onSelectedStopColor(stopColors[index]);
            }}
            onClickEnded={() => {
              selectedStopColor && onSelectedStopColor(selectedStopColor);
              setLastSelectedStopColor(selectedStopColor);
              setSelectedStopColor(null);
            }}
            onRemove={() => onRemovePoint(lastSelectedStopColor)}
          />
        ))}
        <div className="react-colorful__stop-colors-add" onClick={onAdd}>
          +
        </div>
      </Interactive>
    </div>
  );
};

export const StopColors = React.memo(StopColorsBase);

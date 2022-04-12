import React, { useEffect, useRef, useState } from "react";

import {
  ColorModel,
  ColorPickerBaseProps,
  StopColor,
  HsvaColor,
  GradientColor,
  GradientColorModel,
} from "../../types";
import { useStyleSheet } from "../../hooks/useStyleSheet";
import { formatClassName } from "../../utils/format";
import { StopColors } from "./StopColors";
import { AlphaColorPicker } from "./AlphaColorPicker";
import { equalColorObjects } from "../../utils/compare";
import { roundHsva } from "../../utils/convert";
import { useEventCallback } from "../../hooks/useEventCallback";

interface Props<T extends GradientColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: GradientColorModel<T>;
  hasHexInput?: boolean;
  hasRgbInput?: boolean;
}

const hsvaColorModel: ColorModel<HsvaColor> = {
  defaultColor: { h: 0, s: 0, v: 0, a: 1 },
  toHsva: (hsva) => hsva,
  fromHsva: roundHsva,
  equal: equalColorObjects,
};

export const GradientAlphaColorPicker = <T extends GradientColor>({
  className,
  colorModel,
  color = colorModel.defaultColor,
  onChange,
  hasHexInput,
  hasRgbInput,
  ...rest
}: Props<T>): JSX.Element => {
  const nodeRef = useRef<HTMLDivElement>(null);
  useStyleSheet(nodeRef);

  const onChangeCallback = useEventCallback<T>(onChange);

  const [stopColors, setStopColors] = useState<StopColor[]>(color.stopColors);
  const [selectedStopColor, setSelectedStopColor] = useState<StopColor | null>(null);

  const nodeClassName = formatClassName(["react-colorful", className]);

  const onSelectedStopColor = (stopColor: StopColor) => {
    setSelectedStopColor(stopColor);
  };

  const onSelectedColorChanged = (color: HsvaColor) => {
    if (!selectedStopColor) return;

    const updatedStopColor = { offset: selectedStopColor.offset, hsva: color };
    const updatedStopColors = [
      ...stopColors.filter((q) => q.offset != updatedStopColor.offset),
      updatedStopColor,
    ];

    setSelectedStopColor(updatedStopColor);
    setStopColors(updatedStopColors);
  };

  useEffect(() => {
    onChangeCallback({ ...color, stopColors });
  }, [stopColors, onChangeCallback]);

  return (
    <div {...rest} ref={nodeRef} className={nodeClassName}>
      <StopColors
        onChange={setStopColors}
        stopColors={stopColors}
        onSelectedStopColor={onSelectedStopColor}
        onDeselect={() => setSelectedStopColor(null)}
      />

      <AlphaColorPicker
        colorModel={hsvaColorModel}
        color={selectedStopColor ? selectedStopColor.hsva : hsvaColorModel.defaultColor}
        onChange={onSelectedColorChanged}
        hasHexInput={hasHexInput}
        hasRgbInput={hasRgbInput}
      />
    </div>
  );
};

import React, { ReactNode, useRef } from "react";

import { Hue } from "./Hue";
import { Saturation } from "./Saturation";
import { Alpha } from "./Alpha";

import { ColorModel, ColorPickerBaseProps, AnyColor, HsvaColor } from "../../types";
import { useColorManipulation } from "../../hooks/useColorManipulation";
import { useStyleSheet } from "../../hooks/useStyleSheet";
import { formatClassName } from "../../utils/format";
import { HexColorInput } from "../HexColorInput";
import { hexToHsva, hsvaToHex, hsvaToRgba, rgbaToHsva } from "../../utils/convert";
import { RgbaColorInput } from "../RgbaColorInput";

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>;
  inputRender?: (data: {
    value: Partial<HsvaColor>;
    onChange: (color: Partial<HsvaColor>) => void;
  }) => ReactNode;
}

export const AlphaColorPicker = <T extends AnyColor>({
  className,
  colorModel,
  color = colorModel.defaultColor,
  hasHexInput,
  hasRgbInput,
  onChange,
  inputRender,
  ...rest
}: Props<T>): JSX.Element => {
  const nodeRef = useRef<HTMLDivElement>(null);
  useStyleSheet(nodeRef);

  const [hsva, updateHsva] = useColorManipulation<T>(colorModel, color, onChange);

  const nodeClassName = formatClassName(["react-colorful", className]);

  return (
    <div {...rest} ref={nodeRef} className={nodeClassName}>
      <Saturation hsva={hsva} onChange={updateHsva} />
      <Hue hue={hsva.h} onChange={updateHsva} />
      <Alpha hsva={hsva} onChange={updateHsva} className="react-colorful__last-control" />

      {inputRender && inputRender({ value: hsva, onChange: updateHsva })}
      {(hasRgbInput || hasHexInput) && (
        <div className="react-colorful__inputs">
          {hasRgbInput && (
            <RgbaColorInput
              alpha
              color={hsvaToRgba(hsva)}
              onChange={(newColor) => updateHsva(rgbaToHsva(newColor))}
            />
          )}
          {hasHexInput && (
            <div className={`react-colorful__hex-wrapper`}>
              <label>{"HEX"}</label>
              <HexColorInput
                className="react-colorful__hex"
                color={hsvaToHex(hsva)}
                prefixed
                alpha
                onChange={(newColor) => updateHsva(hexToHsva(newColor))}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

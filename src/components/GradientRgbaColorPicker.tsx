import React, { ReactNode } from "react";

import { GradientAlphaColorPicker } from "./common/GradientAlphaColorPicker";
import { ColorPickerBaseProps, GradientColorModel, GradientHsvaColor, HsvaColor } from "../types";

export interface GradientRgbaColorPickerProps {
  hasHexInput?: boolean;
  hasRgbInput?: boolean;
  inputRender?: (data: {
    value: Partial<HsvaColor>;
    onChange: (color: Partial<HsvaColor>) => void;
  }) => ReactNode;
}

const colorModel: GradientColorModel<GradientHsvaColor> = {
  defaultColor: {
    stopColors: [
      { hsva: { h: 0, s: 100, v: 100, a: 1 }, offset: 0 },
      { hsva: { h: 60, s: 100, v: 100, a: 1 }, offset: 0.5 },
      { hsva: { h: 240, s: 100, v: 50, a: 1 }, offset: 1 },
    ],
    type: "linear",
    direction: "to bottom",
  },
};

export const GradientRgbaColorPicker = (
  props: Partial<ColorPickerBaseProps<GradientHsvaColor>> & GradientRgbaColorPickerProps
): JSX.Element => <GradientAlphaColorPicker {...props} colorModel={colorModel} />;

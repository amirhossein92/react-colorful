import React from "react";

import { GradientAlphaColorPicker } from "./common/GradientAlphaColorPicker";
import { ColorPickerBaseProps, GradientColorModel, GradientHsvaColor } from "../types";

const colorModel: GradientColorModel<GradientHsvaColor> = {
  defaultColor: {
    stopColors: [
      { hsva: { h: 0, s: 100, v: 100, a: 1 }, offset: 0 },
      { hsva: { h: 60, s: 100, v: 100, a: 1 }, offset: 0.5 },
      { hsva: { h: 240, s: 100, v: 50, a: 1 }, offset: 1 },
    ],
  },
};

export const GradientRgbaColorPicker = (
  props: Partial<ColorPickerBaseProps<GradientHsvaColor>>
): JSX.Element => <GradientAlphaColorPicker {...props} colorModel={colorModel} />;

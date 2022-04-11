import React from "react";

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface RgbaColor extends RgbColor {
  a: number;
}
export interface GradientHsvaColor {
  stopColors: StopColor[];
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface HslaColor extends HslColor {
  a: number;
}

export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

export interface StopColor {
  hsva: HsvaColor;
  offset: number;
}

export interface HsvaColor extends HsvColor {
  a: number;
}

export type ObjectColor = RgbColor | HslColor | HsvColor | RgbaColor | HslaColor | HsvaColor;
export type GradientColor = GradientHsvaColor;

export type AnyColor = string | ObjectColor | GradientColor;

export interface ColorModel<T extends AnyColor> {
  defaultColor: T;
  toHsva: (defaultColor: T) => HsvaColor;
  fromHsva: (hsva: HsvaColor) => T;
  equal: (first: T, second: T) => boolean;
}

export interface GradientColorModel<T extends GradientColor> {
  defaultColor: T;
}

type ColorPickerHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "color" | "onChange" | "onChangeCapture"
>;

export interface ColorPickerBaseProps<T extends AnyColor> extends ColorPickerHTMLAttributes {
  color: T;
  onChange: (newColor: T) => void;
}

type ColorInputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
>;

export interface ColorInputBaseProps extends ColorInputHTMLAttributes {
  color?: string;
  onChange?: (newColor: string) => void;
}

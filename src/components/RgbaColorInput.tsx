import React, { useCallback } from "react";
import { ColorInputBaseProps, RgbaColor } from "../types";

import { ColorInput } from "./common/ColorInput";

interface RgbaColorInputProps {
  color: RgbaColor;
  onChange: (color: RgbaColor) => void;
  /** Allows `#rgba` and `#rrggbbaa` color formats */
  alpha?: boolean;
}

export const RgbaColorInput = (props: RgbaColorInputProps): JSX.Element => {
  const { alpha, color, onChange, ...rest } = props;

  const handleChange = useCallback(
    (name: string, value: string): void => {
      onChange({ ...color, [name]: value });
    },
    [onChange, color]
  );

  return (
    <div className="rgba-color-input">
      <RgbIndividualInput
        name="r"
        label="R"
        {...rest}
        color={`${color.r}`}
        onChange={(value) => handleChange("r", value)}
      />
      <RgbIndividualInput
        name="g"
        label="G"
        {...rest}
        color={`${color.g}`}
        onChange={(value) => handleChange("g", value)}
      />
      <RgbIndividualInput
        name="b"
        label="B"
        {...rest}
        color={`${color.b}`}
        onChange={(value) => handleChange("b", value)}
      />
      {alpha && (
        <AlphaInput
          name="a"
          label="A"
          {...rest}
          color={`${color.a}`}
          onChange={(value) => handleChange("a", value)}
        />
      )}
    </div>
  );
};

interface RgbaIndividualInputProps extends ColorInputBaseProps {
  name: string;
  label: string;
  /** Allows `#rgba` and `#rrggbbaa` color formats */
  alpha?: boolean;
}

const RgbIndividualInput = (props: RgbaIndividualInputProps) => {
  const { name, label, ...rest } = props;

  /** Escapes all non-hexadecimal characters including "#" */
  const escape = useCallback((value: string) => value.replace(/([^0-9]+)/gi, "").substr(0, 3), []);

  /** Validates individual RGB strings */
  const validate = useCallback((value: string) => {
    const num = parseInt(value);
    return num >= 0 && num <= 255;
  }, []);

  return (
    <div className={`rgba-color-input__wrapper`}>
      <label>{label}</label>
      <ColorInput
        {...rest}
        className={`rgba-color-input__${name}`}
        escape={escape}
        format={undefined}
        process={(value) => value}
        validate={validate}
        type="number"
      />
    </div>
  );
};

const AlphaInput = (props: RgbaIndividualInputProps) => {
  const { name = "a", label, ...rest } = props;

  /** Escapes all non-hexadecimal characters including "#" */
  const escape = useCallback((value: string) => value.replace(/([^0-9.]+)/gi, "").substr(0, 4), []);

  /** Validates individual RGB strings */
  const validate = useCallback((value: string) => {
    const num = parseInt(value);
    return num >= 0 && num <= 1;
  }, []);

  return (
    <div className={`rgba-color-input__wrapper`}>
      <label>{label}</label>
      <ColorInput
        {...rest}
        className={`rgba-color-input__${name}`}
        escape={escape}
        format={undefined}
        process={(value) => value}
        validate={validate}
      />
    </div>
  );
};

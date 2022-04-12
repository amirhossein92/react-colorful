import React, { useState } from "react";
import ReactDOM from "react-dom";
import { RgbaColor } from "../../src";
import { DevTools } from "./components/DevTools";
import { useFaviconColor } from "./hooks/useFaviconColor";
import { useBodyBackground } from "./hooks/useBodyBackground";
import { useStargazerCount } from "./hooks/useStargazerCount";
import {
  GlobalStyles,
  Header,
  HeaderContent,
  HeaderDemo,
  HeaderDemoPicker,
  HeaderDescription,
  HeaderTitle,
  Link,
  LinkStarIcon,
  Links,
  LinkSeparator,
} from "./styles";
import { GradientHsvaColor } from "../../src/types";
import { hsvaGradientToString, rgbaToHsva } from "../../src/utils/convert";

// See http://www.w3.org/TR/AERT#color-contrast
const getBrightness = ({ r, g, b }: RgbaColor) => (r * 299 + g * 587 + b * 114) / 1000;

const getRandomColor = (): GradientHsvaColor => {
  const colors = [
    { r: 209, g: 97, b: 28, a: 1 }, // orange
    { r: 34, g: 91, b: 161, a: 1 }, // blue
    { r: 225, g: 17, b: 135, a: 0.7625 }, // purple
    { r: 21, g: 139, b: 59, a: 1 }, // green
    { r: 189, g: 60, b: 60, a: 1 }, // salmon
  ];

  const firstColor = colors[Math.floor(Math.random() * colors.length)];
  const secondColor = colors[Math.floor(Math.random() * colors.length)];
  const thirdColor = colors[Math.floor(Math.random() * colors.length)];

  return {
    stopColors: [
      { offset: 0, hsva: rgbaToHsva(firstColor) },
      { offset: 0.5, hsva: rgbaToHsva(secondColor) },
      { offset: 1, hsva: rgbaToHsva(thirdColor) },
    ],
    type: "linear",
    direction: "to bottom",
  };
};

const Demo = () => {
  const [color, setColor] = useState<GradientHsvaColor>(getRandomColor);
  const textColor = "#FFF";

  const stargazerCount = useStargazerCount();

  const handleChange = (color: GradientHsvaColor) => {
    console.log("🎨", color);
    setColor(color);
  };

  const colorString = hsvaGradientToString(color);

  useBodyBackground(colorString);
  useFaviconColor(colorString);

  return (
    <div>
      <GlobalStyles />

      <Header style={{ color: textColor }}>
        <HeaderDemo>
          <HeaderDemoPicker color={color} onChange={handleChange} />
        </HeaderDemo>
        <HeaderContent>
          <HeaderTitle>React Colorful 🎨</HeaderTitle>
          <HeaderDescription>
            A tiny color picker component for React and Preact apps
          </HeaderDescription>

          <Links>
            <Link
              href="https://github.com/omgovich/react-colorful"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <LinkSeparator />
              <LinkStarIcon />
              {stargazerCount}
            </Link>
            <Link
              href="https://www.npmjs.com/package/react-colorful"
              target="_blank"
              rel="noreferrer"
            >
              NPM
            </Link>
          </Links>
        </HeaderContent>
      </Header>

      {/* {process.env.NODE_ENV === "development" && <DevTools />} */}
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));

import React from "react";
import { GradientBg1 } from "../../icons/GradientBg1";
import "./style.css";

export const Index = () => {
  return (
    <div className="index">
      <div className="div">
        <div className="overlap">
          <GradientBg1 className="gradient-BG" />
          <div className="rectangle" />
          <div className="group">
            <img
              className="chevron-left"
              alt="Chevron left"
              src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c654e3cea0d4810c2d3337/img/chevron-left-1.svg"
            />
            <div className="text-wrapper">검색할 내용을 입력해주세요</div>
            <div className="overlap-group">
              <img
                className="vector"
                alt="Vector"
                src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c654e3cea0d4810c2d3337/img/vector-1.svg"
              />
            </div>
          </div>
          <div className="text-wrapper-2">원하는 책을 검색해 보세요!</div>
          <img
            className="line"
            alt="Line"
            src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c654e3cea0d4810c2d3337/img/line-2-1.svg"
          />
        </div>
        <div className="text-wrapper-3">11,000원</div>
        <div className="div-wrapper">
          <div className="text-wrapper-4">재고</div>
        </div>
        <div className="overlap-2">
          <div className="element-columns">
            <div className="column" />
            <div className="column" />
            <div className="column" />
          </div>
          <div className="new-page" />
        </div>
      </div>
    </div>
  );
};

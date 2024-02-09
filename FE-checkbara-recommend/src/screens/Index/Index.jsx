import React from "react";
import { GradientBg } from "../../icons/GradientBg";
import "./style.css";

export const Index = () => {
  return (
    <div className="index">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <GradientBg className="gradient-BG" />
          <div className="rectangle" />
          <img
            className="group"
            alt="Group"
            src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c66a91aeea4e0fd74766d7/img/group-33586@2x.png"
          />
          <div className="text-wrapper">AI에게 책 추천받기</div>
          <div className="div">질문 예시입니다</div>
          <div className="rectangle-2" />
          <p className="p">도커에 대한 정보도 친절하게 설명이 되어 있는 쿠버네티스 입문 책 추천해줘</p>
          <div className="rectangle-3" />
          <p className="text-wrapper-2">쿠우쿠우 많이 먹을 수 있는 방법이 나와있는 책 추천해줘</p>
          <img
            className="union"
            alt="Union"
            src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c66a91aeea4e0fd74766d7/img/union.svg"
          />
          <img
            className="line"
            alt="Line"
            src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c66a91aeea4e0fd74766d7/img/line-2.svg"
          />
          <div className="text-wrapper-3">검색할 내용을 입력해주세요</div>
          <div className="frame">
            <div className="scan-wrapper">
              <img
                className="scan"
                alt="Scan"
                src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c66a91aeea4e0fd74766d7/img/scan.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

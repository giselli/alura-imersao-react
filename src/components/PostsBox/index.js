import styled from "styled-components";
import Box from "../Box";

export const PostsBoxWrapper = styled(Box)`
  h1 {
    font-size: 16px;
    text-align: left;
  }

  .textos {
    text-align: left;
  }

  .depoimentos {
    padding: 12px;
    font-size: 24px;
  }

  p {
    font-size: 14px;
    text-align: center;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
  }

  .alinhados {
    display: flex;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 10%;
    height: 100%;
    position: relative;
    padding-right: 12px;
  }
  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #ffffff;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1;
      background-image: linear-gradient(0deg, #00000073, transparent);
    }
  }
`;

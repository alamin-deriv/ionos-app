import React, { useState, Fragment } from "react";
import styled, { css } from "styled-components";
import { transparentize } from "polished";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  margin-top: ${(props) => props.spaceTop};
  /* left: 0; */
`;

const SideMenu = styled.div`
  width: ${(props) => props.openWidth};
  display: block;
  z-index: ${(props) => props.zIndex};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  position: fixed;
  box-sizing: border-box;
  height: ${(props) =>
    props.spaceTop ? `calc(100vh - ${props.spaceTop})` : "100vh"};
  top: ${(props) => (props.spaceTop ? props.spaceTop : 0)};
  left: 0;
  padding: 20px;
  overflow: auto;
  overflow-x: hidden;
  white-space: nowrap;
  transition: width 450ms ease-in-out;

  ${(props) =>
    props.collapse &&
    css`
      width: ${(props) => props.closeWidth};
    `}

  & .sidemenu {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;

    & .menuItem {
      margin: 10px 0;
      & a {
        box-sizing: border-box;
        cursor: pointer;
        width: 100%;
        display: block;
        border-radius: 5px;
        text-transform: capitalize;
        font-size: ${(props) => props.fontSize};
        text-decoration: none;
        padding: 10px;
        color: ${(props) => (props.fontColor ? props.fontColor : "#17223b")};

        & i {
          margin-right: 28px;
        }

        &.active {
          background-color: ${(props) =>
            props.activeLinkColor ? props.activeLinkColor : "#e42c64"};
          color: ${(props) =>
            props.activeLinkFontColor ? props.activeLinkFontColor : "#fff"};

          &:hover {
            background-color: ${(props) =>
              props.activeLinkColor ? props.activeLinkColor : "#e42c64"};
            color: ${(props) =>
              props.activeLinkFontColor ? props.activeLinkFontColor : "#fff"};
          }
        }
        &:hover {
          background-color: ${(props) =>
            transparentize(
              0.9,
              props.hoverLinkColor ? props.hoverLinkColor : "#17223b"
            )};
          color: ${(props) =>
            props.hoverLinkFontColor ? props.hoverLinkFontColor : "#17223b"};
        }
      }
    }
  }

  & .bottom-section {
    bottom: 0;
    left: 0;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
`;

const Content = styled.div`
  margin-left: ${(props) => props.openWidth};
  background-color: ${(props) =>
    props.contentBgcolor ? props.contentBgcolor : "#FAFAFA"};
  height: 100vh;
  flex-grow: 1;
  transition: margin-left 450ms ease-in-out;

  ${(props) =>
    props.collapse &&
    css`
      margin-left: ${(props) => props.closeWidth};
    `}

  ${(props) =>
    props.noSideMenu &&
    css`
      margin-left: 0;
    `}
`;

const SidebarItem = ({
  icon,
  name,
  label,
  link,
  subItems,
  isActive,
  depthStep = 10,
  depth = 0,
  onClick,
  ...rest
}) => {
  return (
    <Fragment>
      <li
        className={`menuItem ${isActive ? "active" : ""}`}
        {...rest}
        key={name}
      >
        <NavLink to={link}>
          {icon && <img src={icon} alt="app logo" height="25px" />}
        </NavLink>
      </li>
    </Fragment>
  );
};

export const Layout = ({ menuItems, depthStep, depth, ...props }) => {
  const [active, setActive] = useState(null);
  return (
    <LayoutContainer {...props}>
      {props.noSideMenu ? null : (
        <SideMenu
          openWidth={props.openWidth}
          closeWidth={props.closeWidth}
          fontSize={props.fontSize}
          collapse={props.collapse}
          iconsOnly={props.iconsOnly}
          bgColor={props.bgColor}
          zIndex={props.zIndex}
          appLogo={props.appLogo}
          activeLinkColor={props.activeLinkColor}
          fontColor={props.fontColor}
          activeLinkFontColor={props.activeLinkFontColor}
          hoverLinkColor={props.hoverLinkColor}
          hoverLinkFontColor={props.hoverLinkFontColor}
          spaceTop={props.spaceTop}
        >
          <ul className="sidemenu">
            {props.collapse ? (
              <Fragment>
                {menuItems.map((sidebarItem, index) => (
                  <SidebarItem
                    key={sidebarItem.name}
                    depthStep={depthStep}
                    depth={depth}
                    onClick={setActive}
                    isActive={active === sidebarItem.name}
                    {...sidebarItem}
                  />
                ))}
              </Fragment>
            ) : (
              <Fragment>
                {menuItems.map((sidebarItem, index) => (
                  <SidebarItem
                    key={sidebarItem.name}
                    depthStep={depthStep}
                    depth={depth}
                    onClick={setActive}
                    isActive={active === sidebarItem.name}
                    {...sidebarItem}
                  />
                ))}
              </Fragment>
            )}
          </ul>
        </SideMenu>
      )}
      <Content {...props}>{props.children}</Content>
    </LayoutContainer>
  );
};

Layout.defaultProps = {
  openWidth: "250px",
  closeWidth: "100px",
  zIndex: 99,
  fontSize: "12px",
  spaceTop: "0",
  collapse: false,
};

Layout.propTypes = {
  openWidth: PropTypes.string,
  closeWidth: PropTypes.string,
  zIndex: PropTypes.number,
  bgColor: PropTypes.string,
  collapse: PropTypes.bool,
  fontSize: PropTypes.string,
  spaceTop: PropTypes.string,
  contentBgcolor: PropTypes.string,
  noSideMenu: PropTypes.bool,
  fontColor: PropTypes.string,
  appLogo: PropTypes.any,
  activeLinkColor: PropTypes.string,
  activeLinkFontColor: PropTypes.string,
  hoverLinkColor: PropTypes.string,
  hoverLinkFontColor: PropTypes.string,
  bottomSection: PropTypes.any,
  menuData: PropTypes.any,
};

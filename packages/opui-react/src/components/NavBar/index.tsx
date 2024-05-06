/** @jsxImportSource @emotion/react */

import { ReactNode, useEffect, useState } from 'react';
import { ComponentBaseProps } from '../props';
import { useCSS, useThemedCSS, useTheme, useMobileStyles } from '../../styles/css';
import { throttle } from '../../utils';
type NavBarItemProps = ComponentBaseProps & {
  content?: ReactNode;
};

type NavBarProps = ComponentBaseProps & {
  color?: string;
  gap?: string;
  fixed?: boolean;
  sticky?: boolean;
  hideOnScroll?: boolean;
};
let sy = 0;
/**
 * 位于页面顶部的响应式导航标题，包括对品牌、链接、导航、折叠等的支持。
 * ```
 * <NavBar fixed>
 *  <NavBar.b
 * </NavBar>
 * ```
 * @param content 栏和页面的内容在栏的中心对齐。
 * @param color bar's background color.
 * @param gap the gap of the content,extra,navIcon
 */
const NavBar = ({ color, fixed,sticky, css, gap, hideOnScroll, children, ...props }: NavBarProps) => {
  const [translateY, setTranslateY] = useState(0);

  const theme = useTheme();
  const navStyles = useCSS({
    padding: theme.app.navBar.padding,
    maxHeight: theme.app.navBar.height,
    minHeight: theme.app.navBar.height,
    alignItems: 'center',
    backgroundColor: color,
    display: 'flex',
    justifyContent: 'center',
    position: sticky ? 'sticky' : fixed?'fixed':'static',
    top: 0,
    left:0,
    right:0,
    transition: 'transform .25s ease-out',
    ...(hideOnScroll && { transform: `translateY(-${translateY}%)` }),
    gap,
    ...useMobileStyles(theme, {}),
    ...useThemedCSS(theme, css),
  });
  const headerStyles = useCSS({
    height:'100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color,
    display: 'flex',
    gap,
  });

  const handleScroll = throttle(() => {
    if (window.scrollY != sy) {
      if (window.scrollY > sy) {
        setTranslateY(100);
      } else {
        setTranslateY(0);
      }
      sy = window.scrollY;
    }
  }, 300);

  useEffect(
    hideOnScroll
      ? () => {
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }
      : () => {},
    [],
  );

  return (
    <nav css={navStyles}>
      <header css={headerStyles} {...props}>
        {children}
      </header>
    </nav>
  );
};

const NavBarBrand = ({ content, css, children, ...props }: NavBarItemProps) => {
  const theme = useTheme();
  const styles = useCSS({
    display: 'flex',
    alignItems: 'center',
    flex: 1.5,
    ...useThemedCSS(theme, css),
  });
  return (
    <div css={styles} {...props}>
      {children}
    </div>
  );
};
const NavBarContent = ({ content, css, children, ...props }: NavBarItemProps) => {
  const theme = useTheme();
  const styles = useCSS({
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    ...useThemedCSS(theme, css),
  });
  return (
    <div css={styles} {...props}>
      {children}
    </div>
  );
};
const NavBarExtra = ({ content, css, children, ...props }: NavBarItemProps) => {
  const theme = useTheme();
  const styles = useCSS({
    flex: 1.5,

    ...useThemedCSS(theme, css),
  });
  return (
    <div css={styles} {...props}>
      {children}
    </div>
  );
};

NavBar.Brand = NavBarBrand;
NavBar.Content = NavBarContent;
NavBar.Extra = NavBarExtra;
export default NavBar;

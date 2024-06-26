/** @jsxImportSource @emotion/react */

import { ComponentBaseProps, Margin, Padding, Themed } from '../props';
import { useThemedCSS, useCSS, useTheme, useMargin, usePadding, useThemedProps } from '../../styles/css';
import { ComponentPropsWithoutRef } from 'react';
import CheckBox from '../CheckBox';
import { motion } from 'framer-motion';
type IconProps = Omit<ComponentBaseProps, 'className'> &
  Margin &
  Padding & {
    width?: string;
    height?: string;
    size?: Themed<string>;
    white?:boolean
    color?: Themed<string>;
    type?: 'loading' | 'plus' | 'male' | 'female' | 'back' | 'close' | 'home' | 'search' | 'user' | 'face' | 'message';
    src?: string;
    onClick?: () => any;
  };
const Icon = ({
  width,
  height,
  color,
  white,
  size,
  css,
  src,
  type,
  onClick,
  ...props
}: // Omit<ComponentPropsWithoutRef<'i'>, 'color'> &
IconProps) => {
  const theme = useTheme();
  const styles = useCSS({
    width,
    height,
    fontSize: useThemedProps(theme, size),
    color: useThemedProps<string>(theme, color) ||
      (white
        ? theme.colors.white
        : (theme.darkMode
        ? theme.colors.white
        : theme.colors.black)),
    ...(type == 'close' && { transform: 'rotate(45deg)' }),
    ...usePadding(props),
    ...useMargin(props),
    ...useThemedCSS(theme, css),
  });

  const handleClickIcon = () => {
    onClick?.();
  };

  const getIconType = () => {
    switch (type) {
      case 'back':
        return 'bx bx-chevron-left';
      case 'home':
        return 'bx bx-home';
      case 'search':
        return 'bx bx-search';
      case 'user':
        return 'bx bx-user';
      case 'face':
        return 'bx bx-face';
      case 'close':
        return 'bx bx-plus';
      case 'plus':
        return 'bx bx-plus';
      case 'female':
        return 'bx bx-female-sign';
      case 'male':
        return 'bx bx-male-sign';
      case 'message':
        return 'bx bx-message-dots';

        break;

      default:
        return '';
        break;
    }
  };

  return <motion.i css={styles} className={src || getIconType()} onClick={handleClickIcon} {...props}></motion.i>;
};

export default Icon;

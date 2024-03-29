/** @jsxImportSource @emotion/react */

import { ComponentBaseProps, Margin, Padding, Themed } from '../props';
import { useThemedCSS, useCSS, useTheme, useMargin, usePadding, useThemedProps } from '../../styles/css';
import { ComponentPropsWithoutRef } from 'react';

type SvgProps = ComponentBaseProps &
  Margin &
  Padding & {
    width?: string;
    height?: string;
    color?: Themed<string>;
    src?: string;
    onClick?: () => any;
  };
const Svg = ({
  width,
  height,
  color,
  css,
  src,
  onClick,
  ...props
}: Omit<ComponentPropsWithoutRef<'div'>, 'color'> & SvgProps) => {
  const theme = useTheme();
  const styles = useCSS({
    display: 'inline-block',
    width: width || height || theme.spacing[10],
    height: height || width || theme.spacing[10],
    backgroundColor: useThemedProps(theme, color) || theme.colors.grey,
    mask: `url(${src}) no-repeat`,
    maskSize: '100% 100%',
    ...usePadding(props),
    ...useMargin(props),
    ...useThemedCSS(theme, css),
  });

  const handleClickSvg = () => {
    onClick?.();
  };
  return <div css={styles} onClick={handleClickSvg} {...props} />;
};

export default Svg;

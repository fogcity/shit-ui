import { useCSS, useTheme, useThemedCSS, useThemedProps } from '../../styles/css';
import tokens from '../../styles/tokens';
import { TagProps } from './tag.props';

export const getStyles = (props: TagProps) => {
  const { show, radius, outlined, css, color, rounded } = props;
  const theme = useTheme();
  const getComputedColor = () => useThemedProps(theme, color) || theme.colors.primary;
  return useCSS({
    position: 'relative',
    display: show ? 'inline-flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    padding: '0.2rem 0.6rem',
    borderRadius: useThemedProps(theme, radius) || (rounded ? theme.radius.rounded : theme.radius.base),
    ...(!outlined
      ? {
          background: getComputedColor(),
          color: theme.colors.white,
        }
      : {
          border: '1px solid ' + getComputedColor(),
          color: getComputedColor(),
        }),

    ...useThemedCSS(theme, css),
  });
};

/** @jsxImportSource @emotion/react */

import { ComponentBaseProps, Margin, Padding, Themed } from '../props';
import { useThemedCSS, useCSS, useTheme, useMargin, usePadding } from '../../styles/css';
import { forwardRef, ComponentPropsWithoutRef, Children, cloneElement, DetailedReactHTMLElement } from 'react';
type GridProps = ComponentBaseProps &
  Padding &
  Margin & {
    columns?: number;
    rowGap?: string;
    colGap?: string;
  };

type GridItemProps = ComponentBaseProps &
  Padding &
  Margin & {
    span?: string;
  };

/**
 * The responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.
 * ```js
 * <Grid columns={4} colGap={2}>
      <Grid.Item>Home</Grid.Item>
      <Grid.Item span={2}>Electronics</Grid.Item>
      <Grid.Item>Cameras</Grid.Item>
      <Grid.Item>Film</Grid.Item>
    </Grid>
 * ```
 * @param columns a row can contain how much item
 * @param gap grid gap with row & col
 */
const Grid = ({ columns, rowGap, colGap, css, children, ...props }: ComponentPropsWithoutRef<'div'> & GridProps) => {
  const theme = useTheme();
  const styles = useCSS({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridAutoRows: '1fr',
    gridColumnGap: colGap,
    gridRowGap: rowGap,
    ...useMargin(props),
    ...usePadding(props),
    ...useThemedCSS(theme, css),
  });

  return (
    <div css={styles} {...props}>
      {Children.map(children, (child: any, i) => {
        const element = child as DetailedReactHTMLElement<any, HTMLDivElement>;
        if (child.type.name == 'GridItem') {
          return (
            <>
              {cloneElement(element, {
                ...{ ...element.props },
              })}
            </>
          );
        }
        return undefined;
      })}
    </div>
  );
};

const GridItem = ({ span, css, children, ...props }: ComponentPropsWithoutRef<'div'> & GridItemProps) => {
  const theme = useTheme();
  const styles = useCSS({
    gridColumnEnd: 'span ' + (span || 1),
    ...useMargin(props),
    ...usePadding(props),
    ...useThemedCSS(theme, css),
  });

  return (
    <div css={styles} {...props}>
      {children}
    </div>
  );
};

Grid.Item = GridItem;
export default Grid;

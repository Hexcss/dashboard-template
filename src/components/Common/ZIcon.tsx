import * as React from 'react';
import { keyframes } from '@emotion/react';
import { Box, type BoxProps, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { LucideIcon } from 'lucide-react';

type Tone = 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error' | 'info';
type Variant = 'plain' | 'soft' | 'outline' | 'contained';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ZIconProps extends Omit<BoxProps, 'color'> {
  icon: LucideIcon;
  size?: Size;
  tone?: Tone;
  variant?: Variant;
  strokeWidth?: number;         // default 1.75
  interactive?: boolean;        // hover scale + tint
  rotate?: number;              // degrees
  mirrored?: boolean;           // horizontal flip
  spin?: boolean;               // infinite spin
  ariaLabel?: string;
}

const spinKeyframes = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const SIZE_MAP: Record<Size, number> = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 24,
  xl: 28,
};

export const ZIcon: React.FC<ZIconProps> = ({
  icon: Icon,
  size = 'md',
  tone = 'neutral',
  variant = 'plain',
  strokeWidth = 1.75,
  interactive = false,
  rotate = 0,
  mirrored = false,
  spin = false,
  ariaLabel,
  sx,
  ...rest
}) => {
  const theme = useTheme();

  // Resolve palette color for the tone
  const toneColor = (() => {
    const pal = theme.palette as any;
    if (tone === 'neutral') {
      return theme.palette.mode === 'dark'
        ? pal.text.primary
        : pal.text.primary;
    }
    return pal[tone]?.main ?? theme.palette.primary.main;
  })();

  // Container styling for variants that have surfaces
  const getContainerStyles = () => {
    const radius = (theme.shape?.borderRadius ?? 12) as number;

    if (variant === 'soft') {
      return {
        borderRadius: radius,
        background: alpha(toneColor, 0.10),
        outline: `1px solid ${alpha(toneColor, 0.20)}`,
      };
    }

    if (variant === 'outline') {
      const divider = alpha(toneColor, 0.35);
      return {
        borderRadius: radius,
        outline: `1px solid ${divider}`,
      };
    }

    if (variant === 'contained') {
      // Gradient primary if tone=primary, else flat
      const maybeGradient =
        tone === 'primary' && (theme as any).gradients?.primaryHard
          ? (theme as any).gradients.primaryHard
          : undefined;

      return {
        borderRadius: radius,
        background: maybeGradient ?? toneColor,
        color: theme.palette.getContrastText(toneColor),
      };
    }

    return {}; // plain
  };

  // Icon color rules
  const iconStyle = (() => {
    // In 'contained', the surface provides color; use contrast for strokes.
    if (variant === 'contained') {
      const contrast = theme.palette.getContrastText(toneColor);
      return { color: contrast, stroke: contrast };
    }
    return { color: toneColor, stroke: toneColor };
  })();

  const px = SIZE_MAP[size];
  const baseTransform = `
    rotate(${rotate}deg)
    ${mirrored ? 'scaleX(-1)' : 'scaleX(1)'}
  `;

  return (
    <Box
      aria-label={ariaLabel}
      role="img"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 0,
        padding: variant === 'plain' ? 0 : 6, // soft/outline/contained get a little breathing room
        ...getContainerStyles(),
        transition: `
          transform ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.sharp},
          outline-color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut},
          background-color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}
        `,
        transform: baseTransform,
        ...(interactive && {
          '&:hover': {
            transform: `${baseTransform} translateY(-1px) scale(1.03)`,
            outlineColor: alpha(toneColor, 0.45),
          },
          cursor: 'pointer',
        }),
        ...(spin && {
          animation: `${spinKeyframes} 1.1s linear infinite`,
        }),
        ...sx,
      }}
      {...rest}
    >
      <Icon
        size={px}
        strokeWidth={strokeWidth}
        style={{
          color: iconStyle.color,
          stroke: iconStyle.stroke,
          // keep Lucide crisp without fills; if you want a “duo” look,
          // you could set fill to alpha(toneColor, 0.08) here.
          fill: 'none',
          transition: `color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
        }}
      />
    </Box>
  );
};

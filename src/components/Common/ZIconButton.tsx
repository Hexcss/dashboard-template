import * as React from 'react';
import { IconButton, type IconButtonProps, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { LucideIcon } from 'lucide-react';
import { ZIcon, type ZIconProps } from './ZIcon';

type Tone = ZIconProps['tone'];
type Variant = ZIconProps['variant'];
type Size = 'xs' | 'sm' | 'md' | 'lg';

export interface ZIconButtonProps extends Omit<IconButtonProps, 'size' | 'color'> {
  icon: LucideIcon;
  size?: Size;                 // affects padding + icon size
  tone?: Tone;
  variant?: Variant;           // 'plain' | 'soft' | 'outline' | 'contained'
  strokeWidth?: number;
  spin?: boolean;
  ariaLabel?: string;
}

const PAD_MAP: Record<Size, number> = { xs: 4, sm: 6, md: 8, lg: 10 };
const ICON_SIZE_MAP: Record<Size, ZIconProps['size']> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const ZIconButton: React.FC<ZIconButtonProps> = ({
  icon,
  size = 'md',
  tone = 'neutral',
  variant = 'soft',
  strokeWidth = 1.75,
  spin = false,
  ariaLabel,
  sx,
  ...rest
}) => {
  const theme = useTheme();

  const toneColor = (() => {
    const pal = theme.palette as any;
    if (tone === 'neutral') return theme.palette.text.primary;
    return pal[tone]?.main ?? theme.palette.primary.main;
  })();

  const isContained = variant === 'contained';
  const isOutline = variant === 'outline';
  const isSoft = variant === 'soft';

  return (
    <IconButton
      aria-label={ariaLabel}
      disableRipple
      sx={{
        p: PAD_MAP[size],
        borderRadius: theme.shape.borderRadius,
        transition: `
          transform ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.sharp},
          background-color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut},
          outline-color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}
        `,
        ...(isSoft && {
          backgroundColor: alpha(toneColor, 0.10),
          outline: `1px solid ${alpha(toneColor, 0.20)}`,
          '&:hover': {
            backgroundColor: alpha(toneColor, 0.16),
            transform: 'translateY(-1px)',
            outlineColor: alpha(toneColor, 0.40),
          },
        }),
        ...(isOutline && {
          outline: `1px solid ${alpha(toneColor, 0.35)}`,
          '&:hover': {
            backgroundColor: alpha(toneColor, 0.08),
            transform: 'translateY(-1px)',
            outlineColor: alpha(toneColor, 0.55),
          },
        }),
        ...(isContained && {
          background: (theme as any).gradients?.primaryHard && tone === 'primary'
            ? (theme as any).gradients.primaryHard
            : toneColor,
          color: theme.palette.getContrastText(toneColor),
          '&:hover': {
            filter: 'brightness(1.06)',
            transform: 'translateY(-1px)',
          },
        }),
        // plain
        ...(variant === 'plain' && {
          '&:hover': {
            backgroundColor: alpha(toneColor, 0.06),
            transform: 'translateY(-1px)',
          },
        }),
        boxShadow: 'none',
        ...sx,
      }}
      {...rest}
    >
      <ZIcon
        icon={icon}
        size={ICON_SIZE_MAP[size]}
        tone={tone}
        variant={variant}
        strokeWidth={strokeWidth}
        spin={spin}
        ariaLabel={ariaLabel}
      />
    </IconButton>
  );
};

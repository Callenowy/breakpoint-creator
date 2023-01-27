import BreakpointsCreator, { RangeType, MediaType } from './breakpointsCreator';

export const DEFAULT_BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

type DefaultBreakpointsType = keyof typeof DEFAULT_BREAKPOINTS;
type BreakpointType<T> = T extends string ? T : DefaultBreakpointsType;

const createBreakpoints = <T>(
  breakpointsList?: Record<BreakpointType<T>, number>
) => {
  const breakpoints: Map<string, number> = new Map(
    Object.entries(breakpointsList || DEFAULT_BREAKPOINTS)
  );

  const breakpoint = new BreakpointsCreator(breakpoints);

  return (
    size: BreakpointType<T>,
    range: RangeType = 'only',
    type: MediaType = 'screen'
  ) => breakpoint.getMediaQuery(size, range, type);
};

export default createBreakpoints;

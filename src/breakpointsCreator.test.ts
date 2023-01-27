import BreakpointsBuilder, { RangeType, MediaType } from './breakpointsCreator';
import { DEFAULT_BREAKPOINTS } from './';

type WithExpected<T = {}> = T & { expected: string };

type RangeCaseType = {
  range?: RangeType;
  breakpoint: keyof typeof DEFAULT_BREAKPOINTS;
};

type MediaQueryCase = {
  size: keyof typeof DEFAULT_BREAKPOINTS;
  range?: RangeType;
  type?: MediaType;
};

const breakpoints: Map<string, number> = new Map(
  Object.entries(DEFAULT_BREAKPOINTS)
);

const breakpointInstance = new BreakpointsBuilder(breakpoints);

const rangeCases: WithExpected<RangeCaseType>[] = [
  {
    range: 'up',
    breakpoint: 'sm',
    expected: `(min-width: ${DEFAULT_BREAKPOINTS.sm}px)`,
  },
  {
    range: 'down',
    breakpoint: 'md',
    expected: `(max-width: ${DEFAULT_BREAKPOINTS.md - 1}px)`,
  },
  {
    range: 'only',
    breakpoint: 'lg',
    expected: `(min-width: ${DEFAULT_BREAKPOINTS.lg}px) and (max-width: ${
      DEFAULT_BREAKPOINTS.xl - 1
    }px)`,
  },
  {
    range: undefined,
    breakpoint: 'lg',
    expected: `(min-width: ${DEFAULT_BREAKPOINTS.lg}px) and (max-width: ${
      DEFAULT_BREAKPOINTS.xl - 1
    }px)`,
  },
];

const mediaQueryCases: WithExpected<MediaQueryCase>[] = [
  {
    size: 'xs',
    range: undefined,
    type: undefined,
    expected: `@media screen and (max-width: ${DEFAULT_BREAKPOINTS.sm - 1}px)`,
  },
  {
    size: 'md',
    range: 'down',
    type: undefined,
    expected: `@media screen and (max-width: ${DEFAULT_BREAKPOINTS.md - 1}px)`,
  },
  {
    size: 'md',
    range: 'up',
    type: 'screen',
    expected: `@media screen and (min-width: ${DEFAULT_BREAKPOINTS.md}px)`,
  },
  {
    size: 'md',
    range: 'only',
    type: 'print',
    expected: `@media print and (min-width: ${
      DEFAULT_BREAKPOINTS.md
    }px) and (max-width: ${DEFAULT_BREAKPOINTS.lg - 1}px)`,
  },
  {
    size: 'md',
    range: undefined,
    type: undefined,
    expected: `@media screen and (min-width: ${
      DEFAULT_BREAKPOINTS.md
    }px) and (max-width: ${DEFAULT_BREAKPOINTS.lg - 1}px)`,
  },
  {
    size: 'xxl',
    range: undefined,
    type: undefined,
    expected: `@media screen and (min-width: ${DEFAULT_BREAKPOINTS.xxl}px)`,
  },
  {
    size: 'xxl',
    range: 'only',
    type: undefined,
    expected: `@media screen and (min-width: ${DEFAULT_BREAKPOINTS.xxl}px)`,
  },
  {
    size: 'xxl',
    range: 'up',
    type: undefined,
    expected: `@media screen and (min-width: ${DEFAULT_BREAKPOINTS.xxl}px)`,
  },
];

describe('BreakpointsCreator', () => {
  it('allow call a new operator on BreakpointsBuilder', () => {
    expect(breakpointInstance).toBeTruthy();
  });

  it.each(rangeCases)(
    'return range for `$breakpoint`, `$range`',
    ({ range, breakpoint, expected }) => {
      const breakpointRange = breakpointInstance.getRange(breakpoint, range);

      expect(breakpointRange).toMatch(expected);
    }
  );

  it.each(mediaQueryCases)(
    'return media query for `$size`, `$range`, `$type`',
    ({ size, range, type, expected }) => {
      const breakpointRange = breakpointInstance.getMediaQuery(
        size,
        range,
        type
      );

      expect(breakpointRange).toMatch(expected);
    }
  );
});

export type RangeType = 'up' | 'down' | 'only';
export type MediaType = 'all' | 'screen' | 'print';

export default class BreakpointsCreator {
  private breakpoints: Map<string, number>;
  private values: number[] = [];

  constructor(breakpoints: Map<string, number>) {
    this.breakpoints = breakpoints;
    this.values = Array.from(breakpoints.values());
  }

  getRange(breakpoint: string, range?: RangeType) {
    const { breakpoints, values } = this;

    const width = breakpoints.get(breakpoint) || 0;
    const nextIndex = values.findIndex(bp => bp === width) + 1;
    const nextBreakpoint = values[nextIndex];

    const isLastBreakpoint = nextIndex === values.length;
    const isNull = (value: number) => value === 0;
    const matchRange = (matcher?: RangeType) => matcher === range;

    const maxW = !isLastBreakpoint
      ? `and (max-width: ${nextBreakpoint - 1}px)`
      : ``;

    switch (true) {
      case isNull(width):
        return `(max-width: ${nextBreakpoint - 1}px)`;
      case matchRange('up'):
        return `(min-width: ${width}px)`;
      case matchRange('down'):
        return `(max-width: ${width - 1}px)`;
      case matchRange('only'):
      default:
        return `(min-width: ${width}px) ${maxW}`;
    }
  }

  getMediaQuery(
    size: string,
    range: RangeType = 'only',
    type: MediaType = 'screen'
  ) {
    const viewportRange = this.getRange(size, range);

    return `@media ${type} and ${viewportRange}`;
  }
}

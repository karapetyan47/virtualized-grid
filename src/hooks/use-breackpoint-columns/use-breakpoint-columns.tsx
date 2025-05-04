import { useState, useEffect } from 'react';

import { T_Breakpoint } from './types';
import { C_Breakpoints } from './constants';

interface I_Props {
  containerRef: React.RefObject<HTMLElement | null>;
  breakpoints?: T_Breakpoint;
}

export const useBreakpointColumns = ({ containerRef, breakpoints = C_Breakpoints }: I_Props) => {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const sortedBreakpoints = Object.entries(breakpoints)
      .map(([br, col]) => [parseInt(br), col] as [number, number])
      .sort((a, b) => a[0] - b[0]);

    const updateColumns = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;

      let matchedColumns = 1;
      for (const [breakpoint, cols] of sortedBreakpoints) {
        if (width >= breakpoint) {
          matchedColumns = cols;
        } else {
          break;
        }
      }

      setColumns(matchedColumns);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [containerRef, breakpoints]);

  return columns;
};

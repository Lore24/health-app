import { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { WeightEntry } from '../stores/useProgressStore';
import { colors, spacing, typography } from '../theme';

type WeightChartProps = {
  entries: WeightEntry[];
  height?: number;
};

const PADDING = { top: 16, right: 16, bottom: 28, left: 36 };

export function WeightChart({ entries, height = 180 }: WeightChartProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const stats = useMemo(() => {
    if (entries.length === 0) return null;
    const values = entries.map((e) => e.weight);
    const min = Math.min(...values);
    const max = Math.max(...values);
    // Pad the range so a flat series still has room
    const span = max - min;
    const pad = span === 0 ? Math.max(2, max * 0.02) : span * 0.15;
    const yMin = min - pad;
    const yMax = max + pad;
    return { min, max, yMin, yMax };
  }, [entries]);

  const innerW = Math.max(0, width - PADDING.left - PADDING.right);
  const innerH = height - PADDING.top - PADDING.bottom;

  if (entries.length === 0 || !stats) {
    return (
      <View
        onLayout={onLayout}
        style={[styles.empty, { height }]}
      >
        <Text style={[typography.caption, { textAlign: 'center' }]}>
          Log your first weight to see the trend.
        </Text>
      </View>
    );
  }

  const xFor = (idx: number) => {
    if (entries.length === 1) return PADDING.left + innerW / 2;
    return PADDING.left + (idx / (entries.length - 1)) * innerW;
  };

  const yFor = (weight: number) => {
    const pct = (weight - stats.yMin) / (stats.yMax - stats.yMin);
    return PADDING.top + (1 - pct) * innerH;
  };

  const points = entries.map((e, i) => ({ x: xFor(i), y: yFor(e.weight), entry: e }));
  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const yTicks = [stats.yMax, (stats.yMax + stats.yMin) / 2, stats.yMin];

  return (
    <View onLayout={onLayout} style={{ height }}>
      {width > 0 && (
        <Svg width={width} height={height}>
          {yTicks.map((tick, i) => {
            const y = yFor(tick);
            return (
              <Line
                key={i}
                x1={PADDING.left}
                x2={width - PADDING.right}
                y1={y}
                y2={y}
                stroke={colors.sand}
                strokeWidth={1}
                strokeDasharray={i === 1 ? '0' : '3 4'}
              />
            );
          })}

          <Path
            d={pathD}
            stroke={colors.blush}
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((p, i) => (
            <Circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === points.length - 1 ? 5 : 3}
              fill={i === points.length - 1 ? colors.blush : colors.warmWhite}
              stroke={colors.blush}
              strokeWidth={2}
            />
          ))}
        </Svg>
      )}
      <View style={styles.yLabels} pointerEvents="none">
        <Text style={[typography.caption, styles.tick]}>
          {stats.yMax.toFixed(1)}
        </Text>
        <Text style={[typography.caption, styles.tick]}>
          {((stats.yMax + stats.yMin) / 2).toFixed(1)}
        </Text>
        <Text style={[typography.caption, styles.tick]}>
          {stats.yMin.toFixed(1)}
        </Text>
      </View>
      <View style={styles.xLabels}>
        <Text style={typography.caption}>{formatShortDate(entries[0].date)}</Text>
        {entries.length > 1 && (
          <Text style={typography.caption}>
            {formatShortDate(entries[entries.length - 1].date)}
          </Text>
        )}
      </View>
    </View>
  );
}

function formatShortDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  yLabels: {
    position: 'absolute',
    top: PADDING.top - 8,
    bottom: PADDING.bottom - 8,
    left: 0,
    width: PADDING.left - 4,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tick: {
    fontSize: 11,
  },
  xLabels: {
    position: 'absolute',
    left: PADDING.left,
    right: PADDING.right,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

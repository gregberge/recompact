# Benchmarks

These benchmarks compared three frameworks ([recompact](https://github.com/neoziro/recompact), [recompose](https://github.com/acdlite/recompose/), [reassemble](https://github.com/wikiwi/reassemble)).

Following operators are compared:

- defaultProps
- flattenProp
- mapProps
- onlyUpdateForKeys
- pure
- renameProp
- renameProps
- shouldUpdate
- withProps
- withPropsOnChange
- withReducer
- withState

For each operators, we have four benchmarks:

- mount - single: only one hoc is stacked, we bench the mount
- mount - composed: 100 hoc are stacked, we bench the mount
- setProps - single: only hoc is stacked, we bench the update of props
- setProps - composed: 100 hoc are stacked, we bench the update of props

## Results

These are the results running on a Macbook Pro Core i7 2,4 GHz.

The command to run them: `NODE_ENV=production babel-node src/__benchmarks__/operators.js`.

### defaultProps

```
Start benchmark [mount][single] defaultProps
-------------------------------
-- nothing x 64,763 ops/sec ±10.41% (11 runs sampled)
❤️  recompact x 59,815 ops/sec ±2.01% (12 runs sampled)
💙  recompose x 59,359 ops/sec ±1.21% (10 runs sampled)
💚  reassemble x 38,518 ops/sec ±2.26% (11 runs sampled)
-------------------------------
Winner: 💙  recompose, ❤️  recompact

Start benchmark [mount][composed] defaultProps
-------------------------------
-- nothing x 46,338 ops/sec ±49.26% (11 runs sampled)
❤️  recompact x 7,433 ops/sec ±3.22% (8 runs sampled)
💙  recompose x 2,485 ops/sec ±0.73% (10 runs sampled)
💚  reassemble x 3,264 ops/sec ±2.86% (13 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps] defaultProps
-------------------------------
-- nothing x 69,223 ops/sec ±1.94% (14 runs sampled)
❤️  recompact x 53,741 ops/sec ±5.43% (12 runs sampled)
💙  recompose x 58,805 ops/sec ±3.04% (10 runs sampled)
💚  reassemble x 38,477 ops/sec ±2.67% (12 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps][composed] defaultProps
-------------------------------
-- nothing x 67,978 ops/sec ±1.99% (12 runs sampled)
❤️  recompact x 7,718 ops/sec ±2.67% (12 runs sampled)
💙  recompose x 2,361 ops/sec ±2.25% (13 runs sampled)
💚  reassemble x 3,369 ops/sec ±2.52% (13 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

### flattenProp

```
Start benchmark [mount][single] flattenProp
-------------------------------
-- nothing x 65,429 ops/sec ±2.59% (13 runs sampled)
❤️  recompact x 55,352 ops/sec ±1.93% (13 runs sampled)
💙  recompose x 53,776 ops/sec ±1.98% (13 runs sampled)
💚  reassemble x 42,215 ops/sec ±2.22% (12 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [mount][composed] flattenProp
-------------------------------
-- nothing x 65,516 ops/sec ±4.63% (14 runs sampled)
❤️  recompact x 17,720 ops/sec ±2.03% (13 runs sampled)
💙  recompose x 21,032 ops/sec ±1.71% (15 runs sampled)
💚  reassemble x 11,376 ops/sec ±1.47% (13 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps] flattenProp
-------------------------------
-- nothing x 68,435 ops/sec ±1.72% (14 runs sampled)
❤️  recompact x 56,683 ops/sec ±6.97% (13 runs sampled)
💙  recompose x 58,544 ops/sec ±2.26% (13 runs sampled)
💚  reassemble x 43,617 ops/sec ±2.46% (11 runs sampled)
-------------------------------
Winner: 💙  recompose, ❤️  recompact

Start benchmark [setProps][composed] flattenProp
-------------------------------
-- nothing x 66,840 ops/sec ±3.62% (12 runs sampled)
❤️  recompact x 18,539 ops/sec ±2.32% (13 runs sampled)
💙  recompose x 20,121 ops/sec ±9.17% (13 runs sampled)
💚  reassemble x 11,651 ops/sec ±2.04% (12 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### mapProps

```
Start benchmark [mount][single] mapProps
-------------------------------
-- nothing x 65,718 ops/sec ±1.91% (14 runs sampled)
❤️  recompact x 55,465 ops/sec ±2.80% (12 runs sampled)
💙  recompose x 56,864 ops/sec ±1.52% (15 runs sampled)
💚  reassemble x 41,534 ops/sec ±1.43% (12 runs sampled)
-------------------------------
Winner: 💙  recompose, ❤️  recompact

Start benchmark [mount][composed] mapProps
-------------------------------
-- nothing x 63,865 ops/sec ±2.25% (13 runs sampled)
❤️  recompact x 26,480 ops/sec ±4.24% (13 runs sampled)
💙  recompose x 37,095 ops/sec ±1.34% (13 runs sampled)
💚  reassemble x 23,107 ops/sec ±1.70% (12 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps] mapProps
-------------------------------
-- nothing x 68,206 ops/sec ±1.67% (14 runs sampled)
❤️  recompact x 59,895 ops/sec ±1.91% (13 runs sampled)
💙  recompose x 62,001 ops/sec ±2.02% (14 runs sampled)
💚  reassemble x 44,136 ops/sec ±2.44% (12 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps][composed] mapProps
-------------------------------
-- nothing x 68,056 ops/sec ±2.37% (13 runs sampled)
❤️  recompact x 24,122 ops/sec ±23.70% (9 runs sampled)
💙  recompose x 39,447 ops/sec ±1.85% (11 runs sampled)
💚  reassemble x 22,851 ops/sec ±4.38% (14 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### onlyUpdateForKeys

```
Start benchmark [mount][single] onlyUpdateForKeys
-------------------------------
-- nothing x 56,835 ops/sec ±12.58% (11 runs sampled)
❤️  recompact x 68,754 ops/sec ±2.22% (13 runs sampled)
💙  recompose x 67,143 ops/sec ±3.41% (14 runs sampled)
💚  reassemble x 44,528 ops/sec ±11.08% (13 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [mount][composed] onlyUpdateForKeys
-------------------------------
-- nothing x 67,033 ops/sec ±1.82% (12 runs sampled)
❤️  recompact x 65,182 ops/sec ±2.11% (13 runs sampled)
💙  recompose x 63,342 ops/sec ±8.93% (13 runs sampled)
💚  reassemble x 5,277 ops/sec ±1.93% (13 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [setProps] onlyUpdateForKeys
-------------------------------
-- nothing x 63,118 ops/sec ±10.83% (11 runs sampled)
❤️  recompact x 59,669 ops/sec ±2.44% (13 runs sampled)
💙  recompose x 54,057 ops/sec ±9.90% (13 runs sampled)
💚  reassemble x 38,376 ops/sec ±7.28% (12 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps][composed] onlyUpdateForKeys
-------------------------------
-- nothing x 69,946 ops/sec ±2.31% (12 runs sampled)
❤️  recompact x 18,599 ops/sec ±9.13% (13 runs sampled)
💙  recompose x 2,126 ops/sec ±2.36% (12 runs sampled)
💚  reassemble x 3,857 ops/sec ±3.29% (12 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

### pure

```
Start benchmark [mount][single] pure
-------------------------------
-- nothing x 62,336 ops/sec ±7.38% (14 runs sampled)
❤️  recompact x 68,323 ops/sec ±2.55% (15 runs sampled)
💙  recompose x 68,729 ops/sec ±3.32% (13 runs sampled)
💚  reassemble x 44,645 ops/sec ±11.63% (13 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [mount][composed] pure
-------------------------------
-- nothing x 66,529 ops/sec ±2.78% (13 runs sampled)
❤️  recompact x 68,172 ops/sec ±2.17% (11 runs sampled)
💙  recompose x 62,644 ops/sec ±11.65% (9 runs sampled)
💚  reassemble x 4,351 ops/sec ±2.76% (12 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [setProps] pure
-------------------------------
-- nothing x 70,024 ops/sec ±2.20% (12 runs sampled)
❤️  recompact x 59,024 ops/sec ±9.33% (11 runs sampled)
💙  recompose x 61,277 ops/sec ±2.12% (12 runs sampled)
💚  reassemble x 42,769 ops/sec ±1.96% (14 runs sampled)
-------------------------------
Winner: 💙  recompose, ❤️  recompact

Start benchmark [setProps][composed] pure
-------------------------------
-- nothing x 65,549 ops/sec ±8.81% (12 runs sampled)
❤️  recompact x 22,418 ops/sec ±1.93% (14 runs sampled)
💙  recompose x 2,134 ops/sec ±1.95% (13 runs sampled)
💚  reassemble x 3,554 ops/sec ±18.59% (13 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

### renameProp

```
Start benchmark [mount][single] renameProp
-------------------------------
-- nothing x 65,424 ops/sec ±3.75% (12 runs sampled)
❤️  recompact x 48,230 ops/sec ±6.71% (15 runs sampled)
💙  recompose x 49,189 ops/sec ±2.61% (11 runs sampled)
💚  reassemble x 37,371 ops/sec ±2.25% (14 runs sampled)
-------------------------------
Winner: 💙  recompose, ❤️  recompact

Start benchmark [mount][composed] renameProp
-------------------------------
-- nothing x 62,092 ops/sec ±8.03% (13 runs sampled)
❤️  recompact x 6,437 ops/sec ±2.60% (13 runs sampled)
💙  recompose x 10,971 ops/sec ±1.93% (14 runs sampled)
💚  reassemble x 4,606 ops/sec ±13.71% (9 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps] renameProp
-------------------------------
-- nothing x 69,135 ops/sec ±2.28% (14 runs sampled)
❤️  recompact x 54,689 ops/sec ±1.31% (13 runs sampled)
💙  recompose x 49,707 ops/sec ±7.57% (13 runs sampled)
💚  reassemble x 39,595 ops/sec ±3.55% (11 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [setProps][composed] renameProp
-------------------------------
-- nothing x 70,816 ops/sec ±2.28% (14 runs sampled)
❤️  recompact x 6,188 ops/sec ±9.57% (14 runs sampled)
💙  recompose x 11,724 ops/sec ±2.94% (14 runs sampled)
💚  reassemble x 5,385 ops/sec ±2.79% (14 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### renameProps

```
Start benchmark [mount][single] renameProps
-------------------------------
-- nothing x 62,071 ops/sec ±7.39% (14 runs sampled)
❤️  recompact x 47,640 ops/sec ±2.82% (13 runs sampled)
💙  recompose x 48,077 ops/sec ±1.91% (15 runs sampled)
💚  reassemble x 29,269 ops/sec ±8.54% (12 runs sampled)
-------------------------------
Winner: 💙  recompose, ❤️  recompact

Start benchmark [mount][composed] renameProps
-------------------------------
-- nothing x 66,567 ops/sec ±2.30% (13 runs sampled)
❤️  recompact x 5,769 ops/sec ±1.98% (11 runs sampled)
💙  recompose x 9,360 ops/sec ±9.43% (13 runs sampled)
💚  reassemble x 2,648 ops/sec ±2.25% (11 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps] renameProps
-------------------------------
-- nothing x 71,071 ops/sec ±1.61% (14 runs sampled)
❤️  recompact x 46,750 ops/sec ±10.09% (11 runs sampled)
💙  recompose x 51,177 ops/sec ±2.08% (14 runs sampled)
💚  reassemble x 34,284 ops/sec ±1.83% (13 runs sampled)
-------------------------------
Winner: 💙  recompose, ❤️  recompact

Start benchmark [setProps][composed] renameProps
-------------------------------
-- nothing x 64,884 ops/sec ±11.97% (10 runs sampled)
❤️  recompact x 5,771 ops/sec ±3.77% (15 runs sampled)
💙  recompose x 10,063 ops/sec ±2.50% (11 runs sampled)
💚  reassemble x 2,450 ops/sec ±9.54% (12 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### shouldUpdate

```
Start benchmark [mount][single] shouldUpdate
-------------------------------
-- nothing x 67,567 ops/sec ±1.76% (13 runs sampled)
❤️  recompact x 72,650 ops/sec ±2.02% (12 runs sampled)
💙  recompose x 65,532 ops/sec ±12.32% (11 runs sampled)
💚  reassemble x 52,597 ops/sec ±2.32% (16 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [mount][composed] shouldUpdate
-------------------------------
-- nothing x 66,822 ops/sec ±3.11% (14 runs sampled)
❤️  recompact x 63,359 ops/sec ±7.84% (15 runs sampled)
💙  recompose x 74,559 ops/sec ±3.13% (14 runs sampled)
💚  reassemble x 4,014 ops/sec ±14.31% (12 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps] shouldUpdate
-------------------------------
-- nothing x 69,020 ops/sec ±2.52% (11 runs sampled)
❤️  recompact x 81,289 ops/sec ±1.86% (12 runs sampled)
💙  recompose x 75,639 ops/sec ±7.63% (13 runs sampled)
💚  reassemble x 54,783 ops/sec ±2.33% (14 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [setProps][composed] shouldUpdate
-------------------------------
-- nothing x 70,373 ops/sec ±2.04% (14 runs sampled)
❤️  recompact x 69,502 ops/sec ±10.75% (11 runs sampled)
💙  recompose x 79,169 ops/sec ±6.18% (15 runs sampled)
💚  reassemble x 4,295 ops/sec ±2.09% (12 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### withProps

```
Start benchmark [mount][single] withProps
-------------------------------
-- nothing x 61,896 ops/sec ±10.35% (12 runs sampled)
❤️  recompact x 54,845 ops/sec ±1.55% (15 runs sampled)
💙  recompose x 52,318 ops/sec ±7.56% (10 runs sampled)
💚  reassemble x 36,928 ops/sec ±9.22% (14 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [mount][composed] withProps
-------------------------------
-- nothing x 67,894 ops/sec ±2.53% (11 runs sampled)
❤️  recompact x 12,735 ops/sec ±2.60% (15 runs sampled)
💙  recompose x 13,021 ops/sec ±5.73% (14 runs sampled)
💚  reassemble x 6,697 ops/sec ±2.29% (14 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [setProps] withProps
-------------------------------
-- nothing x 70,030 ops/sec ±2.59% (14 runs sampled)
❤️  recompact x 55,849 ops/sec ±7.58% (14 runs sampled)
💙  recompose x 56,450 ops/sec ±2.81% (14 runs sampled)
💚  reassemble x 44,281 ops/sec ±1.54% (14 runs sampled)
-------------------------------
Winner: 💙  recompose, ❤️  recompact

Start benchmark [setProps][composed] withProps
-------------------------------
-- nothing x 64,878 ops/sec ±8.45% (13 runs sampled)
❤️  recompact x 13,043 ops/sec ±1.90% (14 runs sampled)
💙  recompose x 14,203 ops/sec ±2.42% (12 runs sampled)
💚  reassemble x 5,960 ops/sec ±9.71% (12 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### withPropsOnChange

```
Start benchmark [mount][single] withPropsOnChange
-------------------------------
-- nothing x 65,210 ops/sec ±4.18% (11 runs sampled)
❤️  recompact x 51,608 ops/sec ±3.47% (15 runs sampled)
💙  recompose x 48,754 ops/sec ±7.90% (14 runs sampled)
💚  reassemble x 36,204 ops/sec ±3.20% (12 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [mount][composed] withPropsOnChange
-------------------------------
-- nothing x 66,835 ops/sec ±2.39% (12 runs sampled)
❤️  recompact x 8,296 ops/sec ±9.14% (12 runs sampled)
💙  recompose x 1,750 ops/sec ±2.83% (13 runs sampled)
💚  reassemble x 3,070 ops/sec ±9.11% (15 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps] withPropsOnChange
-------------------------------
-- nothing x 68,400 ops/sec ±2.24% (16 runs sampled)
❤️  recompact x 51,893 ops/sec ±7.08% (12 runs sampled)
💙  recompose x 56,522 ops/sec ±3.15% (11 runs sampled)
💚  reassemble x 37,243 ops/sec ±6.43% (12 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps][composed] withPropsOnChange
-------------------------------
-- nothing x 66,656 ops/sec ±9.16% (12 runs sampled)
❤️  recompact x 8,249 ops/sec ±9.67% (12 runs sampled)
💙  recompose x 1,762 ops/sec ±2.72% (13 runs sampled)
💚  reassemble x 3,033 ops/sec ±9.25% (13 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

### withReducer

```
Start benchmark [mount][single] withReducer
-------------------------------
-- nothing x 61,309 ops/sec ±9.36% (12 runs sampled)
❤️  recompact x 35,687 ops/sec ±2.11% (14 runs sampled)
💙  recompose x 54,493 ops/sec ±2.90% (11 runs sampled)
💚  reassemble x 37,209 ops/sec ±9.43% (13 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [mount][composed] withReducer
-------------------------------
-- nothing x 66,176 ops/sec ±2.63% (13 runs sampled)
❤️  recompact x 8,647 ops/sec ±1.98% (10 runs sampled)
💙  recompose x 1,707 ops/sec ±8.73% (11 runs sampled)
💚  reassemble x 3,770 ops/sec ±4.10% (12 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps] withReducer
-------------------------------
-- nothing x 68,303 ops/sec ±1.99% (14 runs sampled)
❤️  recompact x 34,535 ops/sec ±8.08% (11 runs sampled)
💙  recompose x 59,859 ops/sec ±0.86% (13 runs sampled)
💚  reassemble x 43,267 ops/sec ±1.69% (14 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps][composed] withReducer
-------------------------------
-- nothing x 64,934 ops/sec ±10.68% (10 runs sampled)
❤️  recompact x 8,882 ops/sec ±2.65% (12 runs sampled)
💙  recompose x 1,866 ops/sec ±1.30% (15 runs sampled)
💚  reassemble x 3,724 ops/sec ±5.74% (12 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

### withState

```
Start benchmark [mount][single] withState
-------------------------------
-- nothing x 65,901 ops/sec ±2.25% (16 runs sampled)
❤️  recompact x 34,710 ops/sec ±2.16% (13 runs sampled)
💙  recompose x 51,176 ops/sec ±11.64% (10 runs sampled)
💚  reassemble x 38,817 ops/sec ±2.86% (13 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [mount][composed] withState
-------------------------------
-- nothing x 61,074 ops/sec ±7.72% (14 runs sampled)
❤️  recompact x 8,579 ops/sec ±1.92% (14 runs sampled)
💙  recompose x 1,824 ops/sec ±2.26% (13 runs sampled)
💚  reassemble x 3,874 ops/sec ±7.26% (14 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps] withState
-------------------------------
-- nothing x 69,132 ops/sec ±1.98% (13 runs sampled)
❤️  recompact x 37,446 ops/sec ±1.87% (15 runs sampled)
💙  recompose x 57,157 ops/sec ±9.63% (13 runs sampled)
💚  reassemble x 41,689 ops/sec ±2.27% (15 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps][composed] withState
-------------------------------
-- nothing x 67,909 ops/sec ±3.99% (13 runs sampled)
❤️  recompact x 8,315 ops/sec ±7.63% (13 runs sampled)
💙  recompose x 1,856 ops/sec ±2.34% (12 runs sampled)
💚  reassemble x 3,947 ops/sec ±3.03% (15 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

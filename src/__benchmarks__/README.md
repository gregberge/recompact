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
-- nothing x 31,564 ops/sec ±0.96% (87 runs sampled)
❤️  recompact x 17,163 ops/sec ±1.00% (87 runs sampled)
💙  recompose x 17,183 ops/sec ±0.79% (90 runs sampled)
💚  reassemble x 14,334 ops/sec ±0.95% (90 runs sampled)
-------------------------------
Winner: 💙  recompose, ❤️  recompact

Start benchmark [mount][composed] defaultProps
-------------------------------
-- nothing x 31,156 ops/sec ±0.97% (91 runs sampled)
❤️  recompact x 5,745 ops/sec ±1.09% (88 runs sampled)
💙  recompose x 1,569 ops/sec ±0.84% (89 runs sampled)
💚  reassemble x 5,011 ops/sec ±0.79% (91 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps] defaultProps
-------------------------------
-- nothing x 76,352 ops/sec ±2.07% (87 runs sampled)
❤️  recompact x 63,745 ops/sec ±2.49% (86 runs sampled)
💙  recompose x 61,771 ops/sec ±2.49% (87 runs sampled)
💚  reassemble x 41,534 ops/sec ±1.64% (91 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps][composed] defaultProps
-------------------------------
-- nothing x 71,619 ops/sec ±1.76% (85 runs sampled)
❤️  recompact x 13,099 ops/sec ±1.54% (90 runs sampled)
💙  recompose x 2,657 ops/sec ±1.29% (91 runs sampled)
💚  reassemble x 3,508 ops/sec ±1.87% (88 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

### flattenProp

```
Start benchmark [mount][single] flattenProp
-------------------------------
-- nothing x 30,643 ops/sec ±1.05% (89 runs sampled)
❤️  recompact x 16,760 ops/sec ±1.05% (87 runs sampled)
💙  recompose x 17,123 ops/sec ±0.98% (90 runs sampled)
💚  reassemble x 15,157 ops/sec ±0.76% (88 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [mount][composed] flattenProp
-------------------------------
-- nothing x 30,756 ops/sec ±0.95% (91 runs sampled)
❤️  recompact x 6,777 ops/sec ±1.78% (88 runs sampled)
💙  recompose x 11,463 ops/sec ±0.90% (90 runs sampled)
💚  reassemble x 9,759 ops/sec ±1.11% (90 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps] flattenProp
-------------------------------
-- nothing x 74,800 ops/sec ±2.13% (87 runs sampled)
❤️  recompact x 63,332 ops/sec ±2.27% (90 runs sampled)
💙  recompose x 64,334 ops/sec ±1.74% (89 runs sampled)
💚  reassemble x 48,437 ops/sec ±1.96% (87 runs sampled)
-------------------------------
Winner: 💙  recompose, ❤️  recompact

Start benchmark [setProps][composed] flattenProp
-------------------------------
-- nothing x 72,739 ops/sec ±1.60% (91 runs sampled)
❤️  recompact x 19,840 ops/sec ±1.73% (89 runs sampled)
💙  recompose x 22,901 ops/sec ±1.62% (89 runs sampled)
💚  reassemble x 13,060 ops/sec ±1.86% (89 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### mapProps

```
Start benchmark [mount][single] mapProps
-------------------------------
-- nothing x 29,976 ops/sec ±1.55% (87 runs sampled)
❤️  recompact x 16,753 ops/sec ±1.20% (84 runs sampled)
💙  recompose x 17,185 ops/sec ±0.86% (92 runs sampled)
💚  reassemble x 14,435 ops/sec ±2.00% (85 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [mount][composed] mapProps
-------------------------------
-- nothing x 30,695 ops/sec ±0.99% (90 runs sampled)
❤️  recompact x 7,746 ops/sec ±1.52% (92 runs sampled)
💙  recompose x 14,364 ops/sec ±1.08% (90 runs sampled)
💚  reassemble x 11,806 ops/sec ±0.93% (90 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps] mapProps
-------------------------------
-- nothing x 74,232 ops/sec ±1.10% (92 runs sampled)
❤️  recompact x 65,047 ops/sec ±1.88% (89 runs sampled)
💙  recompose x 63,882 ops/sec ±2.05% (84 runs sampled)
💚  reassemble x 50,429 ops/sec ±2.50% (92 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [setProps][composed] mapProps
-------------------------------
-- nothing x 72,754 ops/sec ±1.73% (89 runs sampled)
❤️  recompact x 31,589 ops/sec ±1.91% (87 runs sampled)
💙  recompose x 40,222 ops/sec ±1.47% (89 runs sampled)
💚  reassemble x 27,001 ops/sec ±1.53% (88 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### onlyUpdateForKeys

```
Start benchmark [mount][single] onlyUpdateForKeys
-------------------------------
-- nothing x 31,464 ops/sec ±0.82% (87 runs sampled)
❤️  recompact x 17,195 ops/sec ±0.94% (84 runs sampled)
💙  recompose x 17,008 ops/sec ±1.76% (90 runs sampled)
💚  reassemble x 14,218 ops/sec ±1.94% (84 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [mount][composed] onlyUpdateForKeys
-------------------------------
-- nothing x 28,731 ops/sec ±2.08% (86 runs sampled)
❤️  recompact x 8,203 ops/sec ±0.91% (90 runs sampled)
💙  recompose x 1,211 ops/sec ±0.78% (91 runs sampled)
💚  reassemble x 5,320 ops/sec ±2.68% (87 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps] onlyUpdateForKeys
-------------------------------
-- nothing x 75,473 ops/sec ±2.62% (88 runs sampled)
❤️  recompact x 64,539 ops/sec ±2.13% (89 runs sampled)
💙  recompose x 61,817 ops/sec ±2.05% (89 runs sampled)
💚  reassemble x 45,027 ops/sec ±2.22% (87 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps][composed] onlyUpdateForKeys
-------------------------------
-- nothing x 74,261 ops/sec ±1.77% (88 runs sampled)
❤️  recompact x 20,679 ops/sec ±2.12% (87 runs sampled)
💙  recompose x 2,222 ops/sec ±1.76% (89 runs sampled)
💚  reassemble x 4,185 ops/sec ±2.51% (87 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

### pure

```
Start benchmark [mount][single] pure
-------------------------------
-- nothing x 30,878 ops/sec ±1.05% (88 runs sampled)
❤️  recompact x 16,870 ops/sec ±0.87% (87 runs sampled)
💙  recompose x 17,201 ops/sec ±0.91% (89 runs sampled)
💚  reassemble x 14,559 ops/sec ±0.88% (89 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [mount][composed] pure
-------------------------------
-- nothing x 29,123 ops/sec ±1.12% (90 runs sampled)
❤️  recompact x 7,960 ops/sec ±2.32% (87 runs sampled)
💙  recompose x 1,210 ops/sec ±1.22% (89 runs sampled)
💚  reassemble x 5,428 ops/sec ±0.90% (93 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps] pure
-------------------------------
-- nothing x 76,532 ops/sec ±1.02% (91 runs sampled)
❤️  recompact x 64,658 ops/sec ±2.36% (87 runs sampled)
💙  recompose x 61,874 ops/sec ±2.60% (88 runs sampled)
💚  reassemble x 46,048 ops/sec ±1.70% (90 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps][composed] pure
-------------------------------
-- nothing x 73,811 ops/sec ±1.21% (92 runs sampled)
❤️  recompact x 22,747 ops/sec ±2.64% (89 runs sampled)
💙  recompose x 2,148 ops/sec ±1.73% (89 runs sampled)
💚  reassemble x 5,133 ops/sec ±3.01% (88 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

### renameProp

```
Start benchmark [mount][single] renameProp
-------------------------------
-- nothing x 30,157 ops/sec ±1.41% (86 runs sampled)
❤️  recompact x 15,208 ops/sec ±1.30% (86 runs sampled)
💙  recompose x 16,054 ops/sec ±0.87% (91 runs sampled)
💚  reassemble x 14,361 ops/sec ±0.80% (89 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [mount][composed] renameProp
-------------------------------
-- nothing x 30,442 ops/sec ±0.98% (90 runs sampled)
❤️  recompact x 3,911 ops/sec ±2.53% (86 runs sampled)
💙  recompose x 7,608 ops/sec ±0.99% (90 runs sampled)
💚  reassemble x 6,372 ops/sec ±2.56% (89 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps] renameProp
-------------------------------
-- nothing x 76,270 ops/sec ±2.37% (92 runs sampled)
❤️  recompact x 55,975 ops/sec ±1.92% (89 runs sampled)
💙  recompose x 56,635 ops/sec ±1.89% (90 runs sampled)
💚  reassemble x 42,033 ops/sec ±2.45% (86 runs sampled)
-------------------------------
Winner: 💙  recompose, ❤️  recompact

Start benchmark [setProps][composed] renameProp
-------------------------------
-- nothing x 71,441 ops/sec ±1.82% (88 runs sampled)
❤️  recompact x 6,605 ops/sec ±2.56% (89 runs sampled)
💙  recompose x 12,179 ops/sec ±1.99% (85 runs sampled)
💚  reassemble x 5,883 ops/sec ±1.89% (91 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### renameProps

```
Start benchmark [mount][single] renameProps
-------------------------------
-- nothing x 29,123 ops/sec ±1.84% (89 runs sampled)
❤️  recompact x 14,602 ops/sec ±2.33% (88 runs sampled)
💙  recompose x 14,472 ops/sec ±2.28% (88 runs sampled)
💚  reassemble x 12,530 ops/sec ±2.18% (85 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [mount][composed] renameProps
-------------------------------
-- nothing x 28,807 ops/sec ±1.61% (89 runs sampled)
❤️  recompact x 3,567 ops/sec ±5.79% (88 runs sampled)
💙  recompose x 3,616 ops/sec ±9.87% (59 runs sampled)
💚  reassemble x 2,130 ops/sec ±3.38% (66 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [setProps] renameProps
-------------------------------
-- nothing x 39,850 ops/sec ±2.02% (78 runs sampled)
❤️  recompact x 30,164 ops/sec ±2.29% (70 runs sampled)
💙  recompose x 35,977 ops/sec ±4.39% (75 runs sampled)
💚  reassemble x 28,700 ops/sec ±2.75% (81 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps][composed] renameProps
-------------------------------
-- nothing x 65,222 ops/sec ±2.40% (83 runs sampled)
❤️  recompact x 5,831 ops/sec ±2.77% (89 runs sampled)
💙  recompose x 11,089 ops/sec ±2.56% (91 runs sampled)
💚  reassemble x 2,883 ops/sec ±2.70% (88 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### shouldUpdate

```
Start benchmark [mount][single] shouldUpdate
-------------------------------
-- nothing x 29,046 ops/sec ±1.80% (90 runs sampled)
❤️  recompact x 15,838 ops/sec ±2.10% (88 runs sampled)
💙  recompose x 15,056 ops/sec ±1.95% (86 runs sampled)
💚  reassemble x 12,957 ops/sec ±2.49% (87 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [mount][composed] shouldUpdate
-------------------------------
-- nothing x 27,231 ops/sec ±2.41% (89 runs sampled)
❤️  recompact x 7,762 ops/sec ±3.01% (86 runs sampled)
💙  recompose x 1,120 ops/sec ±2.03% (87 runs sampled)
💚  reassemble x 5,330 ops/sec ±3.14% (88 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps] shouldUpdate
-------------------------------
-- nothing x 71,858 ops/sec ±1.70% (87 runs sampled)
❤️  recompact x 76,698 ops/sec ±2.59% (87 runs sampled)
💙  recompose x 75,656 ops/sec ±2.85% (84 runs sampled)
💚  reassemble x 56,724 ops/sec ±2.11% (90 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [setProps][composed] shouldUpdate
-------------------------------
-- nothing x 68,535 ops/sec ±2.00% (90 runs sampled)
❤️  recompact x 72,462 ops/sec ±2.07% (90 runs sampled)
💙  recompose x 77,684 ops/sec ±1.57% (88 runs sampled)
💚  reassemble x 5,508 ops/sec ±3.33% (91 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### withProps

```
Start benchmark [mount][single] withProps
-------------------------------
-- nothing x 28,377 ops/sec ±2.28% (88 runs sampled)
❤️  recompact x 15,900 ops/sec ±2.09% (91 runs sampled)
💙  recompose x 15,779 ops/sec ±2.13% (90 runs sampled)
💚  reassemble x 13,570 ops/sec ±2.22% (88 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [mount][composed] withProps
-------------------------------
-- nothing x 26,377 ops/sec ±5.37% (83 runs sampled)
❤️  recompact x 5,570 ops/sec ±2.19% (89 runs sampled)
💙  recompose x 8,449 ops/sec ±2.00% (85 runs sampled)
💚  reassemble x 7,349 ops/sec ±2.45% (90 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps] withProps
-------------------------------
-- nothing x 68,104 ops/sec ±2.05% (85 runs sampled)
❤️  recompact x 58,729 ops/sec ±1.60% (89 runs sampled)
💙  recompose x 57,911 ops/sec ±2.35% (90 runs sampled)
💚  reassemble x 43,749 ops/sec ±2.19% (88 runs sampled)
-------------------------------
Winner: ❤️  recompact, 💙  recompose

Start benchmark [setProps][composed] withProps
-------------------------------
-- nothing x 66,099 ops/sec ±2.21% (86 runs sampled)
❤️  recompact x 13,153 ops/sec ±1.95% (91 runs sampled)
💙  recompose x 14,277 ops/sec ±1.48% (88 runs sampled)
💚  reassemble x 7,320 ops/sec ±2.54% (87 runs sampled)
-------------------------------
Winner: 💙  recompose
```

### withPropsOnChange

```
Start benchmark [mount][single] withPropsOnChange
-------------------------------
-- nothing x 27,788 ops/sec ±1.99% (89 runs sampled)
❤️  recompact x 14,431 ops/sec ±2.46% (83 runs sampled)
💙  recompose x 14,863 ops/sec ±2.16% (88 runs sampled)
💚  reassemble x 13,614 ops/sec ±1.84% (89 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [mount][composed] withPropsOnChange
-------------------------------
-- nothing x 28,524 ops/sec ±2.07% (90 runs sampled)
❤️  recompact x 4,832 ops/sec ±2.65% (89 runs sampled)
💙  recompose x 904 ops/sec ±2.04% (86 runs sampled)
💚  reassemble x 6,050 ops/sec ±2.53% (86 runs sampled)
-------------------------------
Winner: 💚  reassemble

Start benchmark [setProps] withPropsOnChange
-------------------------------
-- nothing x 67,963 ops/sec ±1.93% (91 runs sampled)
❤️  recompact x 54,064 ops/sec ±1.91% (87 runs sampled)
💙  recompose x 55,394 ops/sec ±1.72% (87 runs sampled)
💚  reassemble x 38,465 ops/sec ±2.46% (89 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps][composed] withPropsOnChange
-------------------------------
-- nothing x 67,158 ops/sec ±1.96% (89 runs sampled)
❤️  recompact x 9,457 ops/sec ±2.00% (87 runs sampled)
💙  recompose x 1,803 ops/sec ±1.59% (86 runs sampled)
💚  reassemble x 3,442 ops/sec ±2.25% (89 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

### withReducer

```
Start benchmark [mount][single] withReducer
-------------------------------
-- nothing x 28,452 ops/sec ±2.05% (86 runs sampled)
❤️  recompact x 10,416 ops/sec ±2.37% (87 runs sampled)
💙  recompose x 14,272 ops/sec ±2.60% (84 runs sampled)
💚  reassemble x 13,066 ops/sec ±1.47% (88 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [mount][composed] withReducer
-------------------------------
-- nothing x 27,903 ops/sec ±2.28% (86 runs sampled)
❤️  recompact x 4,268 ops/sec ±2.68% (88 runs sampled)
💙  recompose x 747 ops/sec ±2.77% (79 runs sampled)
💚  reassemble x 369 ops/sec ±1.05% (87 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps] withReducer
-------------------------------
-- nothing x 68,109 ops/sec ±0.95% (90 runs sampled)
❤️  recompact x 37,451 ops/sec ±0.94% (88 runs sampled)
💙  recompose x 57,411 ops/sec ±1.83% (87 runs sampled)
💚  reassemble x 41,974 ops/sec ±2.33% (88 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps][composed] withReducer
-------------------------------
-- nothing x 67,630 ops/sec ±1.81% (88 runs sampled)
❤️  recompact x 9,192 ops/sec ±2.15% (88 runs sampled)
💙  recompose x 1,912 ops/sec ±1.89% (89 runs sampled)
💚  reassemble x 4,091 ops/sec ±1.85% (88 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

### withState

```
Start benchmark [mount][single] withState
-------------------------------
-- nothing x 28,010 ops/sec ±1.57% (88 runs sampled)
❤️  recompact x 10,490 ops/sec ±2.09% (88 runs sampled)
💙  recompose x 14,012 ops/sec ±2.52% (86 runs sampled)
💚  reassemble x 12,803 ops/sec ±2.43% (87 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [mount][composed] withState
-------------------------------
-- nothing x 27,823 ops/sec ±2.85% (87 runs sampled)
❤️  recompact x 4,471 ops/sec ±2.81% (87 runs sampled)
💙  recompose x 799 ops/sec ±3.06% (80 runs sampled)
💚  reassemble x 365 ops/sec ±1.12% (86 runs sampled)
-------------------------------
Winner: ❤️  recompact

Start benchmark [setProps] withState
-------------------------------
-- nothing x 68,650 ops/sec ±1.08% (91 runs sampled)
❤️  recompact x 37,250 ops/sec ±1.32% (91 runs sampled)
💙  recompose x 60,605 ops/sec ±1.12% (90 runs sampled)
💚  reassemble x 39,859 ops/sec ±2.35% (89 runs sampled)
-------------------------------
Winner: 💙  recompose

Start benchmark [setProps][composed] withState
-------------------------------
-- nothing x 68,369 ops/sec ±1.98% (89 runs sampled)
❤️  recompact x 9,136 ops/sec ±1.76% (89 runs sampled)
💙  recompose x 1,910 ops/sec ±2.50% (88 runs sampled)
💚  reassemble x 4,060 ops/sec ±1.93% (88 runs sampled)
-------------------------------
Winner: ❤️  recompact
```

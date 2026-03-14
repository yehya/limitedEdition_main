# THEME SYSTEM RULE

**NEVER use hardcoded colors. ALWAYS use theme system.**

## Examples:
❌ `backgroundColor: '#0A0A0A'`
✅ `backgroundColor: theme.colors.neutral[950]`

❌ `color: '#FFFFFF'`
✅ `color: theme.colors.text.inverse`

❌ `backgroundColor: '#007AFF'`
✅ `backgroundColor: theme.colors.primary[500]`

## Theme Categories Available:
- `theme.colors.primary[50-950]`
- `theme.colors.secondary[50-950]`
- `theme.colors.neutral[50-950]`
- `theme.colors.text.primary/secondary/tertiary/inverse/link`
- `theme.colors.semantic.success/warning/error/info`
- `theme.colors.surface.background/card/overlay/border`
- `theme.colors.shadow.sm/md/lg/xl`
- `theme.colors.accent.amerald/rose/purple/orange`
- `theme.borderRadius.sm/md/lg/xl`
- `theme.spacing.xs/sm/md/lg/xl/2xl/3xl`

**This rule NEVER has exceptions. ALWAYS use theme system.**

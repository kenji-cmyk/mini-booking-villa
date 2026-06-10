# VStay Frontend Design System & API Integration Guide

The canonical design and API integration guide is maintained at:

```text
../docs/md/10-design-rule.md
```

Frontend implementation must follow that guide for:

- approved color, spacing, typography, radius, and shadow tokens
- booking-first page structure and responsive behavior
- shared components for buttons, cards, inputs, status, loading, empty, and error states
- central API ownership in `src/api/*`
- camelCase domain models and typed payloads
- environment-based API configuration
- centralized auth/header injection and error handling

If a quick implementation conflicts with the guide, follow the guide.

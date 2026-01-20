# Design System: AI Code Review Platform

## Color Palette

### Primary
- **Brand Blue**: #0066CC (primary actions, interactive elements)
- **Neutral Dark**: #020617 (backgrounds)
- **Neutral Light**: #F8FAFC (text on dark backgrounds)

### Semantic
- **Success**: #10B981 (green - positive, working, complete)
- **Warning**: #F59E0B (amber - caution, review needed)
- **Error**: #EF4444 (red - critical, failures)
- **Info**: #3B82F6 (blue - informational)

### Neutral Scale
- **BG-900**: #020617
- **BG-800**: #0F172A
- **BG-700**: #1E293B
- **BG-600**: #334155
- **TEXT-400**: #94A3B8
- **TEXT-300**: #CBD5E1
- **TEXT-100**: #F8FAFC
- **BORDER**: #E2E8F0/10%

## Typography

### Type Scale (rem)
- **H1**: 3rem (48px) - 600 weight, 1.1 line-height
- **H2**: 2rem (32px) - 600 weight, 1.2 line-height
- **H3**: 1.5rem (24px) - 600 weight, 1.3 line-height
- **Body-lg**: 1.125rem (18px) - 400 weight, 1.6 line-height
- **Body**: 1rem (16px) - 400 weight, 1.6 line-height
- **Body-sm**: 0.875rem (14px) - 400 weight, 1.5 line-height
- **Caption**: 0.75rem (12px) - 400 weight, 1.4 line-height

### Font Family
- **Primary**: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif

## Spacing System (4px base)

- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)

## Border Radius

- **sm**: 0.375rem (6px) - form inputs, small components
- **md**: 0.75rem (12px) - cards, buttons
- **lg**: 1rem (16px) - modals, large containers
- **xl**: 1.5rem (24px) - feature cards, hero sections

## Buttons

### Primary Button
- Background: #0066CC
- Hover: #0052A3
- Padding: 12px 24px
- Border radius: 12px
- Font: 600 weight, 16px
- Transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1)

### Secondary Button
- Background: transparent
- Border: 1px #E2E8F0/20%
- Padding: 12px 24px
- Border radius: 12px
- Font: 600 weight, 16px
- Hover: background #E2E8F0/5%, border #E2E8F0/40%

### Button States
- Loading: disabled opacity, show spinner
- Disabled: opacity 50%, cursor not-allowed

## Components

### Cards
- Background: #1E293B/50% or #334155/40%
- Border: 1px #E2E8F0/10%
- Border radius: 16px
- Padding: 24px
- Hover: border opacity +50%, shadow elevation

### Inputs
- Background: #0F172A
- Border: 1px #E2E8F0/20%
- Border radius: 12px
- Padding: 12px 16px
- Focus: border #0066CC, box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1)

### Loading States
- Skeleton screens for data-heavy sections
- Spinner: 24px, animated 2s infinite rotation
- Progress: linear progress bar with color transition

## Animations

### Easing Functions
- **standard**: cubic-bezier(0.4, 0, 0.2, 1)
- **enter**: cubic-bezier(0.4, 0, 1, 1)
- **exit**: cubic-bezier(0, 0, 0.2, 1)
- **emphasized**: cubic-bezier(0.2, 0, 0, 1)

### Timing
- **quick**: 150ms (micro-interactions, hover effects)
- **base**: 300ms (component transitions)
- **slow**: 500ms (page transitions, complex animations)

### Motion Principles
- Page transitions: fade + slide, 300-500ms
- Hover lift: -4px maximum
- Component entrance: stagger 100ms between children
- No arbitrary floating or sparkle animations

## Shadows

- **sm**: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- **md**: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- **lg**: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- **xl**: 0 20px 25px -5px rgba(0, 0, 0, 0.1)

## Layout Grid

- Desktop: 1280px max-width, 24px horizontal padding
- Tablet: 768px max-width, 20px horizontal padding
- Mobile: 100%, 16px horizontal padding
- Gap between items: 24px (lg), 16px (md), 8px (sm)

## Responsive Breakpoints

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Interaction Guidelines

### Hover States
- Button scale: no scale or max 2px lift
- Cards: shadow elevation increase
- Links: color change, no underline by default

### Focus States
- Outline: 2px solid #0066CC
- Offset: 2px

### Loading Indicators
- Show spinner for all async operations > 200ms
- Progress bar for file uploads
- Skeleton screens for data fetches

## Typography Rules

### Headings
- No oversized headings above 48px
- Max 2 heading levels per page
- Consistent weight hierarchy: 600 for headings, 400 for body

### Body Text
- Paragraph spacing: 24px between paragraphs
- Line height: 1.6 for readability
- Max width: 65 characters per line for body text

### Microcopy
- Clear, specific language
- Remove em-dashes
- Avoid vague phrases: "Launch faster", "Build your dreams"
- No placeholder names or fake testimonials

# Nobi Industrial

This is the Nobi website targeting industrial distributors (HVAC, electrical, MRO, and commercial building supply).

## Positioning

Nobi for industrial distributors is positioned as a **digital counter-person** or **AI inside sales desk**, not a shopping assistant.

## Target Market

Mid-market industrial distributors including:
- HVAC distributors (Johnstone Supply, Gemaire)
- Electrical distributors (City Electric Supply, Graybar)
- MRO distributors (Fastenal, MSC Industrial)
- Commercial building distributors (Ferguson)

## Key Use Cases

1. **Technical search**: "3-ton heat pump SEER2 compliant available in Phoenix"
2. **RFQ capture**: Convert product questions into qualified quote requests
3. **Compatibility matching**: "Will this work with X?" queries
4. **Substitute finding**: Suggest alternatives when parts are out of stock
5. **Spec guidance**: Help buyers find components meeting specific requirements

## Value Proposition

- Convert 3x more quote requests from website traffic
- Reduce support call volume by 40%
- Help buyers find technical specs without endless filters
- Capture high-intent leads that would otherwise call competitors

## Running Locally

Install dependencies:
```bash
npm install
```

Start the dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Design System

Inherits the same design system as the main nobi.ai site:
- Modern gradient aesthetics
- Dark mode support
- Animated demos
- Conversion-focused layout

## Key Differences from Retail Site

| Aspect | Retail (nobi.ai) | Industrial (this site) |
|--------|------------------|------------------------|
| Hero headline | "ChatGPT experience" | "Expert guidance" |
| Value prop | Shopping convenience | Procurement efficiency |
| Demo queries | "Red dress for wedding" | "3-ton SEER2 heat pump" |
| Metrics | Add-to-cart, AOV | RFQ capture, quote conversion |
| Customers | Fashion brands | Industrial distributors |
| Features | Product discovery | RFQ, compatibility, substitutes |

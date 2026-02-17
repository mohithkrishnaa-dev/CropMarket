# CropMarket – Implementation Roadmap

This document converts the product feedback into a concrete engineering plan for the next development cycle.

## 1) Immediate Stabilization (Week 1)

### Data normalization layer
- Create a canonical commodity dictionary (`WHEAT`, `PADDY`, etc.) and map UI/user input aliases (`Wheat`, `गेहूं`, `wheat`) to canonical API values.
- Add normalization for district/state values to reduce API miss rates.
- Log normalization misses for future dictionary expansion.

### Error handling and offline UX
- Replace silent mock fallback with explicit status handling:
  - `Loading`
  - `Success`
  - `Error.Network`
  - `Error.Server`
  - `OfflineCached`
- Add UI actions:
  - **Retry** button in error states.
  - **Use last saved data** when network is unavailable.

### Visual hierarchy
- Keep trend chart but mark synthetic data clearly.
- Add TODO hook for historical API endpoint integration.

---

## 2) Priority Module to Build Next: Mandi Price Alerts (Module C)

This module has strong user value and moderate implementation effort.

### User story
Farmer tracks a crop in a watchlist and receives a local-language push notification if mandi price rises by more than 10% in a day.

### Implementation blueprint
1. **Data model**
   - `WatchlistItem(crop, district, languageCode, lastKnownPrice)`
   - `PriceSnapshot(crop, district, price, fetchedAt)`

2. **Persistence**
   - Store watchlist and last snapshots in local DB (Room) for offline continuity.

3. **Worker**
   - Add `PriceAlertWorker` using WorkManager.
   - Run once daily with network constraint.
   - For each watchlist item:
     - Fetch current mandi price.
     - Compare against previous snapshot.
     - If increase >= 10%, trigger notification.

4. **Notifications**
   - Use high-priority channel `price_alerts`.
   - Message template by locale:
     - `Price Surge! {crop} is now ₹{price} in {mandi}.`

5. **Settings/UI**
   - Simple watchlist screen:
     - Add/remove crop.
     - District selector.
     - Toggle alerts on/off.

6. **Telemetry**
   - Track worker success/failure counts.
   - Track alerts sent per crop for tuning thresholds later.

### Acceptance criteria
- Worker runs at least once every 24h.
- Notification appears when price delta >= 10%.
- Alert content is shown in selected app language.
- No duplicate notification for unchanged price.

---

## 3) Follow-up Module Sequence

1. **Soil Health & Fertilizer Calculator (Module B)**
   - Deterministic, offline-capable, high trust feature.
2. **Government Scheme Navigator (Module E)**
   - Strong utility and easy to iterate.
3. **Kisan Community Forum (Module D)**
   - Higher moderation and backend complexity.
4. **AI Crop Doctor (Module A)**
   - Most complex; defer until dataset/model strategy is locked.

---

## 4) Low-Effort, High-Impact Polish

### Dark mode
- Add theme overlays and contrast-safe palette.
- Test market cards/charts for readability.

### Voice input (STT)
- Add search mic action for crop query intent.
- Fallback to keyboard if speech service unavailable.

### Land unit converter
- Add compact utility for:
  - Bigha ↔ Acre/Hectare
  - Kanal ↔ Acre/Hectare
  - Guntha ↔ Acre/Hectare

---

## 5) Suggested Sprint Plan (2 weeks)

### Sprint goal
Deliver dependable pricing and alerts to improve crop selling decisions.

### Scope
- Data normalization layer
- Error+retry+offline handling
- Module C (watchlist + daily alert worker + localized notification)
- Basic dark mode readiness

### Out of scope
- Full AI disease detection
- Full social forum
- Historical trend analytics backend

---

## 6) Definition of Done
- Feature toggles removed (or documented) before release.
- Unit tests for normalization and alert-threshold logic.
- Manual QA checklist passed on low-network scenario.
- Crash-free session smoke test completed.

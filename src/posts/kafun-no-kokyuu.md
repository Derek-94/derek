# 花粉の呼吸 — 꽃가루 + 날씨 기반 코디 추천 앱 만들기

> **작업 기간**: 2026년 3월
>
> **기술 스택**: Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, Open-Meteo, Google Pollen API
>
> **링크**: [breath-of-pollen.vercel.app](https://breath-of-pollen.vercel.app) · [GitHub](https://github.com/Derek-94/Breath_of_Pollen)

---

## 배경

한국의 [기온별 옷차림 서비스](https://ootd-by-weather.vercel.app)를 보고 비슷한 걸 만들어보고 싶었습니다. 그런데 그대로 따라 만드는 건 의미가 없어서 차별화 포인트를 고민했습니다.

일본을 타겟으로 정했을 때 답이 보였습니다. 일본은 **인구의 절반 이상이 꽃가루 알레르기를 앓고** 있고, 매년 2월부터 5월까지 스기(삼나무)·히노키(편백) 꽃가루 시즌이 찾아옵니다. 기존 날씨 앱들은 날씨 정보는 있지만 "그래서 오늘 마스크 껴야 해? 코트 필요해?"라는 실용적인 질문에는 답해주지 않습니다.

꽃가루 레벨을 옷차림 추천에 결합하는 것 — 이게 차별화 포인트였습니다.

---

## 설계

### 데이터 소스 선택

| 데이터 | API | 이유 |
|--------|-----|------|
| 날씨 | [Open-Meteo](https://open-meteo.com) | 무료, 기상청(JMA) 모델 지원, 시간별·주간 예보 모두 제공 |
| 꽃가루 | [Google Pollen API](https://developers.google.com/maps/documentation/pollen) | 스기/히노키 0–5 인덱스 제공, 일본 커버리지 ✅ |
| 위치 | [Nominatim](https://nominatim.openstreetmap.org) | 무료 역지오코딩, 일본어 지명 반환 |

API 키를 클라이언트에 노출하지 않기 위해 Next.js Route Handler를 프록시로 구성했습니다.

```typescript
// app/api/pollen/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const res = await fetch(
    `https://pollen.googleapis.com/v1/forecast:lookup?key=${process.env.GOOGLE_POLLEN_API_KEY}&location.longitude=${searchParams.get('lon')}&location.latitude=${searchParams.get('lat')}&days=5&languageCode=ja`
  )
  return Response.json(await res.json())
}
```

### 꽃가루 레벨 매핑

Google Pollen API는 0–5 인덱스를 반환하지만, 앱에서는 5단계 레벨로 표시합니다. 0은 데이터 없음으로 처리해 최솟값 1로 폴백합니다.

```typescript
export function mapPollenIndex(value: number | undefined | null): PollenLevel {
  if (!value || value <= 1) return 1  // 데이터 없음 → 최솟값
  if (value === 2) return 2
  if (value === 3) return 3
  if (value === 4) return 4
  return 5
}
```

### 코디 추천 로직

기온 구간 6단계 × 꽃가루 레벨을 조합합니다. 기온은 옷의 종류를, 꽃가루는 마스크·선글라스 필요 여부를 결정합니다.

```typescript
export function getOutfitRecommendation(temp: number, pollenLevel: PollenLevel) {
  const needsMask = pollenLevel >= 3
  const needsGlasses = pollenLevel >= 4

  // 기온 구간별 베이스 아이템 (28°C↑ / 23° / 18° / 13° / 8° / 7°↓)
  let baseItems = temp >= 28
    ? [{ icon: '👕', name: 'Tシャツ' }, { icon: '🩳', name: 'ショートパンツ' }, ...]
    : temp >= 13
    ? [{ icon: '🧥', name: 'ライトジャケット' }, ...]
    : ...

  // 꽃가루 레벨에 따라 마스크·선글라스 추가
  baseItems.push({ icon: '😷', name: 'マスク', recommended: needsMask })
  baseItems.push({ icon: '🕶️', name: 'サングラス', recommended: needsGlasses })
  ...
}
```

---

## 구현 하이라이트

### 지오로케이션 실패 시 위치 선택기

`navigator.geolocation`이 실패하거나 권한이 거부되면 LocationPicker를 보여줍니다. 47개 도도부현을 8개 지역으로 묶어 2단계 드릴다운으로 선택할 수 있습니다.

![위치 선택기](/thumbnails/kafun/location-picker.png)

각 도도부현의 좌표를 `prefecture-coords.ts`에 하드코딩해두고, 선택 시 해당 좌표로 날씨·꽃가루 API를 호출합니다.

```typescript
// 선택 → 좌표 조회 → 데이터 fetch
const handlePrefectureSelect = useCallback((prefecture: string) => {
  const coords = PREFECTURE_COORDS[prefecture]
  if (coords) fetchWeatherData(coords.lat, coords.lon, prefecture)
}, [fetchWeatherData])
```

### 홈 화면

![홈 화면](/thumbnails/kafun/home.png)

상단에 꽃가루 레벨 색상 도트 5개와 서비스명 "花粉の呼吸"를 배치했습니다. 도트는 꽃가루 레벨을 시각적으로 암시하는 역할도 겸합니다 (초록 → 보라 순으로 심각도 증가).

![아래 영역](/thumbnails/kafun/home-bottom.png)

코디 추천 카드, UV·PM2.5·습도 인포 카드, 시간별 기온 차트가 이어집니다.

### 주간 예보

![주간 예보](/thumbnails/kafun/weekly.png)

7일간 날씨 아이콘 + 최고/최저기온 + 꽃가루 레벨 도트를 한 줄에 표시합니다. 꽃가루 레벨은 스기·히노키 중 높은 쪽을 기준으로 색상 도트로 표현합니다.

### 동적 OG 이미지

Next.js의 `next/og`를 사용해 edge runtime에서 OG 이미지를 동적으로 생성합니다. `app/opengraph-image.tsx` 파일이 자동으로 `/opengraph-image` 라우트로 렌더링됩니다.

---

## 트러블슈팅

### Google Pollen API 400 오류

`days=7`로 요청했더니 400이 반환됐습니다. Pollen API는 최대 5일까지만 지원합니다. `days=5`로 수정해 해결했습니다.

### geolocation POSITION_UNAVAILABLE

Chrome on macOS에서 위치 권한을 허용해도 `POSITION_UNAVAILABLE` 오류가 발생하는 케이스가 있었습니다. 에러 화면 대신 LocationPicker를 보여주는 것으로 UX를 개선했습니다.

```typescript
navigator.geolocation.getCurrentPosition(
  ({ coords }) => fetchWeatherData(coords.latitude, coords.longitude),
  () => {
    setLoading(false)
    setShowPicker(true)  // 실패 시 LocationPicker로 폴백
  }
)
```

---

## 결과

| 기능 | 내용 |
|------|------|
| 실시간 날씨 | 기온·날씨코드·습도·UV, 시간별·7일 예보 |
| 꽃가루 정보 | 스기·히노키 5단계, 주간 레벨 |
| 코디 추천 | 기온 6구간 × 꽃가루 레벨 조합 |
| 위치 | GPS 자동 감지 + 47도도부현 수동 선택 |
| SEO | 동적 OG 이미지, 한일 양국어 메타데이터 |

---

## 배운 점

**차별화는 데이터의 조합에서 나옵니다.** 날씨 앱도, 꽃가루 앱도 이미 존재합니다. 그런데 둘을 연결해 "오늘 뭘 입어야 하나"라는 질문에 답하는 앱은 없었습니다. 새로운 API를 만드는 것보다 기존 데이터를 다른 방식으로 조합하는 것이 더 빠르고 실용적인 차별화일 수 있습니다.

**API 문서의 제약을 확인해야 합니다.** `days=7`이 당연히 될 거라 생각했지만 Pollen API는 5일이 최대였습니다. 사소한 파라미터 제한이 400 오류로 이어지는 경험을 했습니다.

**모바일 UX에서 실패 경로가 중요합니다.** 위치 권한 거부나 geolocation 오류 시 에러 화면을 보여주는 것보다, 대안(수동 선택)을 제공하는 쪽이 실제 사용에서 훨씬 낫습니다.

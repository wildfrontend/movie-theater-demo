# Movie Theater Demo

本文件說明 **Movie Theater Demo** 應用程式的設定與使用方式。

## Local Development

要在本地運行範例，請依照以下步驟操作：

### 安裝依賴：

```jsx
npm install
npm run dev
```

### 訪問應用程式：

打開您的瀏覽器，並前往 http://localhost:3000。

## Web 路徑

應用程式提供以下路由：

- 首頁
- 電影詳細資訊
- 觀看清單

### **首頁**

- 採用 **React Query 預先擷取（prefetch）機制**，在伺服器端提前獲取資料，減少瀏覽器端的載入時間。
  - 載入頁面時，提前載入電影清單和圖片資源，以提升頁面的 LCP（Largest Contentful Paint）。
- 若使用者尚未進行搜尋，則預設顯示 **熱門電影列表**，提供可瀏覽的內容。
- 使用 **search query params** 紀錄搜尋及排序狀態。

### **電影詳細資訊**

- 使用 Next.js Intercepting Routes 與 Parallel Routes **實作 `Modal Route`**，提升使用者的瀏覽體驗。
- 此設計同時讓 **電影詳細頁支援 SSR（Server-Side Rendering）**，可在伺服器端提前獲取電影詳細資訊，進一步優化瀏覽器效能。
- ~`Modal Route` 支援拖曳關閉，透過 `framer-motion` 提供自然順暢的動畫效果，提升操作手感。~ 實際操作體驗不佳故刪除

### **觀看清單**

- 介面與首頁的 **無限滾動列表** 一致，並提供相同的操作體驗。
- 透過 **`Swiper.js`** 實現 **隨機選片功能**，讓使用者能夠以類似拉霸的方式隨機選擇電影。

## 圖片最佳化

- 使用 **Loader** 動態生成適合的圖片 URL，避免載入過大圖片，從而提高效能。
- 透過 **sizes** 屬性控制圖片解析度，讓不同裝置載入最適合的圖片尺寸，減少不必要的流量消耗。

## 影片最佳化

- 使用 **lite-youtube-embed** 避免影片一開始就載入影片資源，降低網站效能。
- 嘗試使用 **setTimeout** 模擬 Netflix 自動播放功能，但並未達到良好的使用者體驗，最終棄用此設計。
- 設計錯誤流程，若沒有影片資源，則顯示電影封面。

## 元件動態加載

### Intersection Observer API 的應用：

- **背景**：電影詳細頁面中的 credits 和 reviews 這些資料，通常在 Modal 路由中不會一開始顯示出來。這些資訊只有在使用者滾動或滑動到特定區域時才會顯示。
- **問題**：如果這些資訊在頁面載入時就被加載，會導致不必要的網絡請求和資源浪費，尤其當這些資料並不是每個使用者都會瀏覽時。
- **解決方案**：利用 **Intersection Observer API** 監控這些區塊是否進入可視範圍，只有當該部分進入視窗範圍時才去加載資料。這樣可以有效減少初始頁面載入的資源需求，提升頁面效能。

### 觀看清單隨機播放按鈕：

- **背景**：在觀看清單中，隨機播放按鈕可能只在用戶點擊後才會顯示出來。如果在頁面加載時就加載相關資源，會不必要地消耗資源。
- **解決方案**：僅在用戶需要時才加載這些資源，這樣可以節省初始頁面加載的資源。

## 搜尋清單前端排序優化

- **背景**：在原本的情況下，當有一個電影清單並需要排序時，每次重新渲染或更新清單時，都會重新排序所有電影資料。這樣會導致不必要的性能浪費，尤其當資料量較大時，排序操作可能會影響頁面流暢度。
- **問題**：每次渲染都進行排序，可能會導致不必要的計算開銷，影響效能。
- **解決方案**：使用 **useMemo** 來計算排序結果，並且只有當 **sortBy**（排序條件）發生變化時才重新計算排序。這樣可以避免每次渲染時都對電影列表進行排序，只有當 **sortBy** 變動時才會重新計算並更新排序，提升效能。
- **2025/03/20**:
  - 只在 `data.pages` 變更時 重新計算 `results`，避免 `data`物件變更時觸發不必要的運算。
  - 避免 `release_date` 重複轉換，減少 `new Date().getTime()` 在排序過程中的多次調用。

```jsx
const movies = useMemo(() => {
  if (!data?.pages) return [];
  const results = data.pages.flatMap((group) => group?.results || []);
  return results.sort((a, b) => {
    const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
    const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
    if (sortBy === SearchMoviesSortType.oldest) {
      return dateA - dateB;
    }
    if (sortBy === SearchMoviesSortType.newest) {
      return dateB - dateA;
    }
    return 0;
  });
}, [data, sortBy]);
```

## 隨機播放設計 (deprecated)

<details>
<summary>已棄用設計</summary>

- 從待看清單中隨機挑選 10 部電影，並顯示在 **Swiper.js** 上，實現轉盤效果。
- 轉盤的控制邏輯透過 **Swiper.js** 的 **autoplay** 控制頻率，並使用 **freemod** 提供的平滑滑動效果。
- 使用自定義 Hook 控制動畫，讓轉盤從一開始的加速到減速，達成順暢的轉盤動畫效果。用戶可以選擇是否重新轉盤。

```jsx
const useControlSpin = () => {
  const initialSpeed = 120;
  const minSpeed = 540;
  const maxSpeed = 1080;
  const accelerationFactor = 0.8;
  const decayFactor = 1.2;
  const intervalDelay = 20;

  const [speed, setSpeed] = useState(initialSpeed);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [isAccelerating, setIsAccelerating] = useState(true);
  const [random, setRandom] = useState(Math.random());

  useEffect(() => {
    if (!autoplayEnabled) return;

    let currentSpeed = speed;
    const interval = setInterval(() => {
      if (isAccelerating) {
        currentSpeed *= accelerationFactor;
        if (currentSpeed <= minSpeed) {
          setIsAccelerating(false);
        }
      } else {
        currentSpeed *= decayFactor;
        if (currentSpeed >= maxSpeed) {
          setAutoplayEnabled(false);
          clearInterval(interval);
          return;
        }
      }
      setSpeed(currentSpeed);
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [autoplayEnabled, speed, isAccelerating]);

  const restartSpin = useCallback(() => {
    setSpeed(initialSpeed);
    setAutoplayEnabled(true);
    setIsAccelerating(true);
    setRandom(Math.random());
  }, []);

  return { speed, random, autoplayEnabled, restartSpin };
};
```

### 說明：

- **加速與減速**：這段代碼的核心是模擬轉盤的加速與減速效果。轉盤會從一開始的加速到達最大速度，然後逐漸減速並停止。
- **`speed` 狀態控制轉盤速度**：`speed` 會在加速過程中不斷增大，然後進入減速階段，直到停止。這個過程會根據設置的 **accelerationFactor**（加速因子）和 **decayFactor**（減速因子）進行調整。
- **`random` 狀態觸發重啟**：每當用戶選擇重新轉盤時，會重置 `random` 狀態，觸發 **useEffect** 中的邏輯，重新開始加速過程。
- **`restartSpin` 方法**：提供了重新啟動轉盤的功能，用戶可以隨時點擊按鈕重新啟動轉盤。
- 每次轉動會重新從現有的待看清單取得電影。

</details>

## 隨機播放設計 v2

- 由於 speed 高頻率變動會導致 React 頻繁重新渲染，影響效能，間接增加 INP 延遲，因此改用 setTimeout 來關閉自動播放。
- 每次旋轉時都會重新挑選影片，因此只需執行轉盤動畫，無需隨機調整轉盤時間。
- 簡化程式碼，提高可讀性與效能。
- 介面更流暢穩定

```js
const useControlSpin = () => {
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [random, setRandom] = useState(Math.random());
  const timeoutRef = (useRef < NodeJS.Timeout) | (null > null);

  useEffect(() => {
    if (autoplayEnabled) {
      timeoutRef.current = setTimeout(() => {
        setAutoplayEnabled(false);
        timeoutRef.current = null;
      }, 700);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [autoplayEnabled]);

  const restartSpin = useCallback(() => {
    setAutoplayEnabled(true);
    setRandom(Math.random());
  }, []);

  return { random, autoplayEnabled, restartSpin };
};
```

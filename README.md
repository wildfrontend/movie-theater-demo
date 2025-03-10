# Movie Theater Demo

本文件說明 Movie Theater Demo 應用程式的設定與使用方式。

## Local Development

To run the demo locally:

### Install Dependencies:

```bash
npm install

npm run dev
```

### Access Application:

Open your web browser and navigate to http://localhost:3000.

## Web Paths

應用程式提供以下路由：

- Homepage - 首頁
- Movie Detail - 電影詳細資訊
- Watchlist - 觀看清單

### **Homepage (首頁)**

- 採用 **React Query 預先擷取（prefetch）機制**，在伺服器端提前獲取資料，減少瀏覽器端的載入時間。
  - 載入頁面時，省去電影清單載入時間，可提前在入圖片資源，提高頁面的LCP
- 若使用者尚未進行搜尋，則預設顯示 **熱門電影列表**，提供可瀏覽的內容。


### **Movie Detail （電影詳細資訊）**

- 使用 Next.js [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) 與 [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) **實作 `Modal Route`**，提升使用者的瀏覽體驗。
- 此設計同時讓 **電影詳細頁支援 SSR**，可在伺服器端提前獲取電影詳細資訊，進一步優化瀏覽器效能。

### **Watchlist（觀看清單）**

- 介面與首頁的 **無限滾動列表** 一致，並提供相同的操作體驗。
- 透過 **`Swiper.js`** 實現 **隨機選片功能**，讓使用者能夠以類似拉霸的方式隨機選擇電影。

## Image 最佳化
- 使用 Loader 來動態生成適合的圖片 URL，避免載入過大圖片，提高效能。
- 透過 sizes 屬性 控制圖片解析度，讓不同裝置載入最適合的圖片尺寸，減少不必要的流量消耗。
# Web Frontend Developer Take Home Test

## 設計架構

1. 使用 [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) 實作 infinite scroll
    - 避免掉傳統 scrollTop 做法造成瀏覽器 reflow 的效能問題
2. 綁定 scroll event 實作 Virtualized List，將 viewport 外的 DOM 移除已避免掉 DOM 數量過多時造成的效能問題

## 執行專案

1. `npm install`
2. `npm start`

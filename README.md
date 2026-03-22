# 駕考寶典-上天版

台灣民航局超輕型載具（FM250）學科考試刷題網站。

**線上使用：** https://amoukyou.github.io/fm250/

## 功能

- **兩套題庫**：大玩家題庫（86題）+ 民航局題庫（252題），共 338 題
- **題型分類**：選擇題、是非題、問答題，各自獨立練習
- **即答即判**：選擇題點選後立即顯示對錯和解析
- **問答題自評**：顯示參考答案後自評「我會 / 模糊 / 不會」
- **全真模擬考**：隨機抽 20 題，統一提交，顯示得分
- **錯題本**：自動記錄答錯的題目，支援按題庫/題型篩選
- **收藏夾**：收藏任意題目，考前集中復習
- **學習統計**：正確率、完成度、各分類進度一目了然
- **全文搜尋**：搜尋題幹、選項、答案、分類
- **三語切換**：繁體中文 / 簡體中文 / English
- **FM250 飛行手冊**：內建中文版飛行手冊，隨時查閱
- **離線可用**：純前端靜態網站，資料存在瀏覽器 localStorage

## 技術棧

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- React Router 6（HashRouter，兼容 GitHub Pages）
- localStorage 持久化

## 本地開發

```bash
npm install
npm run dev
```

## 部署

推送到 `main` 分支後，GitHub Actions 自動構建部署到 GitHub Pages。

也可以手動構建：

```bash
npm run build
# dist/ 目錄即為靜態網站
```

## 題庫維護

題庫直接內建在程式碼中：

- `src/data/bank-a.ts` — 大玩家題庫
- `src/data/bank-b.ts` — 民航局題庫

修改題庫後 push 到 GitHub 即自動更新網站。

## 目錄結構

```
src/
  data/          # 題庫資料與型別定義
  store/         # localStorage 存取邏輯
  pages/         # 頁面元件
  components/    # 共用元件（Layout、Icons）
  i18n/          # 多語系（繁中/簡中/英文）
```

## License

MIT

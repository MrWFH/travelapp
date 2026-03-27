# TravelApp

前端使用 `React + TypeScript + Vite`，后端使用 `Express`，并已将核心页面数据改为接口驱动。

## 项目结构

- `src/`：前端页面与组件
- `src/service/travelApi.ts`：前端统一 API service 层
- `server/`：后端服务
- `render.yaml`：Render 部署配置

## 本地开发

### 1) 安装依赖

```bash
npm install
npm --prefix server install
```

### 2) 配置环境变量

复制前端环境变量：

```bash
cp .env.example .env
```

复制后端环境变量：

```bash
cp server/.env.example server/.env
```

### 3) 启动服务

启动前端：

```bash
npm run dev
```

启动后端：

```bash
npm run server:dev
```

默认地址：

- 前端: `http://localhost:5173`
- 后端: `http://localhost:4000`
- 健康检查: `http://localhost:4000/health`

## 已接入接口的页面

- `Home`：首页数据
- `ProductCategory`：房源列表 + 筛选/分页/排序
- `ProductDetail`：房源详情
- `Wishlist`：收藏列表 + 取消收藏
- `Messages`：会话列表 + 会话消息 + 发送消息
- `Checkout`：提交订单
- `CheckoutComplete`：根据 `orderId` 获取订单详情

## API 说明（核心）

- `GET /api/home`
- `GET /api/properties`
- `GET /api/properties/:id`
- `GET /api/wishlist`
- `POST /api/wishlist/toggle`
- `GET /api/messages/conversations`
- `GET /api/messages/:conversationId`
- `POST /api/messages/:conversationId`
- `POST /api/checkout`
- `GET /api/orders/:orderId`

## Render 部署后端

本项目已提供 `render.yaml`，推荐用 Blueprint 一键部署：

1. 将项目推送到 GitHub。
2. 打开 Render Dashboard，选择 **New +** -> **Blueprint**。
3. 选择该仓库，Render 会读取 `render.yaml` 自动创建 `travelapp-api` 服务。
4. 在 Render 中将 `CORS_ORIGIN` 改为你的前端正式域名。
5. 部署成功后，将前端 `.env` 中 `VITE_API_BASE_URL` 改为后端 URL。

例如：

```env
VITE_API_BASE_URL=https://travelapp-api.onrender.com
```

# PetPals 宠物领养平台

一个现代化的宠物领养平台，采用 React + Django 前后端分离架构。

## 技术栈

### 前端
- React 19 + TypeScript
- Vite 构建工具
- Tailwind CSS 样式

### 后端
- Python Django 4.2
- Django REST Framework
- SQLite 数据库

## 项目结构

```
petpals-adoption-platform/
├── components/           # React 组件
├── services/            # 前端服务
├── backend/             # Django 后端
│   ├── api/            # API 应用
│   ├── petpals/        # 项目配置
│   └── manage.py
├── index.html
├── App.tsx
└── package.json
```

## 快速开始

### 后端启动

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python init_data.py  # 初始化示例数据
python manage.py runserver 8000
```

后端运行在: http://127.0.0.1:8000/

### 前端启动

```bash
npm install
npm run dev
```

前端运行在: http://localhost:5173/

## API 接口

| 端点 | 方法 | 功能 |
|------|------|------|
| `/api/pets/` | GET | 获取宠物列表 |
| `/api/pets/{id}/` | GET | 获取宠物详情 |
| `/api/pets/?category=猫猫` | GET | 按分类筛选 |
| `/api/favorites/` | GET | 收藏列表 |
| `/api/applications/` | GET/POST | 领养申请 |
| `/api/shelters/` | GET | 救助机构 |
| `/api/auth/register/` | POST | 用户注册 |
| `/api/auth/login/` | POST | 用户登录 |

## 管理后台

- 地址: http://127.0.0.1:8000/admin/
- 默认账号: admin
- 默认密码: admin123

## License

MIT

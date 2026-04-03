Super projet avec le groupe C

Pour démarrer le projet : 
```cmd
git clone https://github.com/HugoN60/BabyFootApp.git
cd BabyFootApp
npm i
npm run dev
```

Par défaut : `https://localhost:3000/`

Pour utiliser Nuxt comme des pros, pensez à prendre les extensions qui vont avec.

# Soyez pas fâchés avec les commits, merci de crée des branches pour chaque fonctionnalité pour éviter de faire des dingueries

```
BabyFootApp
├─ backend
│  ├─ app
│  │  ├─ api
│  │  │  ├─ deps.py
│  │  │  ├─ routes
│  │  │  │  ├─ auth.py
│  │  │  │  ├─ items.py
│  │  │  │  ├─ users.py
│  │  │  │  └─ __init__.py
│  │  │  └─ __init__.py
│  │  ├─ core
│  │  │  ├─ config.py
│  │  │  ├─ security.py
│  │  │  └─ __init__.py
│  │  ├─ crud
│  │  │  ├─ user.py
│  │  │  └─ __init__.py
│  │  ├─ db
│  │  │  ├─ base.py
│  │  │  ├─ session.py
│  │  │  └─ __init__.py
│  │  ├─ main.py
│  │  ├─ models
│  │  │  ├─ match.py
│  │  │  ├─ user.py
│  │  │  └─ __init__.py
│  │  ├─ schemas
│  │  │  ├─ user.py
│  │  │  └─ __init__.py
│  │  ├─ templates
│  │  │  └─ main.html
│  │  └─ __init__.py
│  └─ requirements.txt
├─ frontend
│  ├─ app.config.ts
│  ├─ app.vue
│  ├─ assets
│  │  └─ css
│  │     └─ main.css
│  ├─ components
│  ├─ composables
│  │  └─ useApi.ts
│  ├─ middleware
│  ├─ nuxt.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ pages
│  │  ├─ index.vue
│  │  └─ login.vue
│  ├─ plugins
│  ├─ public
│  │  └─ robots.txt
│  └─ tsconfig.json
├─ README.md
└─ structure.txt

```
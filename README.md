# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Timinator Web App
## Run The Project
Here are the step-by-step instructions to clone and run the project successfully:
## Step 1: Clone the Repository

```bash

git clone https://github.com/shamisashams/Timinator.git
cd [Your-Project-Folder-Name]

```
## Step 2: Set Up the Backend (FastAPI/SQLAlchemy)
1. Navigate to the Backend Folder:

```bash

cd Back-End

```
2. Create a New Virtual Environment (venv): (optional)

```bash

python -m venv venv

```

3. Activate the Virtual Environment:

+ Windows (PowerShell/CMD): .\venv\Scripts\activate
+ macOS/Linux (Bash/zsh): source venv/bin/activate

4. Install Dependencies

```bash

pip install -r requirements.txt

```

5. Launch the Backend API

```bash

uvicorn main:app --reload

```
## Step 3: Set Up the Frontend (React)
1. Navigate back to the Frontend Folder:
   open a new terminal window

```bash

cd Frontend

```

2. Install Dependencies

```bash

npm install

```

3. Launch the Frontend

```bash

npm run dev  

```
## Step 4: Access the Application
The React server will provide a URL open the URL in your browser.
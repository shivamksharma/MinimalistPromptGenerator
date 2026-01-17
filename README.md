<div align="center">

# Minimalist Bash/Zsh PS1 Prompt Generator

### Build Beautiful Terminal Prompts with Drag-and-Drop

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bashrcgenerator.vercel.app-blue?style=for-the-badge)](https://bashrcgenerator.vercel.app/)

[![GitHub stars](https://img.shields.io/github/stars/shivamksharma/MinimalistPromptGenerator?style=flat)](https://github.com/shivamksharma/MinimalistPromptGenerator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/shivamksharma/MinimalistPromptGenerator?style=flat)](https://github.com/shivamksharma/MinimalistPromptGenerator/network)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

**A fast, animation-free, hyper-minimal drag-and-drop bash prompt generator for customizing your PS1.**

[Try It Now](https://bashrcgenerator.vercel.app/) • [Documentation](https://bashrcgenerator.vercel.app/documentation) • [Presets](https://bashrcgenerator.vercel.app/presets)

</div>

---

## 🚀 What is This?

**Minimalist Prompt Generator** is a free, open-source **bash prompt generator** and **PS1 customization tool** that lets developers create beautiful, personalized terminal prompts without writing complex escape sequences by hand.

Built for **Linux**, **macOS**, and **Windows (WSL)** users who want to:
- Customize their **bash prompt** or **zsh prompt** visually
- Add **git branch**, **exit codes**, and **directory info** to their terminal
- Use **ANSI colors** and **Nerd Font icons** without memorizing codes
- Generate ready-to-use **PS1 export code** for `.bashrc` or `.zshrc`

> 💡 **No installation required** — just open the web app and start building!

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎨 **Visual Drag-and-Drop Editor** | Build prompts by dragging elements — no coding required |
| ⚡ **Real-Time Preview** | See your prompt changes instantly as you build |
| 🔧 **Git Integration** | Add branch name, commit hash, dirty markers, ahead/behind counts |
| 🎨 **ANSI Color Support** | Full 256-color palette with foreground and background options |
| 🔣 **Icon Library** | Unicode symbols and Nerd Font icons for visual prompts |
| 📋 **One-Click Export** | Copy generated PS1 code as plain text, HTML, or Markdown |
| 💾 **Save/Load Configs** | Store and retrieve your custom prompt configurations |
| 🌙 **Dark/Light Mode** | Comfortable editing in any lighting condition |
| 📱 **Responsive Design** | Works on desktop, tablet, and mobile browsers |
| 🚀 **Zero Dependencies** | Pure web app — no packages to install |

---

## 🛠️ Supported Elements

### System Information
- Username (`\u`)
- Hostname (`\h`, `\H`)
- Shell name (`\s`)
- Terminal device (`\l`)
- OS name
- Bash version (`\v`, `\V`)

### Path & Directory
- Full working directory (`\w`)
- Current directory name (`\W`)
- Home directory shortcut (`~`)

### Time & Date
- Time in various formats (`\A`, `\T`, `\t`, `\@`)
- Date formats (`\d`, `\D`)

### Git Integration
- Current branch name
- Commit hash (short)
- Repository status (clean/dirty)
- Ahead/behind remote counts

### Symbols & Brackets
- Common symbols (`>`, `<`, `|`, `-`, `_`, `=`, `+`)
- Bracket pairs (`[]`, `()`, `{}`, `⟨⟩`)
- Unicode icons (✔, ✖, →, ←, λ, ★, ♥, ⚡)

### Nerd Font Icons
- OS logos (Linux, Arch, Debian, Ubuntu, Apple, Windows)
- Development icons (Git, GitHub, Python, Node, JS, TS, Rust, Go)
- System icons (folder, home, terminal, clock, calendar)

---

## 🔧 Quick Start

### Use Online (Recommended)
1. Visit **[bashrcgenerator.vercel.app](https://bashrcgenerator.vercel.app/)**
2. Drag elements from the sidebar to build your prompt
3. Customize colors and styling
4. Copy the generated code
5. Paste into your `~/.bashrc` or `~/.zshrc`

### Run Locally

```bash
# Clone the repository
git clone https://github.com/shivamksharma/MinimalistPromptGenerator.git

# Navigate to the project
cd MinimalistPromptGenerator

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🖼️ Screenshots

<p align="center">
  <img src="assets/img-light.png" width="48%" alt="Bash Prompt Generator Light Mode" />
  <img src="assets/img-dark.png" width="48%" alt="Bash Prompt Generator Dark Mode" />
</p>

<p align="center">
  <sub>Light Mode</sub> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <sub>Dark Mode</sub>
</p>

---

## 📖 How to Use Your Generated Prompt

After building your prompt, copy the generated code and add it to your shell configuration:

### For Bash (`~/.bashrc`)
```bash
# Add to the end of ~/.bashrc
export PS1='YOUR_GENERATED_CODE_HERE'
source ~/.bashrc
```

### For Zsh (`~/.zshrc`)
```zsh
# Add to the end of ~/.zshrc
export PS1='YOUR_GENERATED_CODE_HERE'
source ~/.zshrc
```

---

## 🤔 Why Use This Tool?

| Problem | Solution |
|---------|----------|
| PS1 escape sequences are cryptic (`\[\e[32m\]`) | Visual editor shows results instantly |
| Trial and error in terminal is tedious | Real-time preview before applying |
| Hard to remember color codes | Color picker with named palette |
| Git info requires complex scripting | One-click git elements |
| Icons need font configuration | Preview with Nerd Font support |

---

## 🔗 Related Keywords

This tool is useful for anyone searching for:
- **bash prompt generator**
- **PS1 generator online**
- **zsh prompt builder**
- **terminal prompt customization**
- **bashrc prompt generator**
- **Linux terminal customization**
- **shell prompt maker**
- **command line prompt builder**
- **PS1 color codes generator**
- **git branch in bash prompt**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 18](https://reactjs.org/) | UI components |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Build tooling |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [dnd-kit](https://dndkit.com/) | Drag-and-drop |
| [Prism.js](https://prismjs.com/) | Syntax highlighting |
| [Lucide React](https://lucide.dev/) | Icons |
| [Vercel](https://vercel.com/) | Hosting |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## ⭐ Star History

If you find this tool useful, please consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=shivamksharma/MinimalistPromptGenerator&type=Date)](https://star-history.com/#shivamksharma/MinimalistPromptGenerator&Date)

---

<div align="center">

**Made with ❤️ for the developer community**

[🌐 Website](https://bashrcgenerator.vercel.app/) • [📦 GitHub](https://github.com/shivamksharma/MinimalistPromptGenerator) • [🐛 Issues](https://github.com/shivamksharma/MinimalistPromptGenerator/issues)

</div>

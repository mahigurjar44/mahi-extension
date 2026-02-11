# 🔥 MAHI AI Assistant

**Machine Assisted Human Intelligence** - Your personal AI coding companion for VSCode

## ✨ Features

- 🤖 **Local LLM Integration** - Connect to your own AI server
- 💬 **Real-time Chat** - Natural language conversations with AI
- 🛑 **Stop Generation** - Cancel AI responses anytime
- 🎨 **Modern UI** - Clean, dark-themed chat interface
- ⚡ **Fast & Responsive** - Instant message sending and receiving

## 🚀 Quick Start

### 1. Install Extension

**From VSIX:**
```bash
code --install-extension mahi-ai-assistant-1.0.0.vsix
```

**From Source:**
```bash
git clone https://github.com/mahigurjar44/mahi-extension.git
cd mahi-extension
npm install
npm run compile
npx vsce package
code --install-extension mahi-ai-assistant-1.0.0.vsix
```

### 2. Start Backend Server

Ensure your AI backend is running on `http://localhost:4000`

```bash
# Clone backend
git clone https://github.com/mahigurjar44/mahi-backend.git
cd mahi-backend

# Install and run
npm install
npm run start:dev
```

### 3. Use Extension

1. Open VSCode
2. Click the ⚡ **MAHI** icon in the Activity Bar
3. Start chatting with AI!

## 🔧 Requirements

- **VSCode** 1.99.0 or higher
- **Backend Server** running on `http://localhost:4000`
- **Node.js** 18+ (for development)

## 📡 API Configuration

The extension connects to:
- **Endpoint**: `http://localhost:4000/chat/message`
- **Method**: POST
- **Payload**: `{"message": "user input", "sessionId": "vscode-session"}`
- **Response**: JSON with `response`, `message`, or `text` field

## 🎯 Usage

### Basic Chat
- Type your message in the input field
- Press **Enter** or click **Send**
- See **"🤔 Thinking..."** while AI processes
- Click **Stop** to cancel generation

### Example Queries
```
"Explain this code"
"Create a React component"
"Fix this bug"
"Generate unit tests"
"Optimize this function"
"Write a Python script to..."
```

## 🛠️ Development

### Setup
```bash
git clone https://github.com/mahigurjar44/mahi-extension.git
cd mahi-extension
npm install
```

### Compile
```bash
npm run compile
```

### Package
```bash
npx vsce package
```

### Debug
1. Open in VSCode
2. Press **F5** to launch Extension Development Host
3. Test the extension

## 📦 Project Structure

```
mahi-extension/
├── src/
│   └── extension.ts      # Main extension logic
├── images/
│   └── logo.png          # Extension icon
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript config
├── README.md             # Documentation
├── LICENSE               # MIT License
└── CHANGELOG.md          # Version history
```

## 🔒 Privacy & Security

- **Local Processing** - All AI processing happens on your local server
- **No Data Collection** - No user data is sent to external services
- **Session Isolation** - Each VSCode session uses isolated chat context
- **Open Source** - Full transparency, audit the code yourself

## 🐛 Troubleshooting

### Connection Issues
```bash
# Check if backend is running
curl http://localhost:4000/health

# Test chat endpoint
curl -X POST http://localhost:4000/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","sessionId":"test"}'
```

### Extension Not Loading
- Restart VSCode after installation
- Check VSCode version: Help → About
- Look for MAHI icon in Activity Bar (left sidebar)
- Check Output panel: View → Output → MAHI AI Assistant

### Build Errors
```bash
# Clean and rebuild
rm -rf node_modules out
npm install
npm run compile
```

## 🚀 Deployment

### Publish to Marketplace
```bash
# Get publisher token from https://dev.azure.com
vsce login <publisher-name>
vsce publish
```

### Manual Distribution
```bash
# Package extension
npx vsce package

# Share the .vsix file
# Users install with: code --install-extension mahi-ai-assistant-1.0.0.vsix
```

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/mahigurjar44/mahi-extension/issues)
- **Backend**: [MAHI Backend](https://github.com/mahigurjar44/mahi-backend)
- **Documentation**: This README

## 🔗 Related Projects

- [MAHI Backend](https://github.com/mahigurjar44/mahi-backend) - NestJS API server
- [AI Platform](https://github.com/mahigurjar44/ai-platform) - Full stack AI platform

---

**MAHI** - Machine Assisted Human Intelligence  
*Enhancing human capabilities through AI assistance*

**Made with ❤️ by Mahi Gurjar**
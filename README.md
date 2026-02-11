# 🔥 MAHI AI Assistant

**Machine Assisted Human Intelligence** - Your personal AI coding companion for VSCode

## ✨ Features

- 🤖 **Local LLM Integration** - Connect to your own AI server
- 💬 **Real-time Chat** - Natural language conversations with AI
- 🛑 **Stop Generation** - Cancel AI responses anytime
- 🎨 **Modern UI** - Clean, dark-themed chat interface
- ⚡ **Fast & Responsive** - Instant message sending and receiving

## 🚀 Quick Start

1. **Install Extension** - Install MAHI AI Assistant from VSCode marketplace
2. **Start Local Server** - Ensure your AI server is running on `http://localhost:4000`
3. **Open Chat** - Click the ⚡ MAHI icon in the Activity Bar
4. **Start Chatting** - Type your questions and get AI assistance!

## 🔧 Requirements

- **Local AI Server** running on `http://localhost:4000/chat/message`
- **VSCode 1.99.0** or higher
- **Internet connection** for initial setup

## 📡 API Configuration

The extension expects your local AI server to:
- Accept POST requests to `/chat/message`
- Use JSON payload: `{"message": "user input", "sessionId": "vscode-session"}`
- Return plain text or JSON response

## 🎯 Usage

### Basic Chat
- Type your message in the input field
- Press **Enter** or click **Send**
- See **"🤔 Thinking..."** while AI processes
- Click **Stop** to cancel generation

### Example Queries
- "Explain this code"
- "Create a React component"
- "Fix this bug"
- "Generate unit tests"
- "Optimize this function"

## 🛠️ Development

### Local Development
```bash
git clone <repository>
cd mahi-ai-assistant
npm install
npm run compile
```

### Build Extension
```bash
npx vsce package
code --install-extension mahi-ai-assistant-1.0.0.vsix
```

## 🔒 Privacy & Security

- **Local Processing** - All AI processing happens on your local server
- **No Data Collection** - No user data is sent to external services
- **Session Isolation** - Each VSCode session uses isolated chat context

## 🐛 Troubleshooting

### Connection Issues
- Ensure your AI server is running on port 4000
- Check server endpoint: `http://localhost:4000/chat/message`
- Verify server accepts JSON POST requests

### Extension Not Loading
- Restart VSCode after installation
- Check VSCode version compatibility (1.99.0+)
- Look for MAHI icon in Activity Bar

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Submit pull request

## 📞 Support

- **Issues**: Report bugs on GitHub
- **Features**: Request new features via GitHub issues
- **Documentation**: Check README and inline comments

---

**MAHI** - Machine Assisted Human Intelligence
*Enhancing human capabilities through AI assistance*
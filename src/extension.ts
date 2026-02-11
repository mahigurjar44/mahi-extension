import * as vscode from 'vscode';
import * as http from 'http';

export function activate(context: vscode.ExtensionContext) {
    
    const provider = {
        resolveWebviewView(webviewView: vscode.WebviewView) {
            
            webviewView.webview.options = { enableScripts: true };
            webviewView.webview.html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        * { box-sizing: border-box; }
                        body { 
                            margin: 0; 
                            padding: 0; 
                            background: #1e1e1e; 
                            color: white; 
                            font-family: 'Segoe UI', sans-serif;
                            height: 100vh;
                            display: flex;
                            flex-direction: column;
                        }
                        #messages { 
                            flex: 1;
                            overflow-y: auto; 
                            padding: 10px;
                        }
                        .message { 
                            margin: 5px 0; 
                            padding: 8px 12px; 
                            border-radius: 12px; 
                            max-width: 80%;
                        }
                        .user { 
                            background: #0078d4; 
                            margin-left: auto;
                            text-align: right;
                        }
                        .ai { 
                            background: #333; 
                        }
                        #input-area { 
                            padding: 10px;
                            border-top: 1px solid #333;
                            display: flex;
                            gap: 8px;
                        }
                        #input { 
                            flex: 1;
                            padding: 8px 12px; 
                            border: 1px solid #555; 
                            background: #2d2d30; 
                            color: white; 
                            border-radius: 20px;
                            outline: none;
                        }
                        #send { 
                            padding: 8px 16px; 
                            background: #0078d4; 
                            color: white; 
                            border: none; 
                            border-radius: 20px; 
                            cursor: pointer;
                        }
                        #send:hover { background: #106ebe; }
                        #send.stop { background: #d13438; }
                        #send.stop:hover { background: #a1262a; }
                    </style>
                </head>
                <body>
                    <div id="messages"></div>
                    <div id="input-area">
                        <input type="text" id="input" placeholder="Ask me anything..." />
                        <button id="send">Send</button>
                    </div>
                    
                    <script>
                        const vscode = acquireVsCodeApi();
                        const messages = document.getElementById('messages');
                        const input = document.getElementById('input');
                        const send = document.getElementById('send');
                        
                        let isThinking = false;
                        
                        function addMessage(text, isUser) {
                            const div = document.createElement('div');
                            div.className = 'message ' + (isUser ? 'user' : 'ai');
                            div.textContent = text;
                            messages.appendChild(div);
                            messages.scrollTop = messages.scrollHeight;
                        }
                        
                        function sendMessage() {
                            if (isThinking) {
                                // Stop thinking
                                const thinking = document.getElementById('thinking');
                                if (thinking) thinking.remove();
                                isThinking = false;
                                send.textContent = 'Send';
                                send.className = '';
                                addMessage('Stopped by user', false);
                                return;
                            }
                            
                            const text = input.value.trim();
                            if (!text) return;
                            
                            addMessage(text, true);
                            input.value = '';
                            
                            // Add thinking indicator and change button
                            const thinkingDiv = document.createElement('div');
                            thinkingDiv.className = 'message ai';
                            thinkingDiv.textContent = '🤔 Thinking...';
                            thinkingDiv.id = 'thinking';
                            messages.appendChild(thinkingDiv);
                            messages.scrollTop = messages.scrollHeight;
                            
                            isThinking = true;
                            send.textContent = 'Stop';
                            send.className = 'stop';
                            
                            vscode.postMessage({ type: 'chat', message: text });
                        }
                        
                        send.onclick = function() {
                            sendMessage();
                        };
                        
                        input.onkeypress = function(e) {
                            if (e.key === 'Enter') {
                                sendMessage();
                            }
                        };
                        
                        window.addEventListener('message', function(event) {
                            if (event.data.type === 'response') {
                                // Remove thinking indicator and reset button
                                const thinking = document.getElementById('thinking');
                                if (thinking) thinking.remove();
                                isThinking = false;
                                send.textContent = 'Send';
                                send.className = '';
                                
                                addMessage(event.data.text, false);
                            }
                        });
                        
                        addMessage('🔥 MAHI AI Ready! Machine Assisted Human Intelligence at your service.', false);
                    </script>
                </body>
                </html>
            `;
            
            webviewView.webview.onDidReceiveMessage(async message => {
                if (message.type === 'chat') {
                    try {
                        // Use Node.js HTTP instead of fetch
                        const postData = JSON.stringify({
                            message: message.message,
                            sessionId: 'vscode-session'
                        });
                        
                        const options = {
                            hostname: 'localhost',
                            port: 4000,
                            path: '/chat/message',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Content-Length': Buffer.byteLength(postData)
                            }
                        };
                        
                        const req = http.request(options, (res) => {
                            let data = '';
                            res.on('data', (chunk) => {
                                data += chunk;
                            });
                            res.on('end', () => {
                                try {
                                    const response = JSON.parse(data);
                                    const aiResponse = response.response || response.message || response.text || 'No response from AI';
                                    webviewView.webview.postMessage({ type: 'response', text: aiResponse });
                                } catch (parseError) {
                                    // Server returns plain text, not JSON
                                    webviewView.webview.postMessage({ type: 'response', text: data.trim() });
                                }
                            });
                        });
                        
                        req.on('error', (error) => {
                            webviewView.webview.postMessage({ 
                                type: 'response', 
                                text: `Connection failed: ${error.message}. Is your server running on http://localhost:4000?` 
                            });
                        });
                        
                        req.write(postData);
                        req.end();
                        
                    } catch (error: any) {
                        webviewView.webview.postMessage({ 
                            type: 'response', 
                            text: `Error: ${error.message}` 
                        });
                    }
                }
            });
        }
    };
    
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('mahiAIView', provider)
    );
}

export function deactivate() {}
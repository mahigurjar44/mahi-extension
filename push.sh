#!/bin/bash
cd /home/ulap207/Documents/fun_project/ai-platform/test-extension

git init
git config user.name "Mahi Gurjar"
git config user.email "mahajangalgach@gmail.com"
git config commit.gpgsign false
git add .
git commit -m "Initial commit: MAHI AI Assistant v1.0.0"
git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin git@github.com:mahigurjar44/mahi-ai-assistant.git
git push -u origin main

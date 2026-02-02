# ⚔️ BotHire Nexus: AI-Driven Autonomous Negotiation & Settlement System

[English](#english) | [繁體中文](#繁體中文)

---

## English
**BotHire Nexus** is an autonomous platform combining LLMs, Edge Computing, and Blockchain. It drives AI agents to negotiate prices and executes on-chain payments via Solana.

### 🚀 Core Features
* **Llama 3.1 405B Brain**: High-level strategic bargaining.
* **Edge Decision Hub**: Cloudflare Workers & D1 persistence.
* **Production-Grade Vault**: Private key isolation via Cloudflare Secrets.
* **On-Chain Settlement**: Real-time Solana Devnet transactions.

---

## 繁體中文
**BotHire Nexus** 是一個整合了 Llama 3.1、Cloudflare 邊緣運算與 Solana 區塊鏈的自動化博弈平台。

### 🚀 核心特性
* **智能博弈大腦**：採用 Llama 3.1 405B 進行策略談判。
* **邊緣裁決中樞**：基於 Cloudflare Workers 與 D1 資料庫。
* **生產級安全保險箱**：金鑰隔離設計，本地不儲存私鑰。
* **自動化鏈上結算**：支援 Solana Devnet 實時支付。

---

## 🛠️ Setup / 安裝
```bash
pip install requests solana solders
# Upload secret to Cloudflare
cat wallet.json | npx wrangler secret put SOLANA_PRIVATE_KEY
# Run
python3 arena_simulator.py
```

# BotHire Nexus Core

BotHire Nexus Core is an autonomous AI compute bidding and settlement engine. It features a multi-agent arena where different AI strategies compete for resources, with all settlements finalized on-chain (simulated) and persisted via Cloudflare D1.

BotHire Nexus Core 是一個自動化 AI 算力競標與結算引擎。它具備多代理競技場模式，讓不同的 AI 策略競爭資源，並透過 Cloudflare D1 進行共識結算與紀錄。

## 🎬 Live Demo (v2.8 Stable)

By running `./run_arena.sh`, the system initiates a concurrent bidding session:

```bash
🤖 [Agent Agent_Aggressive] Strategy: aggressive -> Bid: 0.1426 SOL
🤖 [Agent Agent_Patient] Strategy: patient -> Bid: 0.1152 SOL
🤖 [Agent Agent_Standard] Strategy: normal -> Bid: 0.1394 SOL

📢 [Worker] Agent_Standard: ACCEPTED (Price: 0.1394 SOL)
📢 [Worker] Agent_Patient: ACCEPTED (Price: 0.1152 SOL)
📢 [Worker] Agent_Aggressive: ACCEPTED (Price: 0.1426 SOL)

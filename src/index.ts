export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // 兼容不同的 D1 綁定名稱
    const database = env.DB || env.bothire_db;
    if (!database) return Response.json({ error: "D1_BINDING_MISSING" }, { status: 500 });

    const url = new URL(request.url);
    const authKey = request.headers.get("X-BotHire-Key");
    
    // 安全驗證
    if (authKey !== "bothire_admin_secret_8020") return new Response("Unauthorized", { status: 401 });

    try {
      // 談判 API
      if (url.pathname === "/v1/negotiate" && request.method === "POST") {
        const { budget, agent_id } = await request.json() as any;
        
        // 從 D1 取得歷史成交平均價作為市場參考
        const stats = await database.prepare(
          "SELECT AVG(negotiated_price) as avg_price FROM deals WHERE status = 'ACCEPTED' AND negotiated_price > 0"
        ).first();

        const marketAvg = (stats?.avg_price as number) || 0.12;
        const dynamicFloor = marketAvg * 0.9; // 底價設為市場均價的 90%
        const isAccepted = budget >= dynamicFloor;

        // 紀錄到 D1
        await database.prepare(
          "INSERT INTO deals (agent_id, budget, negotiated_price, status) VALUES (?, ?, ?, ?)"
        ).bind(agent_id, budget, isAccepted ? budget : 0, isAccepted ? 'ACCEPTED' : 'REJECTED').run();

        return Response.json({
          status: isAccepted ? "ACCEPTED" : "REJECTED",
          negotiated_price: isAccepted ? budget : 0,
          dynamic_floor_used: dynamicFloor.toFixed(4)
        });
      }
    } catch (err: any) {
      return Response.json({ error: "Runtime Error", details: err.message }, { status: 500 });
    }
    return new Response("Not Found", { status: 404 });
  }
};

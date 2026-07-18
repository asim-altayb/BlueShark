// Secure login: POST { username, password } -> { ok:true, username } | 401
// Passwords are stored as SHA-256 hex in D1 (never plaintext, never listed).
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const cors = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export async function onRequestPost(context) {
  try {
    const { username, password } = await context.request.json();
    if (!username || !password) {
      return new Response(JSON.stringify({ ok: false }), { status: 400, headers: cors });
    }
    const row = await context.env.DB.prepare(
      "SELECT username, password FROM login WHERE username = ?"
    ).bind(username).first();
    if (!row) return new Response(JSON.stringify({ ok: false }), { status: 401, headers: cors });
    const hash = await sha256(String(password));
    if (hash !== row.password) {
      return new Response(JSON.stringify({ ok: false }), { status: 401, headers: cors });
    }
    return new Response(JSON.stringify({ ok: true, username: row.username }), { headers: cors });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500, headers: cors });
  }
}

export async function onRequestGet() {
  return new Response(JSON.stringify({ error: "method not allowed" }), { status: 405, headers: cors });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

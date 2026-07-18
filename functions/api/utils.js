export function createHandler(tableName) {
  async function onRequestGet(context) {
    const { results } = await context.env.DB.prepare(
      `SELECT * FROM ${tableName}`
    ).all();

    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  async function onRequestPost(context) {
    const data = await context.request.json();

    const keys = Object.keys(data);
    const values = Object.values(data);

    const columns = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const stmt = context.env.DB.prepare(
      `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`
    );

    await stmt.bind(...values).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  async function onRequestOptions() {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  return { onRequestGet, onRequestPost, onRequestOptions };
}

export function createItemHandler(tableName) {
  async function onRequestDelete(context) {
    const id = context.params.id;

    await context.env.DB.prepare(
      `DELETE FROM ${tableName} WHERE id = ?`
    ).bind(id).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  async function onRequestPut(context) {
    const id = context.params.id;
    const data = await context.request.json();

    const updates = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");

    const stmt = context.env.DB.prepare(
      `UPDATE ${tableName} SET ${updates} WHERE id = ?`
    );

    await stmt.bind(...Object.values(data), id).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  async function onRequestOptions() {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  return { onRequestDelete, onRequestPut, onRequestOptions };
}

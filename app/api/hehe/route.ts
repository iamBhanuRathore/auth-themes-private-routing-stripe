export async function GET(req, res) {
  try {
    return new Response("Hello", { status: 201 });
  } catch (error) {
    return new Response("Error", { status: 201 });
  }
}

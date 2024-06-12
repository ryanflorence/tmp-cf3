export async function onRequest(context) {
  let customers = await context.env.DB.prepare("SELECT * FROM Customers").all();
  return Response.json(customers.results);
}

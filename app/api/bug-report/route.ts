export async function POST(request: Request) {
  const { message, email, page } = await request.json()

  if (!message || message.trim().length < 10) {
    return Response.json({ error: 'Message too short' }, { status: 400 })
  }

  // Log to console on Railway — CEO can check logs or configure email later
  console.log('[BUG REPORT]', {
    message: message.trim(),
    email: email || 'anonymous',
    page: page || 'unknown',
    submittedAt: new Date().toISOString(),
  })

  return Response.json({ success: true })
}

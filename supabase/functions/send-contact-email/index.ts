const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1'
const TO_EMAIL = 'Fahadomar995@gmail.com'

function encodeRaw(to: string, from: string, subject: string, body: string, replyTo: string) {
  const msg = [
    `To: ${to}`,
    `From: ${from}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    body,
  ].join('\r\n')
  return btoa(unescape(encodeURIComponent(msg)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    const GOOGLE_MAIL_API_KEY = Deno.env.get('GOOGLE_MAIL_API_KEY')
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured')
    if (!GOOGLE_MAIL_API_KEY) throw new Error('GOOGLE_MAIL_API_KEY not configured')

    const { name, email, type, message } = await req.json()
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const subject = `[LC Accounting · ${type || 'feedback'}] ${name}`
    const body = `Type: ${type}\nFrom: ${name} <${email}>\n\n${message}`
    const raw = encodeRaw(TO_EMAIL, TO_EMAIL, subject, body, email)

    const r = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': GOOGLE_MAIL_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    })
    const data = await r.json()
    if (!r.ok) throw new Error(`Gmail send failed [${r.status}]: ${JSON.stringify(data)}`)

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    console.error('send-contact-email error:', msg)
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
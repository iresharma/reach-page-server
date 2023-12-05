export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const { route } = req.body

    try {
      await res.revalidate(`/${route}`)
      return res.json({ revalidated: true })
    } catch (err) {
      console.log(err)
      return res.status(500).send('Error revalidating')
    }
  }
}

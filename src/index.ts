import { Hono } from 'hono';
import { cors } from 'hono/cors';
import Replicate from 'replicate'

const app = new Hono<{ Bindings: Env }>();
app.use(cors());

 
interface Env {
  REPLICATE_API_TOKEN: string
}

app.post('/generate-image', async (c) => {
  const { prompt } = await c.req.json()

  const replicate = new Replicate({auth: c.env.REPLICATE_API_TOKEN})
  const model = 'black-forest-labs/flux-schnell'  
  const output = await replicate.run(model, {
    input: {
      prompt,
      image_format: 'webp',
    }
  }) as { url: string }[] | { url: string }
    
  // Some image models return an array of output files, others just a single file.
  const imageUrl = Array.isArray(output) ? output[0].url() : output.url()
 
  console.log({imageUrl})

  return c.json({ imageUrl })
})


export default app;

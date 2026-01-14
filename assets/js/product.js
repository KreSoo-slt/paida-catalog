
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://qmnnbotyzwftlhwakbnz.supabase.co',
  'PASTE_YOUR_ANON_KEY_HERE'
)

const slug = new URLSearchParams(location.search).get('slug')
const productEl = document.getElementById('product')

const { data } = await supabase
  .from('products')
  .select('*')
  .eq('slug', slug)
  .eq('archived', false)
  .single()

if (!data) {
  productEl.innerHTML = 'Товар не найден'
} else {
  document.getElementById('title').textContent = data.name
  document.getElementById('desc').content = data.description || data.name

  productEl.innerHTML = `
    <h1>${data.name}</h1>
    <img src="${data.img}" style="max-width:400px">
    <h2>${data.price} ₸</h2>
    <p>${data.description || ''}</p>
    <h3>Доставка</h3>
    <ul>
      <li>Самовывоз</li>
      <li>Яндекс доставка</li>
      <li>Курьер магазина</li>
    </ul>
  `
}

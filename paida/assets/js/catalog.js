
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://qmnnbotyzwftlhwakbnz.supabase.co',
  'PASTE_YOUR_ANON_KEY_HERE'
)

let products = []
let currentCategory = null

const productsEl = document.getElementById('products')
const categoriesEl = document.getElementById('categories')
const sidebar = document.getElementById('sidebar')

window.toggleSidebar = () => sidebar.classList.toggle('open')

async function load() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('archived', false)
    .order('order')

  products = data || []
  renderCategories()
  renderProducts()
}

function renderCategories() {
  categoriesEl.innerHTML = '<li class="active">Все товары</li>'
  categoriesEl.children[0].onclick = () => {
    currentCategory = null
    setActive(categoriesEl.children[0])
    renderProducts()
    sidebar.classList.remove('open')
  }

  const cats = [...new Set(products.map(p => p.category).filter(Boolean))]
  cats.forEach(cat => {
    const li = document.createElement('li')
    li.textContent = cat
    li.onclick = () => {
      currentCategory = cat
      setActive(li)
      renderProducts()
      sidebar.classList.remove('open')
    }
    categoriesEl.appendChild(li)
  })
}

function setActive(el) {
  [...categoriesEl.children].forEach(i => i.classList.remove('active'))
  el.classList.add('active')
}

function renderProducts() {
  productsEl.innerHTML = ''
  const list = currentCategory ? products.filter(p => p.category === currentCategory) : products
  list.forEach(p => {
    productsEl.innerHTML += `
      <a class="product-card" href="product.html?slug=${p.slug}">
        <img src="${p.img}" onerror="this.src='https://via.placeholder.com/300'">
        <h4>${p.name}</h4>
        <b>${p.price} ₸</b>
      </a>
    `
  })
}

load()

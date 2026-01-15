// Клиентская фильтрация и пагинация. Работает с карточками, у которых есть
// класс .product-item (или .product-card) и data-атрибуты: data-category, data-subcategory, data-type, data-name
document.addEventListener('DOMContentLoaded', () => {
  const defaultLimit = 12
  // Попробуем найти список товаров в типичных классах
  const productsContainer = document.querySelector('.products-list') || document.querySelector('.product-grid') || document.querySelector('.products-container') || document.querySelector('.products')
  if(!productsContainer) return

  const allItems = Array.from(productsContainer.querySelectorAll('.product-item, .product-card, .product')) // гибкий набор селекторов
  if(allItems.length === 0) return

  const unique = arr => Array.from(new Set(arr.filter(Boolean)))
  const categories = unique(allItems.map(i => i.dataset.category || i.getAttribute('data-category')))
  const subcategories = unique(allItems.map(i => i.dataset.subcategory || i.getAttribute('data-subcategory')))
  const types = unique(allItems.map(i => i.dataset.type || i.getAttribute('data-type')))

  // Вставим простой сайдбар фильтров в существующий .sidebar (если есть)
  const sidebar = document.querySelector('.sidebar') || document.querySelector('.sidebar-card')
  if(sidebar){
    sidebar.innerHTML = ''
    const makeList = (title, items, key) => {
      const wrap = document.createElement('div')
      const h = document.createElement('h4'); h.textContent = title
      wrap.appendChild(h)
      const ul = document.createElement('ul'); ul.style.paddingLeft = '12px'
      const liAll = document.createElement('li')
      const btnAll = document.createElement('button'); btnAll.textContent = 'Все'; btnAll.className = 'filter-btn'; btnAll.dataset[key] = ''
      liAll.appendChild(btnAll); ul.appendChild(liAll)
      items.forEach(v => {
        const li = document.createElement('li')
        const b = document.createElement('button'); b.textContent = v; b.className = 'filter-btn'; b.dataset[key] = v
        li.appendChild(b); ul.appendChild(li)
      })
      wrap.appendChild(ul)
      return wrap
    }
    if(categories.length) sidebar.appendChild(makeList('Категория', categories, 'category'))
    if(subcategories.length) sidebar.appendChild(makeList('Подкатегория', subcategories, 'subcategory'))
    if(types.length) sidebar.appendChild(makeList('Производитель', types, 'type'))
  }

  // Контролы (если нет, создадим под productsContainer)
  let controls = document.querySelector('.controls') || document.querySelector('.controls-wrapper')
  if(!controls){
    controls = document.createElement('div'); controls.className = 'controls'
    productsContainer.parentNode.insertBefore(controls, productsContainer)
  }

  controls.innerHTML = `
    <div>
      Показывать на странице:
      <select id="pageSizeSelect">
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="48">48</option>
      </select>
    </div>
    <div id="totalCount"></div>
  `

  const pager = document.getElementById('pager') || document.createElement('div')
  pager.id = 'pager'
  pager.className = 'pagination'
  productsContainer.parentNode.insertBefore(pager, productsContainer.nextSibling)

  const pageInfoEl = document.getElementById('pageInfo') || null

  const pageSizeSelect = document.getElementById('pageSizeSelect')
  const totalCountEl = document.getElementById('totalCount')

  let state = { category:'', subcategory:'', type:'', q:'', page:1, limit: defaultLimit }

  function apply(){
    let items = allItems.filter(it => {
      const name = (it.dataset.name || it.getAttribute('data-name') || '').toLowerCase()
      if(state.q && !name.includes(state.q.toLowerCase())) return false
      if(state.category && (it.dataset.category || it.getAttribute('data-category')) !== state.category) return false
      if(state.subcategory && (it.dataset.subcategory || it.getAttribute('data-subcategory')) !== state.subcategory) return false
      if(state.type && (it.dataset.type || it.getAttribute('data-type')) !== state.type) return false
      return true
    })

    const total = items.length
    totalCountEl.textContent = `${total} товаров`

    const totalPages = Math.max(1, Math.ceil(total / state.limit))
    if(state.page > totalPages) state.page = totalPages
    const start = (state.page - 1) * state.limit
    const end = start + state.limit

    allItems.forEach(i => i.style.display = 'none')
    items.slice(start, end).forEach(i => i.style.display = '')

    renderPager(state.page, totalPages)
    if(pageInfoEl) pageInfoEl.textContent = `Страница ${state.page} из ${totalPages}`
  }

  function renderPager(current, totalPages){
    pager.innerHTML = ''
    const makeBtn = (txt, disabled, onClick) => {
      const b = document.createElement('button'); b.textContent = txt
      if(disabled) b.disabled = true
      b.addEventListener('click', onClick)
      return b
    }
    pager.appendChild(makeBtn('←', current<=1, ()=>{ state.page = Math.max(1, state.page-1); apply() }))
    const start = Math.max(1, current - 3)
    const end = Math.min(totalPages, start + 6)
    if(start > 1){ pager.appendChild(makeBtn('1', false, ()=>{ state.page = 1; apply() })); if(start>2) pager.appendChild(document.createTextNode('...')) }
    for(let p=start; p<=end; p++){
      const b = makeBtn(p, false, ()=>{ state.page = p; apply() })
      if(p===current) b.style.fontWeight = '700'
      pager.appendChild(b)
    }
    if(end < totalPages){ if(end < totalPages -1) pager.appendChild(document.createTextNode('...')); pager.appendChild(makeBtn(totalPages, false, ()=>{ state.page = totalPages; apply() })) }
    pager.appendChild(makeBtn('→', current>=totalPages, ()=>{ state.page = Math.min(totalPages, state.page+1); apply() }))
  }

  // Обработчики кликов по фильтрам
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn')
    if(!btn) return
    if(btn.dataset.category !== undefined){ state.category = btn.dataset.category || ''; state.page = 1; apply() }
    if(btn.dataset.subcategory !== undefined){ state.subcategory = btn.dataset.subcategory || ''; state.page = 1; apply() }
    if(btn.dataset.type !== undefined){ state.type = btn.dataset.type || ''; state.page = 1; apply() }
  })

  // Поиск: попытаемся найти поле с id searchInput или siteSearch
  const siteSearch = document.getElementById('searchInput') || document.getElementById('siteSearch')
  if(siteSearch){
    siteSearch.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){ state.q = siteSearch.value || ''; state.page = 1; apply() }
    })
  }

  pageSizeSelect.addEventListener('change', (e) => {
    state.limit = parseInt(e.target.value, 10); state.page = 1; apply()
  })

  apply()
})

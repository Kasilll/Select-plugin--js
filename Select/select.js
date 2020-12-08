const getTemlate = (data,placeholder)=> {
    const text = placeholder ?? 'Placeholder по умолчанию'
    const items = data.map(item=> {
        return `<li class = "select__item" data-type = "item" data-id = ${item.id}>${item.value}</li>`
    })
   
    
    return `
    <div class="select__input" data-type = "input">
            <span class="text">${text}</span>
            <i class="fas fa-chevron-down" data-type = "arrow"-></i>
        </div>
            <div class="select__dropdown">
                <ul class="select__list">
                   ${items.join("")}     
                </ul>
            </div>
    `;
}

export class Select {
    constructor(selector,options) {
        this.$el = document.querySelector(selector);
        this.options = options;
        

        this.#render();
        this.#setup();
    }
    #render() {
        const {placeholder,data} = this.options;
       
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemlate(data,placeholder);
    }
    #setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = document.querySelector("[data-type = 'arrow']")
    }
    clickHandler(event) {
        const {type} = event.target.dataset;
    
        if(type === "input") {
            this.toggle();
        } else if(type === "item") {
            const id = event.target.dataset.id;
            this.select(id)
        }
    }
    get isOpen() {
        return this.$el.classList.contains('open');
    }
    select(id) {
        const arrItems = document.querySelectorAll('li');
        let choseItem = null;

        arrItems.forEach((el)=>{ 
            if(el.dataset.id === id) {
                choseItem = el.textContent;
            }
        })
        
        this.$el.querySelectorAll(`[data-type="item"]`).forEach(el=>{
            el.classList.remove('selected')
        })
        document.querySelector('.text').innerText = choseItem;
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
        console.log(this.$el.querySelector(`[data-id="${id}"]`))
        this.close();
    }
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    open() {
        this.$el.classList.add('open');
        this.$arrow.classList.remove('fa-chevron-down');
        this.$arrow.classList.add('fa-chevron-up');
    }
    close() {
        this.$el.classList.remove('open')
        this.$arrow.classList.remove('fa-chevron-up');
        this.$arrow.classList.add('fa-chevron-down')
    }
}
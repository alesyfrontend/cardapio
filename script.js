const menu = document.getElementById("menu")
const cartBtn= document.getElementById("cart-btn")
const cartModal =document.getElementById("cart-modal")
const cartItensContainer=document.getElementById("cart-items")
const cartTotal=document.getElementById("cart-total")
const checkoutBtn=document.getElementById("checkout-btn")
const closeModalBtn=document.getElementById("close-modal-btn")
const castCounter=document.getElementById("cart-count")
const addressInput=document.getElementById("address")
const addressWarn=document.getElementById("address-warn")

let cart=[];

//abrir o modal do carrinho
cartBtn.addEventListener("click",function() {
    updateCartModal();
    cartModal.style.display ="flex"

})

//fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target=== cartModal){
        cartModal.style.display="none"
    }
})

closeModalBtn.addEventListener("click",function(){
    cartModal.style.display="none"
})


menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")
    
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }

})
    
//função para adicionar no carrinho
function addToCart(name, price){
    const existingItem = cart.find (item=> item.name===name)
       
    if(existingItem){
        existingItem.quantity+=1
      
    }else{
        cart.push({
            name,
            price,
            quantity:1
        
           })
    }
    
    updateCartModal() 
}

//Atualiza o carrinho
function updateCartModal(){
    cartItensContainer.innerHTML="";
    let total=0;


    cart.forEach(item=> {
        const cartItemElement=document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")



        cartItemElement.innerHTML=`   
        <div class="flex itens-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt=2">R$ ${item.price}</p>
            </div>
                <div>
                    <button class="remove-from-cart-btn" data-name="${item.name}">
                        Remover
                    </button>
                </div>

        </div>
        `
            total += item.price * item.quantity;


cartItensContainer.appendChild(cartItemElement)

 })

cartTotal.textContent = total.toLocaleString("pt-BR", {
    style:"currency",
    currency:"BRL"
})
        castCounter.innerHTML=cart.length;
}
//função par remover itens do carrinho
cartItensContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }


})


function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);


    if (index !== -1){
        const item=cart[index];

            if(item.quantity > 1){
                item.quantity -= 1;
                updateCartModal();
                return;
            }

            cart.splice(index, 1);
            updateCartModal();

     }
}

addressInput.addEventListener("input", function(event){
   let inputValue = event.target.value;
    if(inputValue !== ""){
            addressInput.classList.remove("border-red-500")
            addressWarn.classList.add("hidden")
            

    }
   
})
//finalizar pedido
checkoutBtn.addEventListener("click",function(){
 const isOpen = checkRestaurantOpen();
        if(!isOpen){

            alert ("restaurante fechado no momento!")
            return;
        }
    

        if(cart.length === 0) return;
            if(addressInput.value === ""){
                addressWarn.classList.remove("hidden")
                addressInput.classList.add("border-red-500")
                return;
              
        }

        
 //Enviar pedido para o api whats
  const cartItems =cart.map((item) => {
        return(
            `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} | `  
        )
    
        
    }).join("")
        
    const message=encodeURIComponent(cartItems)
    const phone ="21970199028"

    window.open(`https://wa.me/${phone}?text=${message} Endereço:${addressInput.value}`, "_blank")
    cart=[];
    updateCartModal();
   
})






    //verifica a hora e manipular o card horario
    function checkRestaurantOpen(){
        const data=new Date();
        const hora= data.getHours();
    return hora >= 12 && hora < 22;//true restaurante está aberto
    }

    const spanItem = document.getElementById ("date-span")
    const isOpen = checkRestaurantOpen();

    if (isOpen){
        spanItem.classList.remove("bg-red-500")
        spanItem.classList.add("bg-green-600")
    }else{
        spanItem.classList.remove("bg-green-600")
        spanItem.classList.add("bg-red-500")

    }
















   
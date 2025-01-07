
document.getElementById("viewExplicacao").addEventListener("click", event=>{
    if(event.target.value == "false"){
        event.target.value = "true"
        document.getElementById("explicacao").style.display = "block"
    }else{
        event.target.value = "false"
        document.getElementById("explicacao").style.display = "none"
    }
})

document.getElementById("angView").addEventListener("change", event=>{
    ang = event.target.value
    processMecanismo() 
})

// Restarta sliders para o valor padrão
document.getElementById("valoresPadrao").addEventListener("click", event=>{
    dim = [...dimDefaut]
    let elements = document.getElementsByClassName("unidadeInput")

    while(elements.length > 0){
        let e = elements.item(0)
        e.remove()
    }
    
    makeSliders()
    processMecanismo() 
})

document.getElementById("viewPercursoCheck").addEventListener("change", event=>{
    viewTracado = !viewTracado
    processMecanismo()
})


document.getElementById("girarCheck").addEventListener("change", event=>{
    girar = !girar
    clearInterval(animation)

    if(girar){
        animation = setInterval(()=>{
            ang += 2
            if(ang >= 360){
                ang = ang - 360
            } 
            updateAngView()       
            processMecanismo()
        }, 1000/velocidade)
    }
    
})

document.getElementById("input_velocidade").addEventListener("input", event=>{
    
    
    velocidade = event.target.value

    if(girar){
        clearInterval(animation)
        animation = setInterval(()=>{
            ang += 2
            if(ang >= 360){
                ang = ang - 360
            }    
            updateAngView()    
            processMecanismo()
        }, 1000/velocidade)
    }
})


function updateAngView(){
    document.getElementById("angView").value = ang
}

function updateViewBar(){
    viewBar = !viewBar
    processMecanismo()
}

function updateViewPoints(){
    viewPoints = !viewPoints
    processMecanismo()
}


function updateViewText(){
    viewText = !viewText
    processMecanismo()
}


// Gera os controles dos sliders
function makeSliders(){
    for(let i = 0; i < dim.length; i++){
        addControle(refs[i], dim[i])
    }
}



function addControle(name, value){
    // Adiciona os sliders à tela

    
    const viewSliders = document.getElementById("viewSliders")
    
    let input = document.createElement("div")
    input.setAttribute("class", "unidadeInput")

    let inputValueDiv = document.createElement("div")
    inputValueDiv.setAttribute("class", "inputValueDiv")

    let inputSlider = document.createElement("div")
    inputSlider.setAttribute("class", "inputSlider")

    let inputValue = document.createElement("input")
    inputValue.setAttribute("type", "text")
    inputValue.setAttribute("id", "inputValue_" + name)
    inputValue.setAttribute("class", "inputMinMax")
    inputValue.setAttribute("value", value)
    inputValue.addEventListener("change", event=>{
        document.getElementById("input_" + name).value = Math.round(event.target.value * 100 ) / 100
        dim[refs.indexOf(name)] = Math.round(event.target.value * 100 ) / 100
        processMecanismo()
    })

    let label = document.createElement("label")
    label.setAttribute("for", "input_" + name)
    label.innerText = name + " :"
    

    // let label = document.createElement("div")

    let inputMin = document.createElement("input")
    inputMin.setAttribute("class", "inputMinMax")
    inputMin.setAttribute("type", "text")
    inputMin.setAttribute("id", name + "_min")
    inputMin.setAttribute("ref", "input_" + name)
    inputMin.setAttribute("value", "0")
    inputMin.addEventListener("change", event =>{

        var ref = event.target.getAttribute("ref");
        var input = document.getElementById(ref)

        if(input.value < event.target.value){            
            input.setAttribute("value", event.target.value )
        } 
                    
        input.min = event.target.value
        
    })
    

    let inputMax = document.createElement("input")
    inputMax.setAttribute("class", "inputMinMax")
    inputMax.setAttribute("type", "text")
    inputMax.setAttribute("ref", "input_" + name)
    inputMax.setAttribute("id", name + "_max")
    inputMax.setAttribute("value", "100")
    inputMax.addEventListener("change", event =>{

        var ref = event.target.getAttribute("ref");
        var input = document.getElementById(ref)

        if(input.value > event.target.value){            
            input.setAttribute("value", event.target.value )
        } 
                    
        input.max = event.target.value

        
    })

    let slider = document.createElement("input")
    slider.setAttribute("name", "input_" + name)
    slider.setAttribute("id", "input_" + name)
    slider.setAttribute("class", "slider")
    slider.setAttribute("type", "range")
    slider.setAttribute("min", 0)
    slider.setAttribute("max", 100)
    slider.setAttribute("step", "any")
    slider.setAttribute("value", value)
    slider.addEventListener("change", event=>{
        const inputValue = document.getElementById("inputValue_" + name)
        inputValue.value = Math.round(event.target.value * 100 ) / 100

    })

    slider.addEventListener("input", event=>{
        const inputValue = document.getElementById("inputValue_" + name)
        inputValue.value = Math.round(event.target.value * 100 ) / 100

        dim[refs.indexOf(name)] = Math.round(event.target.value * 100 ) / 100
        processMecanismo()
    })


    inputValueDiv.appendChild(label)
    inputValueDiv.appendChild(inputValue)

    inputSlider.appendChild(inputMin)
    inputSlider.appendChild(slider)
    inputSlider.appendChild(inputMax)


    input.appendChild(inputValueDiv)
    input.appendChild(inputSlider)
    // input.appendChild(document.createElement("hr"))

    viewSliders.appendChild(input)

    
}
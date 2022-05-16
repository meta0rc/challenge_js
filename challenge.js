const desafio = document.getElementById('desafio');
const sentChallenge = document.querySelector('.submit-desafio');
let tmp = {};

[...Array(9)].map(() => {

    const aleatorie = Math.floor(Math.random() * (10 - 1) + 1)
     image = document.createElement('img')
     image.classList.add('challenge')
     if(aleatorie == 3 || aleatorie == 2 || aleatorie == 1){
         image.classList.add('birds')
     }
     else if(aleatorie == 4 || aleatorie == 5 || aleatorie == 6){
         image.classList.add('galaxys')
     }
     else { 
         image.classList.add('cars')
     }
     image.setAttribute('src', `/app/assets/js/challenge/desafio-${aleatorie}.jpg`);
     desafio.append(image)
})
const validate = new Array();

document.querySelectorAll('.challenge').forEach(img => {

    img.addEventListener('click', () => {

        clicked = img.getAttribute('class').substring(10)

        img.setAttribute('selected-challenge', '')

        validate.push(clicked);

    })
})

cars = document.querySelectorAll('.cars')
birds = document.querySelectorAll('.birds')
galaxys = document.querySelectorAll('.galaxys')


if(cars.length > birds.length && cars.length > galaxys.length){
    $('#h3-desafio').text('*Selecione todas imagens que contenham Carros')
    tmp = {
        length: cars.length,
        title: 'cars'
    }
}
else if(birds.length > cars.length && birds.length > galaxys.length){
    $('#h3-desafio').text('*Selecione todas imagens que contenham Passaros')
    tmp = {
        length: birds.length,
        title: 'birds'
    }

}
else if(galaxys.length >= cars.length && galaxys.length >= birds.length){
    $('#h3-desafio').text('*Selecione todas imagens que contenham Galaxias')
    tmp = {
        length: galaxys.length,
        title: 'galaxys'
    }
}

sentChallenge.addEventListener('click', () => {

    const selected = document.querySelectorAll('[selected-challenge]')
    const {array, res} = compare(validate);

    array.forEach((a, i) => {
        if(array[i] != tmp.title){
            return alert("error");
        }
    })
    if(res == false ||  selected.length != tmp.length){
        return alert("error");
    }

    else {
        console.log(array);

        const name = document.getElementById('form-nome').value 
        const email = document.getElementById('form-email').value 
        const tel = document.getElementById('form-tel').value 
        const message = document.getElementById('form-message').value 
        const page = document.querySelector('h1').innerText

        const dados = {
            name,
            email,
            tel,
            message,
            page
        }

        $.ajax({
            url: '/cotacao',
            data: { data: dados },
            method: 'post', 

            success: (data) => {
                console.log(data)
            }
        });

        console.log(dados)
        
    }

})


function compare(array) {
    var filtrado = array.filter(function(elem, pos, arr) {
        return {
            array: filtrado,
            res: arr.indexOf(elem) == pos
        };
    });

    if(filtrado.length === 0){
        return {
            array: filtrado,
            res: false   
        }
    }

    return {
        res: filtrado.length === 1 || filtrado.length === array.length,
        array: filtrado
    } 
}
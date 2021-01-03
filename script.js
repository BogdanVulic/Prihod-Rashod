const wrapper = document.getElementById('wrapper');
const prikaz = document.querySelector('#prikaz');
const prihodPrikaz = document.querySelector('#prihod > .iznos');
const rashodPrikaz = document.querySelector('#rashod > .iznos');
const procenat = document.getElementById('procenat');
const procenat2 = document.getElementById('procenat2');
const inputSelect = document.querySelector('#select');
const inputOpis = document.querySelector('#inputOpis');
const inputIznos = document.querySelector('#inputIznos');
const okButton = document.querySelector('#btn');
const listaPrihoda = document.querySelector('#listaPrihoda');
const listaRashoda = document.querySelector('#listaRashoda');
const istorija = document.querySelector('#istorija');

let arr = [];
let procenti = [];

const isValid = () => 
    inputOpis.value != '' && !isNaN(inputIznos.value) && inputIznos.value > 0 && inputSelect != '' ?
    makeElement():window.alert('ENTRY NOT VALID! TRY AGAIN!');

const makeElement = () => {
    let element = {
        select: inputSelect.value,
        opis: inputOpis.value,
        iznos: inputIznos.value
    }
    arr.push(element);
    showElement(element);
}
const mainDisplay = () => {
    let sumaPrihoda = 0;
    let sumaRashoda = 0;
    arr.forEach(el => el.select == 'prihod' ? sumaPrihoda += +el.iznos : sumaRashoda += +el.iznos)
    prihodPrikaz.textContent = `+${sumaPrihoda}`;
    rashodPrikaz.textContent = `-${sumaRashoda}`;
    procenat.textContent = `${Math.round(100*sumaRashoda/sumaPrihoda)}%`;
    procenat2.textContent = `${Math.round(100*sumaRashoda/sumaPrihoda)}%`;
    prikaz.textContent = `${+sumaPrihoda - +sumaRashoda}`;
    if(procenat.textContent == 'Infinity%' || procenat.textContent == "NaN%" || procenat.textContent == '' || procenat.textContent == '0%'){
        procenat.style.display = 'none';
        procenat2.style.display = 'none';
        procenat2.style.visibility = 'hidden';
    }
    else{
        procenat.style.display = 'inline';
        procenat2.style.display = 'inline';
        procenat2.style.visibility = 'hidden';
    }
    return sumaPrihoda;
} 

const showElement = (element) => {

    let sumaPrihoda = mainDisplay();

    let omotac = document.createElement('p');
    let obrisi = document.createElement('button');
    let opis = document.createElement('span');
    let cifra = document.createElement('span');
    
    opis.className = 'opis';
    cifra.className = 'cifra';
    obrisi.id = 'obrisi';
    omotac.className = 'omotac';
    
    opis.textContent = element.opis;
    obrisi.textContent = 'x';

    if(element.select == 'prihod'){
        cifra.textContent = `+${element.iznos}`;
        omotac.append(opis, obrisi, cifra);
        listaPrihoda.append(omotac);
    }else{
        let proc = document.createElement('span');
        proc.id="proc2";
        procenti.push([proc,element.iznos]);
        cifra.textContent = `-${element.iznos}`;
        cifra.append(proc);
        omotac.append(opis, obrisi, cifra);
        listaRashoda.append(omotac);
    }
    const racunanjeProcenata = (suma) => {
    procenti.forEach(el => {
        el[0].textContent = `${Math.round(100*el[1]/suma)}%`;
        if(el[0].textContent == "Infinity%" || el[0].textContent == "NaN%")
            el[0].style.display = 'none';
        else el[0].style.display = 'inline';
    })}
    racunanjeProcenata(sumaPrihoda);
    
    obrisi.addEventListener('click', () => {
        omotac.remove();
        arr.splice(arr.indexOf(element),1);
        let suma = mainDisplay();
        racunanjeProcenata(suma);
    })
    let key = localStorage.length;
    let zaLocal = element.select + ',' + element.opis + ',' + element.iznos;
    localStorage.setItem(key, zaLocal);
    
}

okButton.addEventListener('click', () =>{
    isValid();
    inputSelect.value = ''; inputOpis.value = ''; inputIznos.value = '';
})
const funct = () => {

    const display = document.getElementById('display');
    display.style.display = 'none';

    const listaUnosa = document.createElement('div');
    listaUnosa.id = 'lista-unosa';

    for(let i=0; i<localStorage.length; i++){
        let omotacElemenata = document.createElement('p');
        omotacElemenata.className = 'omotac-elemenata';
        let list1 = document.createElement('span')
        list1.className = 'lista-izbor';
        let list2 = document.createElement('span')
        list2.className = 'lista-opis';
        let list3 = document.createElement('span')
        list3.className = 'lista-cifra';

        list1.textContent = localStorage.getItem(i).split(',')[0];
        list2.textContent = localStorage.getItem(i).split(',')[1];
        list3.textContent = localStorage.getItem(i).split(',')[2];

        if(list1.textContent == 'prihod')
            omotacElemenata.style.color = 'blue';
        else omotacElemenata.style.color = 'red';

        omotacElemenata.append(list1, list2, list3);
        listaUnosa.append(omotacElemenata);
    }
    let btnNazad = document.createElement('button');
    let btnObrisiListu = document.createElement('button');
    btnObrisiListu.id = 'btn-obrisi-listu';
    btnNazad.id = 'btn-nazad';
    btnNazad.textContent = 'nazad';
    btnObrisiListu.textContent = 'obrisi istoriju';
    btnNazad.addEventListener('click', () => {
        listaUnosa.remove();
        display.style.display = 'flex';
        btnNazad.remove();
        btnObrisiListu.remove();
        istorija.addEventListener('click', funct)
    })
    btnObrisiListu.addEventListener('click', () => {
        localStorage.clear();
        window.alert('Istorija unosa uspešno obrisana!')
        listaUnosa.remove();
        display.style.display = 'flex';
        btnNazad.remove();
        btnObrisiListu.remove();
        istorija.addEventListener('click', funct)
    })
    wrapper.append(listaUnosa, btnNazad, btnObrisiListu);
    istorija.removeEventListener('click', funct)
}
istorija.addEventListener('click', funct)

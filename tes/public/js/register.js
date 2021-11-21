function showPassReg(){
    let show = document.getElementById('show')
    let password = document.getElementsByClassName('pass')
    if (show.checked) {
        password[0].type = 'text'
        password[1].type = 'text'
    }else{
        password[0].type = 'password'
        password[1].type = 'password'
    }
}

function ubah(){
    let sekolah = document.getElementById('sekolah').value
    let lomba = document.getElementById('lomba')
    let namaUtama = document.getElementById('namaUtama')

    if (sekolah == 'smp') {
        lomba.innerHTML = `<option value="" selected disabled>--pilih lomba--</option>
        <option value="nulis">nulis</option>`
    }else{
        lomba.innerHTML = `<option value="" selected disabled>--pilih lomba--</option>
        <option value="nulis">nulis</option>
        <option value="lcc">lcc</option>`
    }

    setKelompok('p')
    setNamaUtama('p',namaUtama)
    setGandaAnggota('p')
}

function myFunction() {

    let lomba = document.getElementById('lomba').value
    let namaUtama = document.getElementById('namaUtama')
    
    namaUtama.readOnly = false

    setKelompok(lomba)
    setNamaUtama(lomba, namaUtama)
    setGandaAnggota(lomba)

}   

let setKelompok = (lomba) => {

    let tim = document.getElementById('tim')
    let individu = document.getElementById('individu')

    if(lomba == 'nulis'){
        individu.checked = true
        individu.disabled = false
        tim.disabled = true
    }else if(lomba == 'lcc'){
        tim.disabled = false
        individu.disabled = true
        tim.checked = true
    }else{
        tim.disabled = true
        individu.disabled = true
        tim.checked = false
        individu.checked = false
    }
}

let setNamaUtama = (lomba, namaUtama) => {
    if(lomba == 'nulis'){
        namaUtama.placeholder = 'nama Lengkap peserta'
    }else if(lomba == 'lcc'){
        namaUtama.placeholder = 'nama Lengkap Ketua'
    }else{
        namaUtama.placeholder = 'nama Lengkap'
        namaUtama.readOnly = true
    }
}

let setGandaAnggota = (lomba) => {
    let input = document.getElementsByClassName('anggota')[0]

    if(lomba ==  'nulis'){
        input.innerHTML = ''
    }else if(lomba == 'lcc'){
        let org = 4
        gandaAnggota(org)
    }else{
        input.innerHTML = ''
    }
}

let gandaAnggota = (org) =>{
    let input = document.getElementsByClassName('anggota')[0]

    let isi = ''
    for (let i = 1; i <= org; i++) {
        isi += `<input type="text" name="namaAnggota${i}" id="namaAnggota${i}" placeholder="Nama Anggota" required>`            
    }
    input.innerHTML = isi
}
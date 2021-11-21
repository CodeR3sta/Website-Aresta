// show password
document.getElementById('show').addEventListener('change',() => {
    let show = document.getElementById('show')
    let password = document.getElementsByClassName('pass')
    if (show.checked) {
        password[0].type = 'text'
        password[1].type = 'text'
    }else{
        password[0].type = 'password'
        password[1].type = 'password'
    }
})

// custom jenjang sekolah
document.getElementById('sekolah').addEventListener('change', () => {
    let sekolah = document.getElementById('sekolah').value
    let lomba = document.getElementById('lomba')
    let namaUtama = document.getElementById('namaUtama')

    if (sekolah == 'sd') {
        lomba.innerHTML = `<option value="" selected disabled>--pilih lomba--</option>
        <option value="daiCilik">Da'i Cilik</option>
        <option value="mhqSd">MHQ</option>`
    }else if (sekolah == 'smp') {
        lomba.innerHTML = `<option value="" selected disabled>--pilih lomba--</option>
        <option value="fotografi">Fotografi</option>
        <option value="nasyid">Nasyid</option>
        <option value="khitobah">Khitobah</option>
        <option value="olimpiadeArab">Olimpiade Bhs. Arab</option>
        <option value="storyTelling">Story Telling</option>
        <option value="mhqSmp">MHQ</option>`
    }else if(sekolah == 'sma'){
        lomba.innerHTML = `<option value="" selected disabled>--pilih lomba--</option>
        <option value="designPoster">Design Poster</option>
        <option value="fotografi">Fotografi</option>
        <option value="nasyid">Nasyid</option>
        <option value="businessPlan">Business Plan</option>
        <option value="ldbi">LDBI</option>
        <option value="videoKreatif">Video Kreatif</option>
        <option value="arestaSurvivalCamp">Aresta Survival Camp</option>
        <option value="dramatisasiPuisi">Dramatisasi Puisi</option>
        <option value="mhqSma">MHQ</option>`
    }

    setKelompok('p')
    setNamaUtama('p',namaUtama)
    setGandaAnggota('p')
})

document.getElementById('lomba').addEventListener('change',() => {
    let lomba = document.getElementById('lomba').value
    let namaUtama = document.getElementById('namaUtama')
    
    namaUtama.readOnly = false

    setKelompok(lomba)
    setNamaUtama(lomba, namaUtama)
    setGandaAnggota(lomba)
})

let setKelompok = (lomba) => {

    let tim = document.getElementById('tim')
    let individu = document.getElementById('individu')

    // INDIVIDU
    // individu.checked = true
    // individu.disabled = false
    // tim.disabled = true

    // KELOMPOK
    // tim.disabled = false
    // individu.disabled = true
    // tim.checked = true

    if(
        lomba == 'designPoster' || lomba == 'fotografi' || lomba == 'khitobah' || lomba == 'daiCilik' ||
        lomba == 'olimpiadeArab' || lomba == 'storyTelling' || lomba == 'mhqSd' || lomba == 'mhqSmp' || lomba == 'mhqSma'
    ){
        individu.checked = true
        individu.disabled = false
        tim.disabled = true
    }else if(
        lomba == 'nasyid' || lomba == 'businessPlan' || lomba == 'ldbi' || lomba == 'videoKreatif' ||
        lomba == 'arestaSurvivalCamp' || lomba == 'dramatisasiPuisi'
    ){
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
    if(
        lomba == 'designPoster' || lomba == 'fotografi' || lomba == 'khitobah' || lomba == 'daiCilik' ||
        lomba == 'olimpiadeArab' || lomba == 'storyTelling' || lomba == 'mhqSd' || lomba == 'mhqSmp' || lomba == 'mhqSma'
    ){
        namaUtama.placeholder = 'nama Lengkap peserta'
    }else if(
        lomba == 'nasyid' || lomba == 'businessPlan' || lomba == 'ldbi' || lomba == 'videoKreatif' ||
        lomba == 'arestaSurvivalCamp' || lomba == 'dramatisasiPuisi'
    ){
        namaUtama.placeholder = 'nama Lengkap Ketua'
    }else{
        namaUtama.placeholder = 'nama Lengkap'
        namaUtama.readOnly = true
    }
}

let setGandaAnggota = (lomba) => {
    let input = document.getElementsByClassName('anggota')[0]

    let org, minimal

    if(
        lomba == 'designPoster' || lomba == 'fotografi' || lomba == 'khitobah' || lomba == 'daiCilik' ||
        lomba == 'olimpiadeArab' || lomba == 'storyTelling' || lomba == 'mhqSd' || lomba == 'mhqSmp' || lomba == 'mhqSma'
    ){
        input.innerHTML = ''
    }else if(lomba == 'nasyid'){
        org = 6
        minimal = 2
        gandaAnggota(org,minimal)
    }else if(lomba == 'businessPlan'){
        org = 2
        minimal = 2
        gandaAnggota(org,minimal)
    }else if(lomba == 'ldbi'){
        org = 2
        minimal = 2
        gandaAnggota(org,minimal)
    }else if(lomba == 'videoKreatif'){
        org = 24
        minimal = 2
        gandaAnggota(org,minimal)
    }else if(lomba == 'arestaSurvivalCamp'){
        org = 4
        minimal = 4
        gandaAnggota(org,minimal)
    }else if(lomba == 'dramatisasiPuisi'){
        org = 3
        minimal = 3
        gandaAnggota(org,minimal)
    }else{
        input.innerHTML = ''
    }
}

let gandaAnggota = (org,minimal) =>{
    let input = document.getElementsByClassName('anggota')[0]

    let isi = ''
    for (let i = 1; i <= org; i++) {
        if (i <= minimal) {
            isi += `<input type="text" name="namaAnggota${i}" id="namaAnggota${i}" placeholder="Nama Anggota${i}" required>`            
        }else{
            isi += `<input type="text" name="namaAnggota${i}" id="namaAnggota${i}" placeholder="Nama Anggota${i}">`            
        }
    }
    input.innerHTML = isi
}
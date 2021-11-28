let lista_canciones = document.getElementById("canciones")
let cover_image = document.getElementById("cover-image");
let title_song = document.getElementById("title-song");
let artist_song = document.getElementById("artist-song");
let audio = document.getElementById("audio-playing");
let progress_bar = document.getElementById("progress-bar");
let is_playing = false; 
let song_selected = {}; 
let volumen = document.getElementById("volume-control");
volumen.value = 1
let estado = true;
let progress;
let songs = [
    {
        id: 1,
        imagen:"img/vete.jpg",
        cancion:"audio/y2meta.com - Bad Bunny - Vete (Letra) (128 kbps).mp3",
        artista:"Bad Bunny",
        titulo:"vete",
    },
    {
        id: 2,
        imagen:"img/yonaguni.jpg",
        cancion:"audio/y2meta.com - Bad Bunny - Yonaguni (Video Oficial) (128 kbps).mp3",
        artista:"Bad Bunny",
        titulo:"yonaguni",
    },
    {
        id: 3,
        imagen:"img/la cancion.jpeg",
        cancion:"audio/y2meta.com - Bad Bunny, J. Balvin - La Cancion (Letra_Lyrics) (128 kbps).mp3",
        artista:"Bad Bunny-J.Balvin",
        titulo:"la Cancion",
    },
    {
        id: 4,
        imagen:"img/lo siento bb.jpg",
        cancion:"audio/y2meta.com - Tainy, Bad Bunny, Julieta Venegas - Lo Siento BB__ (Letra_Lyrics) (128 kbps).mp3",
        artista:"Bad Bunny-Tainy-Julieta Venegas",
        titulo:"lo Siento BB",
    },
    
];

const BuildList = (songs)=>{
    lista_canciones.innerHTML="";
    songs.forEach(e=>{
        lista_canciones.insertAdjacentHTML(
            'beforeend' , 
        `
        <article class="lista" id="item-${e.id}">
                        <img src="${e.imagen}" >
                        <div class="data-song-container">
                            <h2>${e.titulo}</h2>
                            <div class="artist-name">${e.artista}</div>
                        </div>
                    </article>
        `
            );
    });

};
const select_song = (id) =>{
    let res = songs.find((e) => e.id == id);
    if(res)
    {
        cover_image.src = res.imagen;
        title_song.innerHTML = res.titulo;
        artist_song.innerHTML = res.artista;
        audio.src = res.cancion; 
        play_song();
    }
};
const pause_effects = () => {   
    play_btn.innerHTML = "►";
    cover_image.style.animationPlayState = "paused";
}
const play_effects = () => {
    play_btn.innerHTML = "〓";
    cover_image.style.animationPlayState = "running";
}
const play_song = () =>
{
progress_bar.value = audio.currentTime;
    audio.play();
};

let id_aux = 1;

const prev_song= () =>{
    if(id_aux > 0){

    
     select_song(--id_aux);
    }
}

const next_song = () => {
    if(id_aux < songs.length){

    
    select_song(++id_aux);
    }
};

const first_song = () =>{
    cover_image.src = songs[0].imagen;
    title_song.innerHTML = songs[0].titulo;
    artist_song.innerHTML = songs[0].artista;
    audio.src = songs[0].cancion;
}

const slideValue = document.querySelector("span");
const inputSlider = document.querySelector("input");
inputSlider.oninput = (() => {
let value = inputSlider.value;
slideValue.textContent = value;
slideValue.style.left = (value/2) + "%";
slideValue.classList.add("show");
});

inputSlider.onblur = (() => {
    slideValue.classList.remove("show");
});



let play_btn = document.getElementById("play-btn");
let next_btn = document.getElementById("next-btn");
let prev_btn = document.getElementById("prev-btn");

play_btn.addEventListener("click" , () => {
    if(is_playing)
    {
        audio.pause();
        pause_effects();
        is_playing= false;
       
    }
    else
    {
        audio.play();
        play_effects();
        is_playing = true;
       
    }  
})



window.addEventListener("load", () =>{
first_song();

    progress_bar.value = 0;
    progress_bar.max = audio.duration;
    window.setInterval(() => {
progress_bar.value  = audio.currentTime;
    }, 1000);
    progress_bar.addEventListener("change" , () =>{
        audio.currentTime = progress_bar.value;
    });


    next_btn.addEventListener("click" , () =>{
        next_song();
    });
    prev_btn.addEventListener("click" , () =>{
        prev_song();
    });
    lista_canciones.addEventListener("click" , (event) =>{
        if(event.target.matches("img"))
        {
            select_song(event.target.parentElement.id.slice(5 , 6));
        }
        else if (event.target.matches(".data-song-container")){
            select_song(event.target.parentElement.id.slice(5 , 6));
        }
        else if (event.target.matches(".artist-name")){
            select_song(event.target.parentElement.parentElement.id.slice(5 , 6));
        }
        else if (event.target.matches(".h2")){
            select_song(event.target.parentElement.parentElement.id.slice(5 , 6));
        }
        else if (event.target.matches(".lista")){
            select_song(event.target.id.slice(5 , 6));
        }
    });
});


volumen.addEventListener('change',()=>{
    audio.volume = volumen.value;
})
let vol = 1;
addEventListener('keydown',(event)=>{
    
    if(event.key === 'ArrowUp'&&vol<1)
    {
        try{
            vol = vol + 0.01;
            audio.volume = vol
            volumen.value = audio.volume;
        }catch(error)
        {
            console.log(error)
        }
    }
    if(event.key === 'ArrowDown'&&vol>0)
    {
        try {
            vol = vol - 0.01;
            audio.volume = vol
            volumen.value = audio.volume;
            
        } catch (error) {
            console.log(error)
        }
        
    }
})






let filter_title = document.getElementById("filter-title");
filter_title.addEventListener("keyup" , (event) =>{
    let res = songs.filter((e) => e.titulo.includes(filter_title.value))
    if(res){
        BuildList(res);
    }
})
volumen.value =  1
BuildList(songs);

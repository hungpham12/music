const $ = document.querySelector.bind(document);
const $$= document.querySelectorAll.bind(document);
//const aaa = document.querySelector('.playlist')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const next = $('.btn-next')
const prev =$('.btn-prev')
const count =0
const clicksong =$('.playlist')
const randomsong=$('.btn-random')
const repeat =$('.btn-repeat')
const app ={
    songs :[
        {
            name: 'Thang dien',
            singer : 'Lil Zpoet',
            path :'./music/thangdien.mp3',
            image :'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/f/5/3/b/f53b7859f2f0aaf5c1363eb80e75c29b.jpg'
        },
        {
            name: 'Ke dien tin vao tinh yeu',
            singer : 'Lil Zpoet',
            path :'./music/bai2.mp3',
            image :'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg'
        },
        
        {
            name: 'Yeu 5',
            singer : 'Lil Zpoet',
            path :'./music/bai3.mp3',
            image :'https://c-fa.cdn.smule.com/rs-s80/arr/13/c6/f2c45600-b665-44a9-99fa-1bac1b0034b5.jpg'
        },
        {
            name: 'Why not me',
            singer : 'Lil Zpoet',
            path :'./music/bai4.mp3',
            image :'https://i1.sndcdn.com/artworks-000133784891-cy93sj-t500x500.jpg'
        },
        {
            name: 'Wavin Flag',
            singer : 'Knaan Warsame',
            path :'./music/bai5.mp3',
            image :'https://i1.sndcdn.com/artworks-srRyv322OZCyuMnq-r8PHiQ-t500x500.jpg'
        },
        {
            name: '24h',
            singer : 'LyLy',
            path :'./music/bai6.mp3',
            image :'https://i.ytimg.com/vi/gs-zxnVWPR8/hqdefault.jpg'
        },
        {
            name: 'Khong sao ma em day roi',
            singer : 'Suni Ha Linh',
            path :'./music/bai7.mp3',
            image :'https://i.ytimg.com/vi/AiD1a2fFFLw/maxresdefault.jpg'
        },
        {
            name: 'Em da biet',
            singer : 'Suni Ha Linh',
            path :'./music/bai8.mp3',
            image :'https://i.ytimg.com/vi/4BUlpxfKAsg/maxresdefault.jpg'
        },
        {
            name: 'Tam su tuoi 30',
            singer :'Trinh thang binh',
            path :'./music/bai9.mp3',
            image :'https://i.ytimg.com/vi/kV3famkRaA4/maxresdefault.jpg'
        },
        {
            name: 'Bong hoa dep nhat',
            singer : 'Quan AP',
            path :'./music/bai10.mp3',
            image :'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/f/8/1/e/f81efd92fa9a3d52eb37f3b867ab9d32.jpg'
        },
    ],
    
    isplaying:false,
    currentIndex:0,
    defineProperties: function(){
        //console.log(this.songs[0])
        Object.defineProperty(this,'currenSong',{
            get : function(){
                //console.log(this.songs[this.currentIndex])
                return this.songs[this.currentIndex]
            }
        })
        //console.log(this.songs[this.currentIndex])
        //console.log(clicksong)
    },
    render : function(){
        const htmls = this.songs.map((song,index) =>{
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index ="${index}" >
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
          </div>
            `
        })
         //console.log(htmls)
        $('.playlist').innerHTML = htmls.join('\n')
    },
    handleEvents : function(){
        const _this=this // gán this cho _this để lấy các thuộc tính bên ngoài function
        const cd = $('.cd');
        //console.log(cd.offsetWidth)
        const widthimg = cd.offsetWidth;

        // xu ly image 
        document.onscroll=function(){
            
            
            const scrolltop = window.scrollY ;
            const newwidth =widthimg-scrolltop;
            
            //console.log(newwidth);
            cd.style.width= newwidth >0 ? newwidth +'px':0;
            cd.style.opacity= newwidth/widthimg;
        }

        // xu ly khi play 
        playBtn.onclick = function(){
            // nếu dùng this ở đây thì nó sẽ hiểu là lấy từ trong playBtn
            if(_this.isplaying)
            {
                _this.isplaying=false
                audio.pause()
                player.classList.remove('playing')
            
            }
            else
            {
                _this.isplaying=true
                audio.play()
                player.classList.add('playing')
            }
            
            
        }
        // next bai hat
        next.onclick=function(){
            setTimeout(
                () => {
                    _this.nextSong()
                    _this.isplaying=true
                    audio.play()
                    player.classList.add('playing')
                },
                1000
              );
            
        }
        // phat lai bai truoc
        prev.onclick=function()
        {
            setTimeout(
                () => {
                    _this.prevSong()
                    _this.isplaying=true
                    audio.play()
                    player.classList.add('playing')
                },
                1000
              );
           
        }
        // lua chon bai hat trong list
        clicksong.onclick=function(e){
            const songNode = e.target.closest('.song:not(.active')
            console.log(songNode.dataset.index)
            _this.currentIndex=songNode.dataset.index
            _this.isplaying=true
            _this.loadCurrentSong1st()
            audio.play()
            player.classList.add('playing')
            
        }
        // random bai hat
        randomsong.onclick= function(){
            const number = Math.floor(Math.random() * 10+1)
            //console.log(number)
            _this.currentIndex= number
            _this.isplaying=true
            _this.loadCurrentSong1st()
            audio.play()
            player.classList.add('playing')
        }
        // phat laij bai hat
        repeat.onclick=function(){
            const songNode = e.target.closest('.song:not(.active')
        }

    },
    
    loadCurrentSong1st: function(){
        const heading = $('header h2')// tieu de bai dau tien
        const CdImage =$('.cd-thumb')// tai anh bai dau tien
        const audio =$('#audio');// tai bai hat dau tien

        //console.log(heading,CdImage,audio)
        heading.textContent = this.currenSong.name
        CdImage.style.backgroundImage = `url('${this.currenSong.image}')`;
        audio.src =this.currenSong.path
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex>=this.songs.length)
        {
            this.currentIndex=0;
        }
        this.loadCurrentSong1st()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex<0)
        {
            this.currentIndex=this.songs.length-1;
        }
        this.loadCurrentSong1st()
    },
    clickSong:function(){

        // this.currentIndex=this.currentIndex +3
        this.loadCurrentSong1st()
    },
    start : function(){
        this.defineProperties()
        this.render()
        this.handleEvents()
        this.loadCurrentSong1st()
    }
}
app.start()
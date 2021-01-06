const Yoda = document.querySelector('.yoda');
//console.log(yoda);

const Background = document.querySelector('.background');

//controlando o pulo para evitar bug de pular no ar
let isjumping = false;

//indica posicao do baby_yoda e pode ser acessado globalmente
let position = 0;

function handleKeyup(event){
    if (event.keyCode === 38){
        console.log('Seta para cima pressionada!')
        if(!isjumping){
            jump();
        }        
    }
}

function jump(){
    //indica que esta pulando
    isjumping =  true;

    let upinterval = setInterval(() =>{
        if(position >= 180){
            clearInterval(upinterval);

            //fazendo descer
            let downinterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downinterval);
                    //indica fim do pulo
                    isjumping = false;
                }else{
                position -= 20; 
                Yoda.style.bottom = position + 'px';
                }              
            },20);//tempo de descida
        }else{
            //faz saltar a cada 20ms
            position += 20;
            Yoda.style.bottom = position + 'px';
        }
    },25);//20 é o tempo de subida
}

function createTrooper(){
    const trooper = document.createElement('div');
    let trooperPosition = 1280;

    trooper.classList.add('trooper');
    trooper.style.left = 1280 + 'px';//posicao inicial do stormtrooper
    Background.appendChild(trooper);
}

function createLaserShot(){
    const Laser = document.createElement('div');
    let LaserPosition = 1200;

    //cria troopers aleatorios
    let randomTime = Math.random() * 5000;
    console.log(randomTime); //mostra o numero aleatorio gerado no console

    Laser.classList.add('Laser');
    Laser.style.left = 1200 + 'px';//posicao inicial do stormtrooper
    Background.appendChild(Laser);

    let leftinterval = setInterval(() => {
        if(LaserPosition <= -60){
            clearInterval(leftinterval);
            Background.removeChild(Laser);
        }else if(LaserPosition > 0 && LaserPosition < 60 && position < 60){
            //game over
            clearInterval(leftinterval);
            document.body.innerHTML = '<h1 class="Game-Over">Fim de Jogo</h1>';
        }else {
            LaserPosition -= 10;
            Laser.style.left = LaserPosition + 'px';
        }        
    },20);

    //uso de recursividade para gerar tiros laser
    setTimeout(createLaserShot,randomTime);
}

//cria um storm trooper e um tiro de laser ao iniciar o jogo
createLaserShot();
createTrooper();

document.addEventListener('keyup',handleKeyup);
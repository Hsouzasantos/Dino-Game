// Selecionando div do html
const background = document.querySelector('.background');

// Gera o movimento do Dino
const dino = document.querySelector('.dino');
let isJumping = false;
let position = 0; /*Posicao do Dino */

// Funcao para verificar se o botao apertado eh o espaco e para realizar o pulo no caso de ser
// 
function handleKeyUp(event) {
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}
// funcao para fazer o pulo do dino
function jump() {

    // Faz a subida do pulo
    let upInterval = setInterval(() => {/*A funcao setInterval serve para definir atividades que serao realizadas no tempo defino*/

        if(position >= 150){
				// Faz a descida do pulo
				clearInterval(upInterval);
				let downInterval = setInterval(() => {
					if(position <= 0){
						clearInterval(downInterval); /*Limpa o intervalo da descida */
						isJumping = false; /*Indica que o pulo terminou */
					} else {		
						// descendo
						position -= 20;
						dino.style.bottom = position + 'px' /*Define a posicao sendo alterada com base no apertar do botao */
					}}, 30/*Define o tempo de descida do Dino*/);        
		} else {
			// subindo
        	position += 20
        	dino.style.bottom = position + 'px'; /*Define a posicao sendo alterada com base no apertar do botao */
        }
    }, 30/*Define o tempo de subida do DIno */);
}

// Gera a posicao dos cactos

function createCactus () {
    const cactus = document.createElement('div'); /*Cria o elemento do cacto no HTML */
    let cactusPosition = 1000; /*Recebe a posicao do cacto inicialmente */
	let randomTime = Math.random() * 6000; /*Realiza numeros aleatorios para a criacao cactus de forma infinita e aleatoria */

    cactus.classList.add('cactus'); /*Adiciona a classe ao elemento criado no JS, para poder ser utilizado no CSS */
    cactus.style.left = 1000  + 'px'; /*Define a posicao inicial em Pixels */
    background.appendChild(cactus); /*Cria um filho para a div original, sendo colocada dentro da div informada */

	// Funcao que faz o cacto se mover e chama a criacao aleatoria dos cactus, alem de remove-los
    let leftInterval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
			clearInterval(leftInterval);
			document.body.innerHTML = `<h1 class="gameOver">Fim de Jogo</h1>`;
		} else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 30);


	setTimeout(createCactus, randomTime);

}

createCactus();
// escuta o evento
document.addEventListener('keyup', handleKeyUp);
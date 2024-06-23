// Variáveis
const galleryImgs = document.querySelectorAll('.gallery-img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeModalBtn = document.getElementById('close-modal');
const prevArrow = document.getElementById('prev-arrow');
const nextArrow = document.getElementById('next-arrow');
const backToTopButton = document.getElementById('back-to-top');

let currentImageIndex = 0;
let imagesArray = [];

// Funções para levar usuário de volta ao topo da página
function toggleBackToTopButton() {
    if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
        backToTopButton.style.opacity = "1";
        backToTopButton.style.bottom = "20px";
    } else {
        backToTopButton.style.opacity = "0";
        backToTopButton.style.bottom = "-45px";
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.onscroll = function() {
    toggleBackToTopButton();
};

// Função que aguarda o carregamento do HTML sem aguardar pelo carregamento completo das folhas de estilo, imagens e subframes
document.addEventListener('DOMContentLoaded', function() {

    // Função para abrir o modal com a imagem ampliada
    function openModal(imgSrc) {
        modal.style.display = 'flex'; // Exibir o modal
        modalImg.src = imgSrc; // Definir a imagem do modal como a imagem clicada
        currentImageIndex = imagesArray.indexOf(imgSrc); // Definir o índice da imagem atual
        updateArrows(); // Atualizar visibilidade das setas
        if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
            backToTopButton.style.opacity = "0";
            backToTopButton.style.bottom = "-45px";
        }
    }

    // Adicionar evento de clique às imagens da galeria
    galleryImgs.forEach(img => {
        img.addEventListener('click', function() {
            const parentDiv = this.closest('.image-gallery'); // Encontra a div pai mais próxima com a classe 'image-gallery'
            imagesArray = Array.from(parentDiv.querySelectorAll('.gallery-img')).map(image => image.src); // Armazena os src das imagens dentro desta div
            openModal(this.src);
        });
    });

    // Fechar o modal ao clicar no botão de fechar
    closeModalBtn.addEventListener('click', function() {
        closeModal();
        if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
            backToTopButton.style.opacity = "1";
            backToTopButton.style.bottom = "20px";
        }
    });

    // Fechar o modal ao clicar fora da imagem ampliada
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
            if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
                backToTopButton.style.opacity = "1";
                backToTopButton.style.bottom = "20px";
            }
        }
    });

    // Função para fechar o modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Fechar o modal ao pressionar a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Navegação para imagem anterior
    prevArrow.addEventListener('click', function() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            modalImg.src = imagesArray[currentImageIndex];
            updateArrows();
        }
    });

    // Navegação para próxima imagem
    nextArrow.addEventListener('click', function() {
        if (currentImageIndex < imagesArray.length - 1) {
            currentImageIndex++;
            modalImg.src = imagesArray[currentImageIndex];
            updateArrows();
        }
    });

    // Função para atualizar visibilidade das setas
    function updateArrows() {
        if (currentImageIndex === 0) {
            prevArrow.style.display = 'none'; // Esconder seta esquerda no início do carrossel
        } else {
            prevArrow.style.display = 'flex'; // Mostrar seta esquerda quando não no início
        }

        if (currentImageIndex === imagesArray.length - 1) {
            nextArrow.style.display = 'none'; // Esconder seta direita no final do carrossel
        } else {
            nextArrow.style.display = 'flex'; // Mostrar seta direita quando não no final
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const galleryImgs = document.querySelectorAll('.gallery-img');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeModalBtn = document.getElementById('close-modal');
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');

    let currentImageIndex = 0;
    let imagesArray = [];

    // Função para abrir o modal com a imagem ampliada
    function openModal(imgSrc) {
        modal.style.display = 'flex'; // Exibir o modal
        modalImg.src = imgSrc; // Definir a imagem do modal como a imagem clicada
        currentImageIndex = imagesArray.indexOf(imgSrc); // Definir o índice da imagem atual
        updateArrows(); // Atualizar visibilidade das setas
    }

    // Adicionar evento de clique às imagens da galeria
    galleryImgs.forEach(img => {
        imagesArray.push(img.src); // Armazenar src das imagens em um array
        img.addEventListener('click', function() {
            openModal(this.src);
        });
    });

    // Fechar o modal ao clicar no botão de fechar
    closeModalBtn.addEventListener('click', function() {
        closeModal();
    });

    // Fechar o modal ao clicar fora da imagem ampliada
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
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
            prevArrow.style.display = 'block'; // Mostrar seta esquerda quando não no início
        }

        if (currentImageIndex === imagesArray.length - 1) {
            nextArrow.style.display = 'none'; // Esconder seta direita no final do carrossel
        } else {
            nextArrow.style.display = 'block'; // Mostrar seta direita quando não no final
        }
    }
});

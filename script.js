// ============================================
// RAIZ REGENERA - Script Principal
// Nicho: Agro forte com foco em lucratividade + sustentabilidade
// ============================================

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. SIMULAÇÃO INTERATIVA (Calculadora conceitual)
    // ============================================
    
    const btnSimular = document.getElementById('btnSimular');
    const btnCtaBottom = document.getElementById('ctaBottom');
    const ganhoExtraSpan = document.getElementById('ganhoExtra');
    const simulPanel = document.getElementById('simulPanel');
    
    // Array com valores progressivos para simular "crescimento"
    const valoresProgressiveis = [3988000, 4100000, 4220000, 4350000, 4450000];
    let intervaloAtivo = null;
    
    // Função que anima a simulação com valores variando
    function animarSimulacao() {
        // Se já existe um intervalo rodando, limpa antes
        if (intervaloAtivo) {
            clearInterval(intervaloAtivo);
        }
        
        let index = 0;
        intervaloAtivo = setInterval(() => {
            if (ganhoExtraSpan) {
                let valorAtual = valoresProgressiveis[index % valoresProgressiveis.length];
                ganhoExtraSpan.innerText = `R$ ${valorAtual.toLocaleString('pt-BR')}`;
                index++;
                
                // Para após 10 iterações
                if (index > 10) {
                    clearInterval(intervaloAtivo);
                    intervaloAtivo = null;
                }
            }
        }, 400);
        
        // Efeito visual no painel de simulação
        if (simulPanel) {
            simulPanel.style.transform = 'scale(1.02)';
            simulPanel.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                if (simulPanel) {
                    simulPanel.style.transform = 'scale(1)';
                }
            }, 600);
        }
        
        // Feedback sonoro conceitual (opcional - apenas console)
        console.log('📊 Simulação atualizada: novos valores de ROI exibidos');
    }
    
    // Adiciona eventos aos botões de simulação
    if (btnSimular) {
        btnSimular.addEventListener('click', function(e) {
            e.preventDefault();
            animarSimulacao();
            
            // Rola suavemente até a seção de simulação se não estiver visível
            const simuladorSection = document.getElementById('simulador');
            if (simuladorSection) {
                const rect = simuladorSection.getBoundingClientRect();
                const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
                if (!isVisible) {
                    simuladorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }
    
    if (btnCtaBottom) {
        btnCtaBottom.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Rola até a seção de simulação
            const simuladorSection = document.getElementById('simulador');
            if (simuladorSection) {
                simuladorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Aguarda a rolagem terminar para iniciar a animação
                setTimeout(() => {
                    animarSimulacao();
                }, 500);
            } else {
                animarSimulacao();
            }
        });
    }
    
    // ============================================
    // 2. NAVEGAÇÃO SUAVE COM SCROLL
    // ============================================
    
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('data-section');
            if (!sectionId) return;
            
            let targetSection = null;
            
            // Mapeia os IDs das seções
            switch(sectionId) {
                case 'simulador':
                    targetSection = document.getElementById('simulador');
                    break;
                case 'cases':
                    targetSection = document.getElementById('cases');
                    break;
                case 'manifesto':
                    targetSection = document.getElementById('manifesto');
                    break;
                case 'contato':
                    targetSection = document.getElementById('contato');
                    break;
                default:
                    targetSection = document.getElementById(sectionId);
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Atualiza o estilo do link ativo
                navLinks.forEach(navLink => {
                    navLink.style.opacity = '0.7';
                });
                this.style.opacity = '1';
                this.style.color = '#7DD181';
            }
        });
    });
    
    // ============================================
    // 3. EFEITO DE REVELAÇÃO AO SCROLL (Scroll Reveal simplificado)
    // ============================================
    
    // Seleciona elementos que terão animação de entrada
    const elementosParaRevelar = document.querySelectorAll('.case-card, .simul-box, .hero-stats, .card-simul');
    
    function verificarVisibilidade() {
        elementosParaRevelar.forEach(elemento => {
            const rect = elemento.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Se o elemento está visível na tela
            if (rect.top <= windowHeight - 100 && rect.bottom >= 100) {
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configura estado inicial dos elementos
    elementosParaRevelar.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Verifica visibilidade ao carregar e ao rolar
    window.addEventListener('load', verificarVisibilidade);
    window.addEventListener('scroll', verificarVisibilidade);
    
    // ============================================
    // 4. CONTADOR ESTATÍSTICO ANIMADO (para os números do hero)
    // ============================================
    
    function animarContadores() {
        const statsValues = document.querySelectorAll('.stat-val');
        
        statsValues.forEach(stat => {
            const textoOriginal = stat.innerText;
            // Extrai números do texto (ex: "R$ 1.240/ha" -> 1240)
            const matchNumerico = textoOriginal.match(/\d+(?:[.,]\d+)?/);
            if (!matchNumerico) return;
            
            let valorNumerico = parseFloat(matchNumerico[0].replace(/\./g, '').replace(',', '.'));
            const temSimboloMonetario = textoOriginal.includes('R$');
            const temPorcentagem = textoOriginal.includes('%');
            const temUnidade = textoOriginal.includes('/ha');
            
            let valorFinal = valorNumerico;
            let duracao = 1500;
            let intervalo = 20;
            let steps = duracao / intervalo;
            let incremento = valorFinal / steps;
            let valorAtual = 0;
            let stepAtual = 0;
            
            // Para números negativos ou percentuais
            const ehNegativo = textoOriginal.includes('-');
            
            const timer = setInterval(() => {
                stepAtual++;
                valorAtual += incremento;
                
                if (stepAtual >= steps) {
                    valorAtual = valorFinal;
                    clearInterval(timer);
                }
                
                // Formata o número
                let numeroFormatado = Math.floor(valorAtual).toLocaleString('pt-BR');
                let novoTexto = '';
                
                if (temSimboloMonetario) {
                    novoTexto = `R$ ${numeroFormatado}${temUnidade ? '/ha' : ''}`;
                } else if (temPorcentagem) {
                    novoTexto = `${Math.floor(valorAtual)}%`;
                } else if (textoOriginal.includes('x')) {
                    novoTexto = `${valorAtual.toFixed(1)}x`;
                } else {
                    novoTexto = numeroFormatado;
                }
                
                stat.innerText = novoTexto;
            }, intervalo);
        });
    }
    
    // Dispara contadores quando o hero entrar na tela
    const heroSection = document.querySelector('.hero-niche');
    let contadoresAnimados = false;
    
    function verificarHero() {
        if (!heroSection || contadoresAnimados) return;
        
        const rect = heroSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
            animarContadores();
            contadoresAnimados = true;
        }
    }
    
    window.addEventListener('scroll', verificarHero);
    window.addEventListener('load', verificarHero);
    
    // ============================================
    // 5. TOOLTIP/DICA PARA OS CARDS (interatividade extra)
    // ============================================
    
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ============================================
    // 6. LOG NO CONSOLE (identidade do projeto)
    // ============================================
    
    console.log('%c🌱 RAIZ REGENERA | Agro forte, futuro sustentável', 'color: #7DD181; font-size: 16px; font-weight: bold;');
    console.log('%cNicho: Lucratividade + Carbono + Equilíbrio ambiental', 'color: #E07A3A; font-size: 12px;');
    console.log('%cCódigo separado em HTML, CSS e JS - Pronto para produção', 'color: #DFF2EB; font-size: 11px;');
    
    // ============================================
    // 7. PREVENÇÃO DE ERROS (caso elementos não existam)
    // ============================================
    
    // Adiciona suporte para toque em dispositivos móveis
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Pequeno ajuste para garantir que o sticky header funcione bem
    const header = document.querySelector('.nav-bar');
    if (header) {
        const observer = new IntersectionObserver(([e]) => {
            e.target.style.backdropFilter = e.intersectionRatio < 1 ? 'blur(10px)' : 'blur(10px)';
        }, { threshold: [0, 1] });
        observer.observe(header);
    }
    
});
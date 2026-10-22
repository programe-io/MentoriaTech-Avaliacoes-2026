    <!-- Script para controle do Modal -->
    <script>
        function openModal(title, text) {
            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalBody').innerText = text;
            document.getElementById('customModal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('customModal').classList.add('hidden');
        }

        // Fechar modal ao clicar fora
        window.onclick = function(event) {
            const modal = document.getElementById('customModal');
            if (event.target == modal) {
                closeModal();
            }
        }
    </script>
        <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            pink: '#FF70A6',
                            lightPink: '#FF97B7',
                            purple: '#9D4EDD',
                            lavender: '#E0AAFF',
                            softBg: '#FDF4F9'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Outfit', 'sans-serif']
                    }
                }
            }
        }
    </script>